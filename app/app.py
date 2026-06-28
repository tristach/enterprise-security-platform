import json
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    with open("alerts.json", "r") as file:
        data = json.load(file)

    alerts = data["alerts"]
    alert_count = len(alerts)

    alert_list = ""

    for alert in alerts:
        alert_list += f"""
        <li>
            <strong>{alert["type"]}</strong><br>
            Severity: {alert["severity"]}<br>
            Source: {alert["source"]}<br>
            Status: {alert["status"]}
        </li>
        """

    return f"""
    <h1>Nick's Cloud SOC Dashboard</h1>
    <p>Containerized Flask app running on Kubernetes.</p>
    <p>Current Open Alerts: {alert_count}</p>

    <h2>Current Alerts</h2>
    <ul>
        {alert_list}
    </ul>

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
    with open("alerts.json", "r") as file:
        data = json.load(file)
    return data

app.run(host="0.0.0.0", port=5000)