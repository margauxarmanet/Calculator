const initApp = () => {
  // Creates the "results window" variables.
  const currentValueElement = document.querySelector(".currentValue");
  const previousValueElement = document.querySelector(".previousValue");

  // Writes the user's (numbers) input into the "results window".
  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      /* event.target.textContent accesses the text content 
      of the html element that triggered the click event.*/
      const newValueInput = event.target.textContent;

      // Erases the default value (0) before displaying the user's input
      if (currentValueElement.value === "0") {
        currentValueElement.value = newValueInput;
      } else {
        currentValueElement.value += newValueInput;
      }
    });
  });

  // The "delete button" removes the last character entry.
  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    // if there is only one character left, it resets to 0.
    if (currentValueElement.value.length === 1) {
      currentValueElement.value = "0";
      // else it removes the last character entry.
    } else {
      currentValueElement.value = currentValueElement.value.slice(0, -1);
    }
  });

  // The "CE" button resets the entry to 0.
  const clearEntryButton = document.querySelector(".clearEntry");
  clearEntryButton.addEventListener("click", () => {
    currentValueElement.value = "0";
  });

  // The "C" button resets everything to 0.
  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", () => {
    currentValueElement.value = "0";
    previousValueElement.textContent = "";
  });

  // The "signChange" Button turns + into - and vice-versa.
  const signChangeButton = document.querySelector(".signChange");
  signChangeButton.addEventListener("click", () => {
    currentValueElement.value = parseFloat(currentValueElement.value) * -1; // parseFloat() turns the string into a number.
  });
};

// Makes sure the page is fully loaded.
document.addEventListener("DOMContentLoaded", initApp);
