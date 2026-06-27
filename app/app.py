from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return """
    <h1>Nick's Cloud SOC Dashboard</h1>
    <p>Containerized Flask app running on Kubernetes.</p>
    <ul>
        <li><a href="/health">Health Check</a></li>
        <li><a href="/version">Version</a></li>
        <li><a href="/alerts">Security Alerts</a></li>
    </ul>
    """

@app.route("/health")
def health():
    return {"status": "healthy"}

@app.route("/version")
def version():
    return {"app": "cloud-soc-dashboard", "version": "0.1.0"}

@app.route("/alerts")
def alerts():
    return {
        "alerts": [
            {"type": "brute_force_attempt", "severity": "medium"},
            {"type": "firewall_tampering", "severity": "high"},
            {"type": "key_vault_activity", "severity": "high"}
        ]
    }

app.run(host="0.0.0.0", port=5000)