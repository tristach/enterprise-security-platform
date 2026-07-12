from azure.identity import ClientSecretCredential
from azure.monitor.query import LogsQueryClient

from config import (
    AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET,
    AZURE_TENANT_ID,
    LOG_ANALYTICS_WORKSPACE_ID,
)
from helpers import format_mitre


credential = ClientSecretCredential(
    tenant_id=AZURE_TENANT_ID,
    client_id=AZURE_CLIENT_ID,
    client_secret=AZURE_CLIENT_SECRET,
)

client = LogsQueryClient(credential)


query = """
SecurityAlert
| order by TimeGenerated desc
| take 10
"""


def get_alert_data():
    response = client.query_workspace(
        LOG_ANALYTICS_WORKSPACE_ID,
        query,
        timespan=None,
    )

    alerts = []

    if response.tables:
        table = response.tables[0]

        for row in table.rows:
            formatted_time = row[1].strftime(
                "%b %d, %Y %H:%M UTC"
            )

            alert = {
                "alert_name": row[3] or "N/A",
                "severity": row[4] or "N/A",
                "time": formatted_time,
                "provider": row[6] or "N/A",
                "status": row[29] or "N/A",
                "entity": row[30] or "N/A",
                "tactics": format_mitre(row[31]),
                "techniques": format_mitre(row[32]),
                "description": row[5] or "N/A",
            }

            alerts.append(alert)

    return alerts