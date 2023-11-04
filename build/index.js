/* These lines of code are selecting the HTML elements with the IDs "input_text" and "output_text" and
assigning them to the variables `inputText` and `outputText`, respectively. */
const inputText = document.getElementById("input_text");
const outputText = document.getElementById("output_text");

/**
 * The function updates the state of three buttons based on the length of input and output text.
 */
const updateButtonState = () => {
  const button1 = document.getElementById("create_button");
  const button2 = document.getElementById("clear_button");
  const button3 = document.getElementById("copy_button");
  const isEmptyInput = inputText.value.length === 0;
  const isEmptyOutput = outputText.innerText.length === 0;
  button1.disabled = isEmptyInput;
  button2.disabled = isEmptyInput;
  button3.disabled = isEmptyOutput;
};

/* Adds an event listener to the `inputText` element. The event being listened for is the "input" event, which is triggered whenever
the content of the input element changes. When the "input" event is triggered, the
`updateButtonState` function is called. This function updates the state of three buttons based on
the length of the input and output text. */
inputText.addEventListener("input", updateButtonState);

/**
 * The function `transformString` takes an input string and transforms it by removing diacritical
 * marks, converting to lowercase, replacing special characters, and formatting spaces and hyphens.
 * @param input - The input parameter is a string that you want to transform.
 * @returns The function `transformString` returns a transformed version of the input string.
 */
const transformString = (input) => {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/\s*-\s*/g, "-")
    .replace(/[\s.,;:_]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * The function `createContent` takes the value of an input text field, transforms the text using a
 * helper function called `transformString`, and then updates the content of two HTML elements with the
 * transformed text.
 */
const createContent = () => {
  let transformedText = transformString(inputText.value);
  document.getElementById("output_text").innerText = transformedText;
  outputText.innerText = transformedText;
  updateButtonState();
};

/**
 * The clearContent function clears the value of an input text field and the inner text of an output
 * text field, and updates the state of a button.
 */
const clearContent = () => {
  document.getElementById("input_text").value = "";
  document.getElementById("output_text").innerText = "";
  updateButtonState();
};

const copyContent = async () => {
  let text = document.getElementById("output_text").innerHTML;
  let disclaimer = document.getElementById("disclaimer_toast");
  if (text.length >= 1) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      throw err;
    }
  } else {
    console.log("Error.");
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  updateButtonState();
});
