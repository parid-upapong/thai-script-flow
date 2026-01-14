import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import numpy as np
import cv2

class ThaiVisualAnalyzer:
    """
    Analyzes reference images to extract 'Mood & Tone' and Thai-specific cultural markers.
    """
    def __init__(self, model_id="openai/clip-vit-base-patch32"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = CLIPModel.from_pretrained(model_id).to(self.device)
        self.processor = CLIPProcessor.from_pretrained(model_id)
        
        # Define Thai-specific visual markers for zero-shot classification
        self.cultural_markers = [
            "modern Bangkok skyscraper", "traditional Thai wooden house",
            "Thai street food stall", "Thai school uniform",
            "Buddhist temple architecture", "Tuk-tuk vehicle",
            "Thai minimalist cafe", "Rural Thai rice field"
        ]

    def extract_color_palette(self, image_path, num_colors=5):
        """Extracts dominant HEX colors from reference image."""
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        pixels = img.reshape(-1, 3)
        
        # Simple K-Means for palette extraction
        from sklearn.cluster import KMeans
        kmeans = KMeans(n_clusters=num_colors, n_init=10)
        kmeans.fit(pixels)
        colors = kmeans.cluster_centers_.astype(int)
        
        return [f"#{c[0]:02x}{c[1]:02x}{c[2]:02x}" for c in colors]

    def analyze_culture_context(self, image_path):
        """Identifies Thai cultural elements in the reference image."""
        image = Image.open(image_path)
        inputs = self.processor(
            text=self.cultural_markers, 
            images=image, 
            return_tensors="pt", 
            padding=True
        ).to(self.device)

        outputs = self.model(**inputs)
        probs = outputs.logits_per_image.softmax(dim=1)
        
        results = {
            self.cultural_markers[i]: float(probs[0][i]) 
            for i in range(len(self.cultural_markers))
        }
        # Return top 3 detected markers
        return sorted(results.items(), key=lambda x: x[1], reverse=True)[:3]

# Example Usage
# analyzer = ThaiVisualAnalyzer()
# palette = analyzer.extract_color_palette("ref_image.jpg")
# context = analyzer.analyze_culture_context("ref_image.jpg")