// Simulate reading JSON file from root
const data = {
    "departments": ["IT", "HR", "Finance"],
    "acronyms": {
        "IT": {
            "HTTP": "HyperText Transfer Protocol",
            "FTP": "File Transfer Protocol",
            "API": "Application Programming Interface",
            "HTTPS": "HyperText Transfer Protocol Secure"
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

// Get elements from DOM
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const definitionDiv = document.getElementById('definition');
const departmentNameSpan = document.getElementById('department-name');
const noDepartmentMessageDiv = document.getElementById('no-department-message');

// Read selected department from localStorage
let selectedDepartment = localStorage.getItem('selectedDepartment');

// Check if department is selected, otherwise show the message with the link
if (!selectedDepartment) {
    noDepartmentMessageDiv.classList.remove('hidden');
} else {
    // Hide the no-department message and display the selected department
    noDepartmentMessageDiv.classList.add('hidden');
    departmentNameSpan.textContent = selectedDepartment;

    let currentAcronyms = data.acronyms[selectedDepartment];
    let selectedIndex = -1; // To track the currently selected item

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
            matches.forEach((acronym, index) => {
                const resultItem = document.createElement('div');
                resultItem.textContent = acronym;
                resultItem.classList.add('search-result');
                resultItem.addEventListener('click', function () {
                    displayDefinition(acronym);
                });
                resultsDiv.appendChild(resultItem);
            });
            selectedIndex = -1; // Reset selection index
        } else {
            resultsDiv.style.display = 'none';
            showNoMatch();
        }
    });

    // Handle keydown events for Tab, Enter, Up, and Down keys
    searchInput.addEventListener('keydown', function (e) {
        const results = resultsDiv.querySelectorAll('.search-result');

        if (results.length > 0) {
            if (e.key === 'Tab' || e.key === 'ArrowDown') {
                e.preventDefault(); // Prevent default tabbing behavior

                // Remove highlight from the previously selected item
                if (selectedIndex >= 0) {
                    results[selectedIndex].classList.remove('highlight');
                }

                // Cycle through results (forward with Tab or Down arrow)
                selectedIndex = (selectedIndex + 1) % results.length;

                // Highlight the newly selected item
                results[selectedIndex].classList.add('highlight');
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault(); // Prevent default behavior

                // Remove highlight from the previously selected item
                if (selectedIndex >= 0) {
                    results[selectedIndex].classList.remove('highlight');
                }

                // Cycle through results (backward with Up arrow)
                selectedIndex = (selectedIndex - 1 + results.length) % results.length;

                // Highlight the newly selected item
                results[selectedIndex].classList.add('highlight');
            }

            if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                // If Enter is pressed, display the definition for the selected acronym
                const selectedAcronym = results[selectedIndex].textContent;
                displayDefinition(selectedAcronym);
            }
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
}
