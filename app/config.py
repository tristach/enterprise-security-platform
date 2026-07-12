import os

from dotenv import load_dotenv


load_dotenv()


AZURE_TENANT_ID = os.getenv("AZURE_TENANT_ID")
AZURE_CLIENT_ID = os.getenv("AZURE_CLIENT_ID")
AZURE_CLIENT_SECRET = os.getenv("AZURE_CLIENT_SECRET")
LOG_ANALYTICS_WORKSPACE_ID = os.getenv(
    "LOG_ANALYTICS_WORKSPACE_ID"
)