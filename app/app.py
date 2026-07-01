import os
from dotenv import load_dotenv
from azure.identity import ClientSecretCredential
from azure.monitor.query import LogsQueryClient
from flask import Flask, jsonify, render_template

load_dotenv()

app = Flask(__name__)

tenant_id = os.getenv("AZURE_TENANT_ID")
client_id = os.getenv("AZURE_CLIENT_ID")
client_secret = os.getenv("AZURE_CLIENT_SECRET")
workspace_id = os.getenv("LOG_ANALYTICS_WORKSPACE_ID")

credential = ClientSecretCredential(
    tenant_id=tenant_id,
    client_id=client_id,
    client_secret=client_secret,
)

client = LogsQueryClient(credential)

query = """
SecurityAlert
| take 5
"""


def get_alert_data():
    response = client.query_workspace(
        workspace_id,
        query,
        timespan=None,
    )

    alerts = []

    if response.tables:
        table = response.tables[0]

        for row in table.rows:

            formatted_time = row[1].strftime("%b %d, %Y %H:%M UTC")

            alert = {
                "alert_name": row[3],
                "severity": row[4],
                "time": formatted_time,
                "provider": row[6],
                "status": row[29],
                "tactics": row[31],
                "techniques": row[32],
                "entity": row[30],
                "description": row[5],
            }

            alerts.append(alert)

    return alerts

@app.route("/")
def dashboard():
    alerts = get_alert_data()
    return render_template("index.html", alerts=alerts)


@app.route("/alerts")
def get_alerts():
    alerts = get_alert_data()
    return jsonify(alerts)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)