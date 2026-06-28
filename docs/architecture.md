# Enterprise Security Platform - Architecture

## Overview

The Enterprise Security Platform is designed as a cloud-native security dashboard and API. The platform runs as a containerized application on Kubernetes and is designed to consume Azure security data from Microsoft Sentinel and Log Analytics.

## Target Architecture

```text
Microsoft Azure
        │
        ▼
Log Analytics Workspace
        │
        ▼
Microsoft Sentinel
        │
        ▼
KQL Security Queries
        │
        ▼
Flask Dashboard & REST API
        │
        ▼
Docker Container
        │
        ▼
Kubernetes Deployment
        │
        ▼
Kubernetes Service
        │
        ▼
Ingress Controller
        │
        ▼
Browser Dashboard

Browser
        │
        ▼
Ingress Controller
        │
        ▼
Ingress Resource
        │
        ▼
Kubernetes Service
        │
        ▼
Pods
        │
        ▼
Flask Application
        │
        ▼
alerts.json