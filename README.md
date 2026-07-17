# Enterprise Security Platform (ESP)

## Overview

The Enterprise Security Platform (ESP) is a cloud-native security dashboard demonstrating modern DevSecOps, cloud security engineering, containerization, and Kubernetes deployment practices.

The application queries Microsoft Azure Log Analytics (including Microsoft Sentinel data), processes the results with a Python Flask backend, and presents them through a Kubernetes-hosted web dashboard.

---

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

## Technologies

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

# System Architecture

```text
Browser
      │
      ▼
NGINX Ingress Controller
      │
      ▼
Ingress (esp-ingress)
      │
      ▼
ClusterIP Service (esp-service)
      │
      ▼
ESP Pods (3 replicas)
      │
      ▼
Flask Application
      │
      ▼
Python Backend
      │
      ▼
Microsoft Sentinel
      │
      ▼
Azure Log Analytics Workspace
```

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

## Dashboard

The dashboard displays Microsoft Sentinel alerts, severity, providers, MITRE ATT&CK mappings, entities, and descriptions retrieved from Azure Log Analytics.

<img width="939" height="454" alt="ESP Dashboard" src="https://github.com/user-attachments/assets/271b0776-635c-43b1-bd6a-066703cfdc64" />

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

- Live Azure authentication
- Role-Based Access Control (RBAC)
- Horizontal Pod Autoscaling (HPA)
- Terraform deployment automation
- CI/CD with GitHub Actions
- Threat intelligence integration
- Vulnerability management dashboard
- Incident response workflows

---

## Purpose

This repository demonstrates practical experience designing, deploying, troubleshooting, and operating a cloud-native security application using Docker, Kubernetes, Microsoft Azure, Microsoft Sentinel, and modern DevSecOps practices.