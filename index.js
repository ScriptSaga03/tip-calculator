document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('amount');
    const customBtn = document.getElementById("customBtn");
    const customTipContainer = document.getElementById("customTipContainer");
    const numberOfPeopleInput = document.getElementById("numberOfPeople");
    const tipButtons = document.querySelectorAll(".btn:not(.custon-btn)");
    const tipAmountElement = document.getElementById("tip-Amount");
    const totalElement = document.getElementById("total");
    const resetButton = document.getElementById("reset");

    let currentCustomValue = null; // Track custom value

    // Custom Button
    customBtn.addEventListener('click', () => {
        // Show input field if custom value is not set yet
        if (!currentCustomValue) {
            customTipContainer.innerHTML = `
            <input
                type="number"
                id="customTipInput"
                placeholder="Enter custom %"
                class="form-control w-100 py-2 text-center"
                min="1"
                max="100"
                value=""
            />`;
            const customInput = document.getElementById('customTipInput');
            customInput.focus();

            // When user blurs the input field (clicks outside or moves focus)
            customInput.addEventListener('blur', () => {
                const customValue = parseFloat(customInput.value);
                if (customValue && customValue > 0) {
                    currentCustomValue = customValue; // Set the custom value
                    customTipContainer.innerHTML = `<button class="btn w-100 py-2 text-center custon-btn">${customValue}%</button>`;
                } else {
                    customTipContainer.innerHTML = `<button id="customBtn" class="btn w-100 py-2 text-center custon-btn">Custom</button>`;
                }
            });
        } else {
            // If custom value already exists, allow editing it
            customTipContainer.innerHTML = `
            <input
                type="number"
                id="customTipInput"
                placeholder="Enter custom %"
                class="form-control w-100 py-2 text-center"
                min="1"
                max="100"
                value="${currentCustomValue}"
            />`;
            const customInput = document.getElementById('customTipInput');
            customInput.focus();

            // When user blurs the input field (clicks outside or moves focus)
            customInput.addEventListener('blur', () => {
                const customValue = parseFloat(customInput.value);
                if (customValue && customValue > 0) {
                    currentCustomValue = customValue; // Update custom value
                    customTipContainer.innerHTML = `<button class="btn w-100 py-2 text-center custon-btn">${customValue}%</button>`;
                } else {
                    customTipContainer.innerHTML = `<button id="customBtn" class="btn w-100 py-2 text-center custon-btn">Custom</button>`;
                }
            });
        }
    });

    // Helper function to calculate and update amounts
    const calculateTip = () => {
        const bill = parseFloat(billInput.value);
        const people = parseInt(numberOfPeopleInput.value);

        if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
            tipAmountElement.textContent = "$0.00";
            totalElement.textContent = "$0.00";
            return;
        }

        // Calculate tip and total
        const tipAmount = (bill * (currentCustomValue || 0)) / 100;
        const total = bill + tipAmount;
        const tipPerPerson = tipAmount / people;
        const totalPerPerson = total / people;

        // Update UI
        tipAmountElement.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalElement.textContent = `$${totalPerPerson.toFixed(2)}`;
    };

    // Event listeners for bill and people inputs
    billInput.addEventListener("input", calculateTip);
    numberOfPeopleInput.addEventListener("input", calculateTip);

    // Reset button functionality
    resetButton.addEventListener("click", () => {
        billInput.value = "";
        numberOfPeopleInput.value = "";
        currentCustomValue = null; // Reset custom value
        tipAmountElement.textContent = "$0.00";
        totalElement.textContent = "$0.00";
        customTipContainer.innerHTML = `<button id="customBtn" class="btn w-100 py-2 text-center custon-btn">Custom</button>`;
    });
});
