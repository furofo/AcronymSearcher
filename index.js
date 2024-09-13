// Simulate reading JSON file from root
const data = {
    "departments": ["IT", "HR", "Finance"],
    "acronyms": {
        "IT": {
            "HTTP": "HyperText Transfer Protocol",
            "FTP": "File Transfer Protocol",
            "API": "Application Programming Interface"
        },
        "HR": {
            "EOD": "End of Day",
            "PTO": "Paid Time Off",
            "HRIS": "Human Resource Information System"
        },
        "Finance": {
            "ROI": "Return on Investment",
            "EBITDA": "Earnings Before Interest, Taxes, Depreciation, and Amortization",
            "CAGR": "Compound Annual Growth Rate"
        }
    }
};

const departmentSelect = document.getElementById('department');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const definitionDiv = document.getElementById('definition');

// Populate department dropdown
data.departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    option.textContent = department;
    departmentSelect.appendChild(option);
});

let selectedDepartment = "";
let currentAcronyms = {};

// Listen for department change
departmentSelect.addEventListener('change', function () {
    selectedDepartment = this.value;
    currentAcronyms = data.acronyms[selectedDepartment];
    searchInput.value = '';
    resultsDiv.innerHTML = '';
    definitionDiv.style.display = 'none'; // Hide definition when department is changed
});

// Listen for input in the search box
searchInput.addEventListener('input', function () {
    const query = this.value.toUpperCase();
    if (!selectedDepartment || !query) {
        resultsDiv.style.display = 'none';
        definitionDiv.style.display = 'none'; // Hide definition if no department or input
        return;
    }

    // Filter acronyms based on search input
    const matches = Object.keys(currentAcronyms).filter(acronym => acronym.startsWith(query));

    if (matches.length > 0) {
        resultsDiv.innerHTML = '';
        resultsDiv.style.display = 'block';
        definitionDiv.style.display = 'none'; // Hide definition if results are shown
        matches.forEach(acronym => {
            const resultItem = document.createElement('div');
            resultItem.textContent = acronym;
            resultItem.addEventListener('click', function () {
                displayDefinition(acronym);
            });
            resultsDiv.appendChild(resultItem);
        });
    } else {
        resultsDiv.style.display = 'none';
        showNoMatch();
    }
});

// Display definition when acronym is selected
function displayDefinition(acronym) {
    definitionDiv.innerHTML = `<strong>${acronym}:</strong> ${currentAcronyms[acronym]}`;
    definitionDiv.style.display = 'block'; // Show definition when item is selected
    resultsDiv.style.display = 'none';
    searchInput.value = acronym;
}

// Show "No match" message in red
function showNoMatch() {
    definitionDiv.innerHTML = `<span class="no-match">No match found</span>`;
    definitionDiv.style.display = 'block'; // Show definition with "No match" message
}

// Allow tab + enter to select first acronym in results
searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Enter') {
        const firstResult = resultsDiv.querySelector('div');
        if (firstResult) {
            displayDefinition(firstResult.textContent);
            e.preventDefault(); // Prevent default behavior of tab
        }
    }
});
