# Specialized Dockerfile for CV Workloads with GPU Support
FROM nvidia/cuda:11.8.0-base-ubuntu22.04

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
RUN pip3 install --no-cache-dir diffusers transformers accelerate opencv-python scikit-learn pillow

# Copy source code
COPY src/cv/ /app/cv/
COPY configs/ /app/configs/

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV TRANSFORMERS_CACHE=/app/models/cache

# Start the worker (e.g., Celery or RabbitMQ consumer)
CMD ["python3", "-m", "cv.worker_listener"]