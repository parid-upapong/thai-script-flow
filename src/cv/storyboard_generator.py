import torch
from diffusers import StableDiffusionXLPipeline, EulerDiscreteScheduler

class ThaiStoryboardEngine:
    """
    Generates cinematic storyboard panels based on Thai script descriptions.
    """
    def __init__(self, model_path="stabilityai/stable-diffusion-xl-base-1.0"):
        self.pipe = StableDiffusionXLPipeline.from_pretrained(
            model_path, 
            torch_dtype=torch.float16, 
            variant="fp16"
        ).to("cuda")
        
        # Set scheduler for faster inference
        self.pipe.scheduler = EulerDiscreteScheduler.from_config(self.pipe.scheduler.config)
        
        # Load Thai-specific LoRA (Hypothetical: TCAI_Thai_Aesthetic_v1)
        # self.pipe.load_lora_weights("tcai/thai-cinematic-lora")

    def generate_panel(self, scene_description, shot_type, lighting_style, ref_palette=None):
        """
        Generates a single storyboard panel.
        """
        # Thai-context prompt augmentation
        base_prompt = (
            f"Cinematic storyboard, {shot_type}, {scene_description}. "
            f"Lighting: {lighting_style}. Thai actors, authentic Thai environment, "
            f"high quality, professional cinematography, 8k resolution."
        )
        
        if ref_palette:
            base_prompt += f" Color palette influenced by: {', '.join(ref_palette)}."

        negative_prompt = (
            "western faces, western architecture, messy, low quality, "
            "distorted anatomy, text, watermark, CGI, 3d render"
        )

        image = self.pipe(
            prompt=base_prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=30,
            guidance_scale=7.5,
            width=1024,
            height=576 # 16:9 Aspect Ratio
        ).images[0]
        
        return image

# Example Usage
# engine = ThaiStoryboardEngine()
# panel = engine.generate_panel(
#    scene_description="A young couple eating Som-Tum at a night market in Huai Khwang",
#    shot_type="Medium Wide Shot",
#    lighting_style="Warm neon lights, bokeh background"
# )
# panel.save("scene_1_panel_1.png")