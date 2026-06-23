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
