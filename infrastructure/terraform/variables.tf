variable "project_name" {
  default = "thai-creative-ai"
}

variable "region" {
  description = "Primary region for Public Cloud (latency-sensitive for Thailand)"
  default     = "asia-southeast-1" # Singapore (closest to Thailand for GCP/AWS)
}

variable "hybrid_connect_ip" {
  description = "Internal IP of the On-Prem GPU Cluster for Phaya Thai LLM"
  type        = string
}

variable "pdpa_compliance_logging" {
  description = "Enable strict logging for Thai PDPA data protection"
  default     = true
}