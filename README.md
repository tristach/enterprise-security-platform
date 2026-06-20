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
