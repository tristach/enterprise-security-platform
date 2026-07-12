def format_mitre(value):
    if not value:
        return "N/A"

    value = str(value)

    replacements = {
        "CredentialAccess": "Credential Access",
        "InitialAccess": "Initial Access",
        "DefenseEvasion": "Defense Evasion",
        "CommandAndControl": "Command and Control",
        "PrivilegeEscalation": "Privilege Escalation",
        "Execution": "Execution",
        "Persistence": "Persistence",
        "Discovery": "Discovery",
        "LateralMovement": "Lateral Movement",
        "Collection": "Collection",
        "Exfiltration": "Exfiltration",
        "Impact": "Impact",
    }

    return replacements.get(value, value)