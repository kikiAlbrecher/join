const monthNames = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
};

/**
 * Initializes the datepicker by setting up event listeners and generating the calendar.
 */
function initializeDatepicker() {
    let selectedMonth = document.getElementById("selectedMonth");
    let selectedYear = document.getElementById("selectedYear");
    let monthSelect = document.getElementById("monthSelect");
    let yearSelect = document.getElementById("yearSelect");

    setupCalendarPopup(selectedMonth, selectedYear);
    document.getElementById("calendarTable").addEventListener("click", function (event) {
        handleDateSelection(event, selectedMonth, selectedYear);
    });
    setupDropdown(monthSelect, selectedMonth, (monthText) => updateCalendarForMonth(monthText, selectedYear));
    setupDropdown(yearSelect, selectedYear, (yearText) => updateCalendarForYear(yearText, selectedMonth));
    closePopupOnClickOutside();
}

/**
 * Formats a number to include a leading zero if it is less than 10.
 * @param {number} number - The number to format.
 * @returns {string} The formatted number as a string.
 */
function formatDate(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

/**
 * Checks if a given date is strictly in the past.
 * Allows the selection of the current day.
 * 
 * @param {number} day - The day of the month.
 * @param {number} month - The month (1-12).
 * @param {number} year - The year.
 * @returns {boolean} True if the date is strictly in the past, false otherwise.
 */
function isPastDate(day, month, year) {
    const today = new Date();
    const selectedDate = new Date(year, month - 1, day);

    return selectedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

/**
 * Generates the header row for the calendar table with weekday abbreviations.
 * @returns {string} The HTML string for the table header row.
 */
function generateTableHeader() {
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "So"];

    return `<tr>${days.map(day => `<th>${day}</th>`).join('')}</tr>`;
}

/**
 * Generates and renders a calendar for the specified month and year.
 *
 * Accepts either a numeric month (1–12) or a month name (e.g., "January").
 * Automatically adjusts invalid or undefined values to prevent rendering errors.
 * The function computes the number of days in the month and the weekday
 * on which the month starts, then builds and displays the calendar table.
 *
 * @param {string|number} month - The month to display (either name or number, where January = 1).
 * @param {number} year - The full year (e.g., 2025).
 */
function generateCalendar(month, year) {
    if (typeof month === "string") month = monthNames[month];
    if (month === undefined || isNaN(month)) return;

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;

    const tableHTML = generateTableHeader() + generateTableCells(firstDay, daysInMonth, month, year);
    document.getElementById("calendarTable").innerHTML = tableHTML;
}

/**
 * Generates the table cells for the calendar based on the given parameters.
 * @param {number} firstDay - The index of the first day of the month (0-6, where 0 is Sunday).
 * @param {number} daysInMonth - The total number of days in the month.
 * @param {number} month - The month (1-12).
 * @param {number} year - The year.
 * @returns {string} The HTML string for the table cells.
 */
function generateTableCells(firstDay, daysInMonth, month, year) {
    let tableHTML = "<tr>";

    for (let i = 0; i < firstDay; i++) {
        tableHTML += "<td></td>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isDisabled = isPastDate(day, month, year);
        const cellClass = isDisabled ? "disabled" : "selectable";
        tableHTML += `<td class="${cellClass}" data-day="${day}">${day}</td>`;
        if ((firstDay + day) % 7 === 0) tableHTML += "</tr><tr>";
    }
    tableHTML += "</tr>";
    return tableHTML;
}

/**
 * Toggles the visibility of an HTML element.
 * @param {HTMLElement} element - The element to toggle.
 */
function toggleVisibility(element) {
    if (!element) return;
    element.style.display = element.style.display === "block" ? "none" : "block";
}

/**
 * Resets the calendar view to the current month and year.
 * 
 * @param {HTMLElement} selectedMonth - The element displaying the currently selected month.
 * @param {HTMLElement} selectedYear - The element displaying the currently selected year.
 */
function resetCalendarToDefault(selectedMonth, selectedYear) {
    let today = new Date();
    const defaultMonthIndex = today.getMonth();
    const defaultYear = today.getFullYear();

    const monthNamesArray = Object.keys(monthNames);
    const defaultMonthName = monthNamesArray[defaultMonthIndex];

    selectedMonth.textContent = defaultMonthName;
    selectedYear.textContent = defaultYear;

    const defaultMonth = monthNames[defaultMonthName];
    generateCalendar(defaultMonth, defaultYear);
}

/**
 * Sets up the calendar popup and its initial state.
 * 
 * @param {HTMLElement} selectedMonth - The element displaying the currently selected month.
 * @param {HTMLElement} selectedYear - The element displaying the currently selected year.
 */
function setupCalendarPopup(selectedMonth, selectedYear) {
    const calendarIcon = document.getElementById("calendarIcon");
    const calendarPopup = document.getElementById("calendarPopup");

    if (!calendarIcon || !calendarPopup) return;

    calendarIcon.addEventListener("click", function () {
        toggleVisibility(calendarPopup);
        resetCalendarToDefault(selectedMonth, selectedYear);
    });
}

/**
 * Handles the selection of a date from the calendar and updates the input field.
 * 
 * @param {MouseEvent} event - The click event triggered on the calendar table.
 * @param {HTMLElement} selectedMonth - The element containing the currently selected month as text.
 * @param {HTMLElement} selectedYear - The element containing the currently selected year as text.
 */
function handleDateSelection(event, selectedMonth, selectedYear) {
    const target = event.target;

    if (target.classList.contains("selectable")) {
        const day = target.dataset.day;
        const month = monthNames[selectedMonth.textContent];
        const year = parseInt(selectedYear.textContent, 10);
        const inputDueDate = document.getElementById("inputDueDate");
        const calendarPopup = document.getElementById("calendarPopup");

        inputDueDate.value = `${formatDate(day)}/${formatDate(month)}/${year}`;
        calendarPopup.style.display = "none";
    }
}

/**
 * Sets up a dropdown menu and updates the selected value when an option is chosen.
 * @param {HTMLElement} selectElement - The container element for dropdown options.
 * @param {HTMLElement} selectedElement - The element displaying the currently selected value.
 * @param {Function} updateCallback - The callback function to execute when a new value is selected.
 */
function setupDropdown(selectElement, selectedElement, updateCallback) {
    const options = selectElement.querySelectorAll("div");

    selectedElement.addEventListener("click", function () {
        selectElement.classList.toggle("select-hide");
        selectedElement.classList.toggle("active");
    });
    options.forEach(option => {
        option.addEventListener("click", function () {
            selectedElement.textContent = option.textContent;
            selectElement.classList.add("select-hide");
            selectedElement.classList.remove("active");
            updateCallback(option.textContent);
        });
    });
}

/**
 * Updates the calendar display based on the newly selected month.
 *
 * This function converts the selected month name into a numeric value,
 * reads the current selected year from the provided element, and regenerates the calendar.
 *
 * @param {string} monthText - The name of the selected month.
 * @param {HTMLElement} selectedYear - The element containing the currently selected year as text.
 */
function updateCalendarForMonth(monthText, selectedYear) {
    const month = monthNames[monthText];
    const year = parseInt(selectedYear.textContent, 10);

    generateCalendar(month, year);
}

/**
 * Updates the calendar display based on the newly selected year.
 *
 * This function parses the selected year from the given text, reads the current
 * selected month from the provided element, and regenerates the calendar.
 *
 * @param {string} yearText - The selected year as a string.
 * @param {HTMLElement} selectedMonth - The element containing the currently selected month name as text.
 */
function updateCalendarForYear(yearText, selectedMonth) {
    const year = parseInt(yearText, 10);
    const month = monthNames[selectedMonth.textContent];

    generateCalendar(month, year);
}

/**
 * Closes the calendar popup when clicking outside of it.
 */
function closePopupOnClickOutside() {
    const calendarIcon = document.getElementById("calendarIcon");
    const calendarPopup = document.getElementById("calendarPopup");

    document.addEventListener("click", function (event) {
        if (!calendarPopup.contains(event.target) && event.target !== calendarIcon) {
            calendarPopup.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", initializeDatepicker);