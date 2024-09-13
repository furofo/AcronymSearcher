// Simulate reading JSON file from root
const data = {
    "departments": ["IT", "HR", "Finance"]
};

const departmentSelect = document.getElementById('department');
const saveSettingsBtn = document.getElementById('saveSettings');
const messageDiv = document.getElementById('message');

// Populate department dropdown
data.departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    option.textContent = department;
    departmentSelect.appendChild(option);
});

// Save selected department to localStorage
saveSettingsBtn.addEventListener('click', function () {
    const selectedDepartment = departmentSelect.value;
    if (!selectedDepartment) {
        showMessage('Please select a department.');
        return;
    }
    localStorage.setItem('selectedDepartment', selectedDepartment);
    showMessage('Department saved successfully!', 'success');
});

// Pre-select the department if it's already saved
const storedDepartment = localStorage.getItem('selectedDepartment');
if (storedDepartment) {
    departmentSelect.value = storedDepartment;
}

// Function to display messages
function showMessage(text, type = 'error') {
    messageDiv.textContent = text;
    messageDiv.classList.remove('hidden');
    messageDiv.classList.add(type === 'success' ? 'success' : 'error');
}
