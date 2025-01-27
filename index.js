document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const billInput = document.getElementById("amount");
    const customBtn = document.getElementById("customBtn");
    const customTipContainer = document.getElementById("customTipContainer");
    const numberOfPeopleInput = document.getElementById("numberOfPeople");
    const tipButtons = document.querySelectorAll(".btn:not(.custom-btn)"); // Typo fix: 'custon-btn' to 'custom-btn'
    const tipAmountElement = document.getElementById("tip-Amount");
    const totalElement = document.getElementById("total");
    const resetButton = document.getElementById("reset");

    let tipPercentage = 0; // Selected tip percentage

    // Helper function to calculate and update amounts
    const calculateTip = () => {
        const bill = parseFloat(billInput.value);
        const people = parseInt(numberOfPeopleInput.value);

        // Validate input
        if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
            tipAmountElement.textContent = "$0.00";
            totalElement.textContent = "$0.00";
            return;
        }

        // Calculate tip and total
        const tipAmount = (bill * tipPercentage) / 100;
        const total = bill + tipAmount;
        const tipPerPerson = tipAmount / people;
        const totalPerPerson = total / people;

        // Update UI
        tipAmountElement.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalElement.textContent = `$${totalPerPerson.toFixed(2)}`;
    };

    // Event listener for tip buttons (predefined buttons)
    tipButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            tipPercentage = parseInt(e.target.textContent);
            customBtn.innerHTML = `Custom (${tipPercentage}%)`;  // Update button text
            calculateTip();
        });
    });

    // Event listener for custom button
    customBtn.addEventListener("click", () => {
        customTipContainer.innerHTML = `
        <input type="number" id="customTipInput" class="form-control w-100 py-2 text-center" 
        placeholder="Enter custom %" min="1" max="100" />
        `;
        
        const customInput = document.getElementById("customTipInput");
        customInput.focus();

        customInput.addEventListener("blur", function () {
            const customValue = parseFloat(customInput.value);
            if (customValue && customValue > 0) {
                tipPercentage = customValue;
                customBtn.innerHTML = `${tipPercentage}%`;  // Update button text with entered custom value
                calculateTip();
            } else {
                tipPercentage = 0;
                customBtn.innerHTML = "Custom";  // Reset button text to "Custom" if no valid value
                calculateTip();
            }
            // Reset customTipContainer to show the custom button
            customTipContainer.innerHTML = `<button id="customBtn" class="btn w-100 py-2 text-center custom-btn">${tipPercentage ? `${tipPercentage}%` : "Custom"}</button>`; // Typo fix: 'custon-btn' to 'custom-btn'
        });
    });

    // Event listeners for inputs
    billInput.addEventListener("input", calculateTip);
    numberOfPeopleInput.addEventListener("input", calculateTip);

    // Reset button functionality
    resetButton.addEventListener("click", () => {
        billInput.value = "";
        numberOfPeopleInput.value = "";
        tipPercentage = 0;
        tipAmountElement.textContent = "$0.00";
        totalElement.textContent = "$0.00";
        customBtn.innerHTML = "Custom";  // Reset custom button text
    });
});
