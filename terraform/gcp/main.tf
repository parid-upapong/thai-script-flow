# Infrastructure for ThaiCreative AI - GKE with GPU T4 Nodes
provider "google" {
  project = var.project_id
  region  = "asia-southeast1" # Low latency for Thai users
}

resource "google_container_cluster" "tcai_cluster" {
  name     = "tcai-production-cluster"
  location = "asia-southeast1-a"

  remove_default_node_pool = true
  initial_node_count       = 1

  # Enabling PDPA Compliant Logging
  logging_service    = "logging.googleapis.com/kubernetes"
  monitoring_service = "monitoring.googleapis.com/kubernetes"
}

# Standard Pool for Next.js and API
resource "google_container_node_pool" "general_purpose" {
  name       = "general-pool"
  cluster    = google_container_cluster.tcai_cluster.id
  node_count = 3

  node_config {
    machine_type = "e2-standard-4"
    labels = {
      role = "frontend-api"
    }
  }
}

# GPU Pool specifically for Phaya Thai LLM & Storyboard Synthesis
resource "google_container_node_pool" "gpu_pool" {
  name       = "gpu-inference-pool"
  cluster    = google_container_cluster.tcai_cluster.id
  
  autoscaling {
    min_node_count = 1
    max_node_count = 10
  }

  node_config {
    machine_type = "n1-standard-8"
    guest_accelerator {
      type  = "nvidia-tesla-t4"
      count = 1
    }
    
    taint {
      key    = "workload"
      value  = "ai-inference"
      effect = "NO_SCHEDULE"
    }

    labels = {
      accelerator = "nvidia-t4"
      usage       = "phaya-thai-engine"
    }
  }
}