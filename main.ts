// This function is called when the page finishes loading
window.onload = (): void => {
    // Get a reference to the form element
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById('investmentForm');

    // Set up an event listener for when the form is submitted
    form.onsubmit = (event: Event): void => {
        // Prevent the form from being submitted in the traditional way (which would refresh the page)
        event.preventDefault();

        // Get the present value, interest rate, and number of years from the input fields.
        // Convert these values to numbers, and divide the interest rate by 100 to convert the percentage to a decimal
        const presentValue: number = parseFloat((<HTMLInputElement>document.getElementById('presentValue')).value);
        const interestRate: number = parseFloat((<HTMLInputElement>document.getElementById('interestRate')).value) / 100;
        const years: number = parseFloat((<HTMLInputElement>document.getElementById('years')).value);
        
        // Calculate the future value of the investment using the formula for compound interest
        const futureValue: number = presentValue * Math.pow((1 + interestRate), years);

        // Get a reference to the results section
        const resultsSection: HTMLElement = document.getElementById('results')!;

        // Create a new paragraph element for the result
        const resultItem: HTMLElement = document.createElement('p');

        // Set the text of the result item to the calculated future value, formatted as Indonesian Rupiah
        resultItem.textContent = "Future Value: IDR " + formatNumber(futureValue);

        // Add the "result-item" class to the result item
        resultItem.className = "result-item";

        // Append the result item to the results section
        resultsSection.appendChild(resultItem);
    }
}

// This function formats a number as a string with two decimal places and periods as thousand separators,
// following common formatting conventions in Indonesia
function formatNumber(num: number): string {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
