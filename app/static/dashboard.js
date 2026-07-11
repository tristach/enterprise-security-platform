const searchInput = document.getElementById("searchInput");
const severityFilter = document.getElementById("severityFilter");
const statusFilter = document.getElementById("statusFilter");
const providerFilter = document.getElementById("providerFilter");

const rows = Array.from(document.querySelectorAll("tbody tr"));
const summaryCards = Array.from(
    document.querySelectorAll(".filter-card")
);

let cardSeverityFilter = "";

function filterTable() {
    const searchValue = searchInput.value.trim().toLowerCase();

    const dropdownSeverity =
        severityFilter.value.trim().toLowerCase();

    const severityValue =
        cardSeverityFilter || dropdownSeverity;

    const statusValue =
        statusFilter.value.trim().toLowerCase();

    const providerValue =
        providerFilter.value.trim().toLowerCase();

    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();

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

function populateFilterOptions(filterElement, columnIndex) {
    const values = new Set();

    rows.forEach(row => {
        const value =
            row.children[columnIndex].textContent.trim();

        if (value && value !== "N/A") {
            values.add(value);
        }
    });

    Array.from(values)
        .sort()
        .forEach(value => {
            const option = document.createElement("option");

            option.value = value;
            option.textContent = value;

            filterElement.appendChild(option);
        });
}

function clearActiveCard() {
    summaryCards.forEach(card => {
        card.classList.remove("active");
    });
}

function activateSummaryCard(card) {
    const selectedSeverity = card.dataset.severity;

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
            return option.value.toLowerCase() === selectedSeverity;
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

populateFilterOptions(severityFilter, 1);
populateFilterOptions(statusFilter, 2);
populateFilterOptions(providerFilter, 3);

searchInput.addEventListener("input", filterTable);

severityFilter.addEventListener("change", () => {
    cardSeverityFilter = "";
    clearActiveCard();
    filterTable();
});

statusFilter.addEventListener("change", filterTable);
providerFilter.addEventListener("change", filterTable);

summaryCards.forEach(card => {
    card.addEventListener("click", () => {
        activateSummaryCard(card);
    });

    card.addEventListener("keydown", event => {
        handleSummaryCardKeyboard(event, card);
    });
});