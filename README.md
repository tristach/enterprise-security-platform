# Enterprise Security Platform

## Overview

The Enterprise Security Platform is a cloud-native security application designed to demonstrate modern cloud security engineering, container orchestration, and security monitoring practices.

The platform is built around Microsoft Azure and is intended to aggregate, process, and present security information through a centralized web-based dashboard.

---

## Objectives

* Build a production-style cloud security platform
* Demonstrate secure application architecture
* Consume and present Azure security telemetry
* Deploy containerized services using Kubernetes
* Implement Infrastructure as Code with Terraform
* Showcase cloud security engineering workflows

---

## Planned Architecture

```text
Microsoft Azure
        │
        ▼
Microsoft Sentinel / Log Analytics
        │
        ▼
Security Data API
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

## Current Capabilities

* Dockerized Python application
* Kubernetes Deployment, Service, and Ingress
* JSON-based security data model
* REST API endpoints
* Rolling deployments
* Self-healing Kubernetes workloads
* Git-based development workflow

---

## Planned Enhancements

* Live Azure security telemetry
* Microsoft Sentinel integration
* KQL-powered data retrieval
* Authentication and authorization
* Infrastructure as Code using Terraform
* CI/CD pipeline
* Security reporting and analytics

---

## Technologies

* Python
* Flask
* Docker
* Kubernetes
* Microsoft Azure
* Microsoft Sentinel
* Log Analytics
* KQL
* Terraform
* Git & GitHub

---

## Purpose

This repository demonstrates the design and implementation of a cloud-native security platform using modern infrastructure, containerization, and cloud security technologies.


# enterprise-security-platform

#In layman's terms:
Deployment (nick-portfolio)
        ↓
Wants 3 replicas
        ↓
Creates 3 Pods
        ↓
Each Pod gets label:
app=nick-portfolio
        ↓
Each Pod contains 1 container
        ↓
Container name:
nick-portfolio
        ↓
Created from image:
nick-vs-docker-app:v3

June 22, 2026

Learned:
- Kubernetes Service
- ClusterIP vs NodePort
- Service selectors
- Pod recreation
- Rolling updates
- Rollback commands

Commands used:
kubectl get all
kubectl describe service nick-portfolio-service
kubectl rollout history deployment nick-portfolio
kubectl rollout status deployment nick-portfolio
kubectl rollout undo deployment nick-portfolio

## Current Kubernetes Architecture

This project currently runs a Dockerized Flask portfolio application on Kubernetes.

Traffic flow:

Browser
↓
NGINX Ingress Controller
↓
Ingress Resource
↓
ClusterIP Service
↓
Pods
↓
Flask Container

The application originally used a NodePort Service for browser access. After adding an NGINX Ingress Controller, the Service was converted to ClusterIP so that the application is only exposed internally inside the cluster. External traffic now enters through the Ingress Controller.
