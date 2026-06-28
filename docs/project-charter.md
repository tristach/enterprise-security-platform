# Enterprise Security Platform - Project Charter

## Vision

The Enterprise Security Platform is a cloud-native security application designed to demonstrate practical cloud security engineering, security monitoring, container orchestration, and modern infrastructure practices.

The platform will consume Microsoft Azure security telemetry and present actionable security information through a centralized web dashboard and REST API.

---

# Project Goals

* Build a production-style cloud security platform.
* Demonstrate Microsoft Azure security technologies.
* Display live security information from Azure.
* Deploy and manage containerized workloads with Kubernetes.
* Demonstrate Infrastructure as Code using Terraform.
* Showcase secure software engineering practices.

---

# Primary Technologies

* Microsoft Azure
* Microsoft Sentinel
* Log Analytics
* KQL
* Python
* Flask
* Docker
* Kubernetes
* Terraform
* Git & GitHub

---

# High-Level Architecture

```text
Microsoft Azure
        │
        ▼
Microsoft Sentinel / Log Analytics
        │
        ▼
Security Data
        │
        ▼
Flask Dashboard & REST API
        │
        ▼
Docker
        │
        ▼
Kubernetes
        │
        ▼
Web Dashboard
```

---

# Current Development Phase

Current work focuses on building the platform foundation.

Completed:

* Docker containerization
* Kubernetes Deployment
* Kubernetes Service
* Kubernetes Ingress
* Rolling updates
* Self-healing Deployments
* JSON-based security data model
* Flask REST API

The current JSON data is temporary scaffolding and will be replaced with Azure security telemetry.

---

# Planned Milestones

1. Replace mock security data with Azure-derived data.
2. Integrate Microsoft Sentinel and Log Analytics.
3. Build security dashboards using live telemetry.
4. Implement Infrastructure as Code with Terraform.
5. Add authentication and role-based access.
6. Implement CI/CD for automated deployments.

---

# Success Criteria

The completed platform should demonstrate the ability to design, deploy, and operate a cloud-native security application using Microsoft Azure, Kubernetes, Docker, and modern security engineering practices.
