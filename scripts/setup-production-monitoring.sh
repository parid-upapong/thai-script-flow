#!/bin/bash
# Setup script for TCAI Monitoring (Prometheus/Grafana)
# Focuses on monitoring Thai Language Tokenization Latency

echo "🚀 Initializing TCAI Production Monitoring..."

# Add Helm Repos
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus with custom scrape configs for Phaya Thai Engine
helm install tcai-monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=$(openssl rand -base64 12)

# Apply custom Dashboard for Thai Creative Workflows
kubectl apply -f monitoring/dashboards/production-metrics.yaml

echo "✅ Monitoring Stack Deployed."
echo "Note: Ensure 'thai_tokenization_latency_ms' is being exported by AI microservices."