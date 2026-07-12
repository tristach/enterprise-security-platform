const searchInput = document.getElementById("searchInput");
const severityFilter = document.getElementById("severityFilter");
const statusFilter = document.getElementById("statusFilter");
const providerFilter = document.getElementById("providerFilter");

const tableBody = document.querySelector("tbody");

const summaryCards = Array.from(
    document.querySelectorAll(".filter-card")
);

let rows = Array.from(tableBody.querySelectorAll("tr"));
let cardSeverityFilter = "";
let refreshInProgress = false;

const refreshIntervalMilliseconds = 30000;


function filterTable() {
    const searchValue =
        searchInput.value.trim().toLowerCase();

    const dropdownSeverity =
        severityFilter.value.trim().toLowerCase();

    const severityValue =
        cardSeverityFilter || dropdownSeverity;

    const statusValue =
        statusFilter.value.trim().toLowerCase();

    const providerValue =
        providerFilter.value.trim().toLowerCase();

    rows.forEach(row => {
        const rowText =
            row.textContent.toLowerCase();

        const severity =
            row.children[1].textContent.trim().toLowerCase();

        const status =
            row.children[2].textContent.trim().toLowerCase();

        const provider =
            row.children[3].textContent.trim().toLowerCase();

        const matchesSearch =
            rowText.includes(searchValue);

        const matchesSeverity =
            severityValue === "" ||
            severity === severityValue;

        const matchesStatus =
            statusValue === "" ||
            status === statusValue;

        const matchesProvider =
            providerValue === "" ||
            provider === providerValue;

        const shouldDisplay =
            matchesSearch &&
            matchesSeverity &&
            matchesStatus &&
            matchesProvider;

        row.style.display = shouldDisplay ? "" : "none";
    });
}


function populateFilterOptions(
    filterElement,
    columnIndex,
    selectedValue = ""
) {
    const values = new Set();

    rows.forEach(row => {
        const value =
            row.children[columnIndex].textContent.trim();

        if (value && value !== "N/A") {
            values.add(value);
        }
    });

    while (filterElement.options.length > 1) {
        filterElement.remove(1);
    }

    Array.from(values)
        .sort()
        .forEach(value => {
            const option = document.createElement("option");

            option.value = value;
            option.textContent = value;

            filterElement.appendChild(option);
        });

    const optionStillExists = Array.from(
        filterElement.options
    ).some(option => option.value === selectedValue);

    filterElement.value =
        optionStillExists ? selectedValue : "";
}


function refreshFilterOptions() {
    const selectedSeverity = severityFilter.value;
    const selectedStatus = statusFilter.value;
    const selectedProvider = providerFilter.value;

    populateFilterOptions(
        severityFilter,
        1,
        selectedSeverity
    );

    populateFilterOptions(
        statusFilter,
        2,
        selectedStatus
    );

    populateFilterOptions(
        providerFilter,
        3,
        selectedProvider
    );
}


function clearActiveCard() {
    summaryCards.forEach(card => {
        card.classList.remove("active");
    });
}


function activateSummaryCard(card) {
    const selectedSeverity =
        card.dataset.severity.toLowerCase();

    clearActiveCard();
    card.classList.add("active");

    if (selectedSeverity === "") {
        cardSeverityFilter = "";

        searchInput.value = "";
        severityFilter.value = "";
        statusFilter.value = "";
        providerFilter.value = "";
    } else {
        cardSeverityFilter = selectedSeverity;

        const matchingOption = Array.from(
            severityFilter.options
        ).find(option => {
            return option.value.toLowerCase() ===
                selectedSeverity;
        });

        severityFilter.value = matchingOption
            ? matchingOption.value
            : "";
    }

    filterTable();
}


function handleSummaryCardKeyboard(event, card) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateSummaryCard(card);
    }
}


function createTableCell(value) {
    const cell = document.createElement("td");

    cell.textContent =
        value === null ||
        value === undefined ||
        value === ""
            ? "N/A"
            : value;

    return cell;
}


function createSeverityCell(severity) {
    const cell = document.createElement("td");
    const badge = document.createElement("span");

    const severityText = severity || "N/A";
    const severityClass =
        severityText.toLowerCase();

    badge.textContent = severityText;
    badge.classList.add("severity");

    if (
        severityClass === "high" ||
        severityClass === "medium" ||
        severityClass === "low"
    ) {
        badge.classList.add(severityClass);
    } else {
        badge.classList.add("unknown");
    }

    cell.appendChild(badge);

    return cell;
}


function createAlertRow(alert) {
    const row = document.createElement("tr");

    row.appendChild(
        createTableCell(alert.alert_name)
    );

    row.appendChild(
        createSeverityCell(alert.severity)
    );

    row.appendChild(
        createTableCell(alert.status)
    );

    row.appendChild(
        createTableCell(alert.provider)
    );

    row.appendChild(
        createTableCell(alert.time)
    );

    row.appendChild(
        createTableCell(alert.tactics)
    );

    row.appendChild(
        createTableCell(alert.techniques)
    );

    row.appendChild(
        createTableCell(alert.entity)
    );

    row.appendChild(
        createTableCell(alert.description)
    );

    return row;
}


function updateAlertTable(alerts) {
    tableBody.replaceChildren();

    alerts.forEach(alert => {
        tableBody.appendChild(
            createAlertRow(alert)
        );
    });

    rows = Array.from(
        tableBody.querySelectorAll("tr")
    );
}


function updateSummaryCards(alerts) {
    const alertCounts = {
        total: alerts.length,
        high: 0,
        medium: 0,
        low: 0,
    };

    alerts.forEach(alert => {
        const severity =
            String(alert.severity || "").toLowerCase();

        if (
            severity === "high" ||
            severity === "medium" ||
            severity === "low"
        ) {
            alertCounts[severity] += 1;
        }
    });

    summaryCards.forEach(card => {
        const severity =
            card.dataset.severity.toLowerCase();

        const countElement =
            card.querySelector("p");

        if (!countElement) {
            return;
        }

        if (severity === "") {
            countElement.textContent =
                alertCounts.total;
        } else {
            countElement.textContent =
                alertCounts[severity] ?? 0;
        }
    });
}


async function refreshAlerts() {
    if (refreshInProgress) {
        return;
    }

    refreshInProgress = true;

    try {
        const response = await fetch("/alerts", {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(
                `Alert request failed: ${response.status}`
            );
        }

        const alerts = await response.json();

        if (!Array.isArray(alerts)) {
            throw new Error(
                "The /alerts response was not an array."
            );
        }

        updateAlertTable(alerts);
        updateSummaryCards(alerts);
        refreshFilterOptions();
        filterTable();

        console.log(
            `Alerts refreshed at ${new Date().toLocaleTimeString()}`
        );
    } catch (error) {
        console.error(
            "Unable to refresh dashboard alerts:",
            error
        );
    } finally {
        refreshInProgress = false;
    }
}


refreshFilterOptions();

searchInput.addEventListener(
    "input",
    filterTable
);

severityFilter.addEventListener(
    "change",
    () => {
        cardSeverityFilter = "";
        clearActiveCard();
        filterTable();
    }
);

statusFilter.addEventListener(
    "change",
    filterTable
);

providerFilter.addEventListener(
    "change",
    filterTable
);

summaryCards.forEach(card => {
    card.addEventListener("click", () => {
        activateSummaryCard(card);
    });

    card.addEventListener(
        "keydown",
        event => {
            handleSummaryCardKeyboard(
                event,
                card
            );
        }
    );
});

setInterval(
    refreshAlerts,
    refreshIntervalMilliseconds
);