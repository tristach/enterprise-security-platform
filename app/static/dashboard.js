const searchInput = document.getElementById("searchInput");
const severityFilter = document.getElementById("severityFilter");
const statusFilter = document.getElementById("statusFilter");
const providerFilter = document.getElementById("providerFilter");

const rows = Array.from(document.querySelectorAll("tbody tr"));

function filterTable() {
    const searchValue = searchInput.value.toLowerCase();
    const severityValue = severityFilter.value.toLowerCase();
    const statusValue = statusFilter.value.toLowerCase();
    const providerValue = providerFilter.value.toLowerCase();

    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();

        const severity = row.children[1].textContent.trim().toLowerCase();
        const status = row.children[2].textContent.trim().toLowerCase();
        const provider = row.children[3].textContent.trim().toLowerCase();

        const matchesSearch = rowText.includes(searchValue);
        const matchesSeverity = severityValue === "" || severity === severityValue;
        const matchesStatus = statusValue === "" || status === statusValue;
        const matchesProvider = providerValue === "" || provider === providerValue;

        if (matchesSearch && matchesSeverity && matchesStatus && matchesProvider) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function populateFilterOptions(filterElement, columnIndex) {
    const values = new Set();

    rows.forEach(row => {
        const value = row.children[columnIndex].textContent.trim();

        if (value && value !== "N/A") {
            values.add(value);
        }
    });

    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        filterElement.appendChild(option);
    });
}

populateFilterOptions(severityFilter, 1);
populateFilterOptions(statusFilter, 2);
populateFilterOptions(providerFilter, 3);

searchInput.addEventListener("input", filterTable);
severityFilter.addEventListener("change", filterTable);
statusFilter.addEventListener("change", filterTable);
providerFilter.addEventListener("change", filterTable);