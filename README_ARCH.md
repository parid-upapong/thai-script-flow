# Implementation Guide: Scalable Hybrid-Cloud

## Local Development
1. Run `docker-compose up` to start the core API, Redis, and Vector DB.
2. The `ai-orchestrator` points to a mock LLM endpoint by default.

## Production Deployment
1. **Core Cluster:** Deploy the Kubernetes manifests in `k8s/` to an EKS/GKE cluster in Singapore (`asia-southeast-1`).
2. **GPU Cluster:** Deploy the `phaya-thai-inference` pods on a bare-metal GPU provider (e.g., Genesis Cloud or local Thai Data Center) with NVIDIA H100s.
3. **Networking:** Ensure the `hybrid_connect_ip` is whitelisted in the API Gateway's security group.
4. **Data Privacy:** All creative assets are encrypted at rest. Logs containing PII are scrubbed before reaching the monitoring stack to comply with Thai PDPA.