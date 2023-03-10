const initApp = () => {
  // Creates the "results window" variables.
  const currentValueElement = document.querySelector(".currentValue");
  const previousValueElement = document.querySelector(".previousValue");

  // -------------------------------------------------------------------
  // Listening for mouse number input.
  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.addEventListener("click", handleNumberClick);
  });

  // Listening for keyboard number input.
  document.addEventListener("keydown", (event) => {
    const keyValue = event.key;

    if (/\d/.test(keyValue)) {
      event.preventDefault();
      handleNumberClick({ target: { textContent: keyValue } });
    }
  });

  // Writes the user's (numbers) input into the "results window".
  function handleNumberClick(event) {
    /* event.target.textContent accesses the text content 
      of the html element that triggered the click event.*/
    const newValueInput = event.target.textContent;

    // Erases the default value (0) before displaying the user's input
    if (currentValueElement.value === "0") {
      currentValueElement.value = newValueInput;
    } else {
      currentValueElement.value += newValueInput;
    }
  }

  // -------------------------------------------------------------------
  // Listening for mouse click on "backspace".
  const backspaceButton = document.querySelector(".backspace");
  backspaceButton.addEventListener("click", clickBackspaceButton);

  // Listening for keyboard "backspace".
  document.addEventListener("keydown", (event) => {
    const keyValue = event.key;

    if (keyValue === "Backspace") {
      event.preventDefault();
      backspaceButton.click();
    }
  });

  // The "backspace button" removes the last character entry.
  function clickBackspaceButton() {
    // if there is only one character left, it resets to 0.
    if (currentValueElement.value.length === 1) {
      currentValueElement.value = "0";
      // else it removes the last character entry.
    } else if (currentValueElement.value === "You cannot divide by 0.") {
      currentValueElement.value = "0";
    } else {
      currentValueElement.value = currentValueElement.value.slice(0, -1);
    }
  }

  // -------------------------------------------------------------------
  //  Listening for mouse click on "CE".
  const clearEntryButton = document.querySelector(".clearEntry");
  clearEntryButton.addEventListener("click", clearEntry);

  // Listening for keyboard "delete" (CE).
  document.addEventListener("keydown", (event) => {
    const keyValue = event.key;

    if (keyValue === "Delete") {
      event.preventDefault();
      clearEntryButton.click();
    }
  });

  // The "CE" button resets the entry to 0.
  function clearEntry() {
    if (currentValueElement.value !== "0") {
      currentValueElement.value = "0";
    } else {
      currentValueElement.value = "0";
      previousValueElement.textContent = "";
    }
  }

  // -------------------------------------------------------------------
  // The "C" button resets everything to 0.
  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", () => {
    currentValueElement.value = "0";
    previousValueElement.textContent = "";
  });

  // The "signChange" Button turns + into - and vice-versa.
  const signChangeButton = document.querySelector(".signChange");
  signChangeButton.addEventListener("click", () => {
    currentValueElement.value = parseFloat(currentValueElement.value) * -1;
  });

  // -------------------------------------------------------------------
  // Listening for mouse operator input.
  const operatorButtons = document.querySelectorAll(".operator");
  operatorButtons.forEach((button) => {
    button.addEventListener("click", handleOperatorClick);
  });

  // Listening for keyboard operator input.
  document.addEventListener("keydown", (event) => {
    const keyValue = event.key;
    if (/[-+*/.]/.test(keyValue)) {
      event.preventDefault();
      handleOperatorClick({ target: { textContent: keyValue } });
    }
  });

  // Adds the symbols ("+", "-", "*", "/" and ".").
  // Also makes sure that a symbol cannot be preceded by another.
  function handleOperatorClick(event) {
    const newOperatorInput = event.target.textContent;
    const lastChar = currentValueElement.value.slice(-1);
    // if lastChar is a symbol, replaces it by newOperatorInput.
    if (/[+\-*/.]/.test(lastChar)) {
      currentValueElement.value = currentValueElement.value.slice(0, -1);
    }
    currentValueElement.value += newOperatorInput;
  }

  // -------------------------------------------------------------------
  // Listening for mouse click on "equals".
  const equalsButton = document.querySelector(".equals");
  equalsButton.addEventListener("click", calculateResult);

  // Listening for keyboard "Enter".
  document.addEventListener("keydown", (event) => {
    const keyValue = event.key;

    if (keyValue === "Enter") {
      event.preventDefault();
      equalsButton.click();
    }
  });

  // The equals button calculates and displays the result.
  function calculateResult() {
    let expression = currentValueElement.value;

    // If lastChar is a symbol, removes it before calculations.
    const lastChar = expression.slice(-1);
    if (/[+\-*/.]/.test(lastChar)) {
      expression = expression.slice(0, -1);
      currentValueElement.value = expression;
    }

    // Checks for division by zero.
    if (expression.includes("/0") || expression.includes("0/")) {
      currentValueElement.value = "You cannot divide by 0.";
      previousValueElement.textContent = "";
      return;
    }

    // Using the math.js library :
    const result = math.evaluate(expression); // math.evaluate() is from the js library math.js
    const formattedResult = parseFloat(result.toFixed(2)); // allows maximum 2 decimal places.
    previousValueElement.textContent = formattedResult + " =";
    currentValueElement.value = formattedResult;
  }
};

// Makes sure the page is fully loaded.
document.addEventListener("DOMContentLoaded", initApp);

// Next Improvements : replace visual "/", "*", "." with font awesome icons to display them in currentValueElement.
