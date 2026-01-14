# GPU-optimized container for Phaya Thai LLM Inference
FROM nvidia/cuda:12.1.0-base-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install PyTorch with CUDA support
RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Install Thai NLP & Inference dependencies
COPY requirements-ai.txt .
RUN pip3 install --no-cache-dir -r requirements-ai.txt

# Copy Model Weights (Optimized for Thai Register Parsing)
# In production, these are often mounted via Persistent Volumes
COPY ./models/phaya-thai-base ./models/phaya-thai-base
COPY ./src/ai_engine ./src/ai_engine

EXPOSE 8000
CMD ["python3", "src/ai_engine/main.py"]