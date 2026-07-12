from flask import Blueprint, jsonify, render_template

from sentinel import get_alert_data


main = Blueprint("main", __name__)


@main.route("/")
def dashboard():
    alerts = get_alert_data()

    return render_template(
        "index.html",
        alerts=alerts,
    )


@main.route("/alerts")
def alerts():
    alert_data = get_alert_data()

    return jsonify(alert_data)