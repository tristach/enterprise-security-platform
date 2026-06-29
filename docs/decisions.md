# Architectural Decisions

## 2026-06-28

Decision:
Use Flask for the dashboard.

Reason:
Simple, lightweight, excellent Kubernetes support.

---

Decision:
Use Kubernetes instead of Azure App Service.

Reason:
Primary career goal is Cloud Security / Platform Engineering.

---

Decision:
Mock JSON is temporary.

Reason:
Allows platform development before Azure integration.

---

## 2026-06-29

Decision:
Use the Microsoft Sentinel REST API as the primary live data source for the dashboard.

Reason:
Sentinel already contains the incident-level SOC data needed for the platform, including incident title, severity, status, created time, related alerts, and investigation context. Using the Sentinel REST API keeps the dashboard focused on security operations instead of rebuilding detection logic from raw logs.

Design:
Microsoft Sentinel
        ↓
Sentinel REST API
        ↓
Flask Dashboard/API
        ↓
Docker
        ↓
Kubernetes
        ↓
Browser Dashboard

## 2026-06-29 - Sentinel REST API as Primary Data Source

Decision:
The Enterprise Security Platform will use the Microsoft Sentinel REST API as the primary source for live incident data.

Reason:
Microsoft Sentinel already contains SOC-level incident information such as title, severity, status, timestamps, related alerts, and investigation context. Pulling incident data directly from Sentinel keeps the platform focused on security operations instead of rebuilding detections from raw logs.

Architecture:
Microsoft Sentinel
        ↓
Sentinel REST API
        ↓
Flask Dashboard/API
        ↓
Docker
        ↓
Kubernetes
        ↓
Browser Dashboard

Notes:
Log Analytics and KQL may be added later for deeper telemetry panels, but the first live-data milestone will focus on Sentinel incidents.