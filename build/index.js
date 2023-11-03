/**
 * The `transformString` function takes an input string and transforms it by removing accents,
 * converting to lowercase, replacing certain characters, and removing any non-alphanumeric characters.
 * @param input - The input parameter is a string that represents the text that needs to be
 * transformed.
 * @returns The function `transformString` returns a transformed version of the input string.
 */
const transformString = (input) => {
  let stringWithoutAccents = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let transformedText = stringWithoutAccents
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/\s*-\s*/g, "-") 
    .replace(/[\s_]+/g, "-")
    .replace(/[.,;:]/g, "")
    .replace(/[^a-zA-Z0-9-]/g, "");

  if (transformedText.endsWith("-")) {
    transformedText = transformedText.slice(0, -1);
  }

  return transformedText;
};

/**
 * The `createContent` function takes user input from an HTML input field, transforms the input using
 * the `transformString` function, and then displays the transformed text in an HTML element with the
 * id "output_text".
 */
const createContent = () => {
  let inputText = document.getElementById("input_text").value;
  let transformedText = transformString(inputText);
  document.getElementById("output_text").innerText = transformedText;
};

/**
 * The clearContent function clears the value of an input field and the inner text of an output field.
 */
const clearContent = () => {
  document.getElementById("input_text").value = "";
  document.getElementById("output_text").innerText = "";
};

/**
 * The function `copyContent` copies the text content of an HTML element with the id "output_text" to
 * the clipboard, and displays a success message in an HTML element with the id "disclaimer_toast".
 */
const copyContent = async () => {
  let text = document.getElementById("output_text").innerHTML;
  let disclaimer = document.getElementById("disclaimer_toast");
  if (text.length >= 1) {
    try {
      await navigator.clipboard.writeText(text);
      // Toastify({
      //   text: "Text copied to clipboard!",
      //   duration: 3000,
      // }).showToast();
    } catch (err) {
      throw err;
    }
  } else {
    // Toastify({
    //   text: "Oopsie! Type something!",
    //   duration: 3000,
    // }).showToast();
  }
};
