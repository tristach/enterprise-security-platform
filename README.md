# Enterprise Security Platform (ESP)

## Overview
Enterprise Security Platform (ESP) is a cloud-native security dashboard that demonstrates how Kubernetes, Docker, Azure Log Analytics, Microsoft Sentinel, and KQL can be integrated into a modern security operations workflow.

---

## Dashboard

The dashboard displays Microsoft Sentinel alerts, severity, providers, MITRE ATT&CK mappings, entities, and descriptions retrieved from Azure Log Analytics.

- Built with Kubernetes (Deployments, Services, Ingress)
- Containerized using Docker
- Queries Azure Log Analytics with KQL
- Visualizes Microsoft Sentinel incidents
- Maps detections to MITRE ATT&CK
- Horizontally scalable architecture

<img width="951" height="383" alt="image" src="https://github.com/user-attachments/assets/382c21e8-2f4e-44fe-a326-df0f0bcd3994" />


# System Architecture
<img width="379" height="456" alt="image" src="https://github.com/user-attachments/assets/71991c34-e189-4285-89c6-9730747bf751" />

## Features

- Cloud-native Python Flask application
- Microsoft Sentinel integration
- Azure Log Analytics queries (KQL)
- Docker containerization
- Kubernetes Deployment, Service, and Ingress
- NGINX Ingress host-based routing
- Self-healing Kubernetes workloads
- Rolling deployments
- MITRE ATT&CK mapping
- Git/GitHub version control

---

## Skills Demonstrated

- Python
- Flask
- JavaScript
- HTML/CSS
- Docker
- Kubernetes
- NGINX Ingress
- Microsoft Azure
- Microsoft Sentinel
- Azure Log Analytics
- Kusto Query Language (KQL)
- Terraform
- Git & GitHub

---




# Kubernetes Deployment Architecture

```text
Deployment (esp-deployment)
        │
        ▼
Requests 3 replicas
        │
        ▼
Kubernetes creates 3 Pods
        │
        ▼
Each Pod label:
app=esp
        │
        ▼
Each Pod runs one container
        │
        ▼
Container:
esp
        │
        ▼
Docker image:
esp:v1
```

---



## MITRE ATT&CK Integration

The dashboard enriches Microsoft Sentinel alerts with MITRE ATT&CK metadata, allowing analysts to quickly identify associated tactics and techniques.

Implemented:

- MITRE ATT&CK tactics
- MITRE ATT&CK techniques
- SecurityAlert enrichment
- Dashboard visualization

| Rule | MITRE Tactic | Technique | Sub-technique |
|------|--------------|-----------|---------------|
| Windows Brute Force Login Attempt | Credential Access | T1110 Brute Force | — |
| BFA_Success | Credential Access | T1110 Brute Force | — |
| Sysmon - PowerShell Spawn Detection | Execution | T1059 | T1059.001 |
| Firewall Tampering | Defense Evasion | T1562 Impair Defenses | Depends on rule logic |
| Malware | Depends on detection logic | Depends on detection logic | Depends on rule logic |

---

## Kubernetes Notes

The application originally exposed the dashboard using a NodePort Service.

It was later refactored to use an NGINX Ingress Controller with a ClusterIP Service, providing a more production-oriented architecture similar to many real-world Kubernetes deployments.

Benefits:

- Internal-only Services
- Host-based routing
- Cleaner networking architecture
- Better scalability
- Easier migration to managed Kubernetes platforms

---

## Common Kubernetes Commands

```bash
kubectl get all

kubectl get deployments
kubectl get pods
kubectl get services
kubectl get ingress

kubectl describe deployment esp-deployment
kubectl describe service esp-service
kubectl describe ingress esp-ingress

kubectl rollout history deployment esp-deployment
kubectl rollout status deployment esp-deployment
kubectl rollout undo deployment esp-deployment
```

---

## Future Enhancements

- Horizontal Pod Autoscaling (HPA)
- CI/CD pipeline with GitHub Actions
- Infrastructure as Code using Terraform
- Application-level Role-Based Access Control (RBAC)
- Threat intelligence integration (e.g., VirusTotal or Microsoft Defender TI)
- Vulnerability management dashboard
- Automated incident response using Azure Logic Apps

---

## Purpose

This repository demonstrates practical experience designing, deploying, troubleshooting, and operating a cloud-native security application using Docker, Kubernetes, Microsoft Azure, Microsoft Sentinel, and modern DevSecOps practices.
