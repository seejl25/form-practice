const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector('#email + span.error');
const postalCode = document.querySelector('#postal-code');
const postalError = document.querySelector('#postal-code + span.error');

email.addEventListener("input", ()=> {
    if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
    } else {
        showError();
    }
})

function showError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "This field cannot be left empty";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Please enter a valid email address";
    }
    emailError.className = "error active"
}



function checkPostalCode() {
    // For each country, defines the pattern that the postal code has to follow
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };
  
    // Read the country id
    const country = document.getElementById("country").value;
  
  
    // Build the constraint checker
    const constraint = new RegExp(constraints[country][0], "");
  
    // Check it!
    if (constraint.test(postalCode.value)) {
      // The postal code follows the constraint, we use the ConstraintAPI to tell it
      postalCode.setCustomValidity("");
    } else {
      // The postal code doesn't follow the constraint, we use the ConstraintAPI to
      // give a message about the format required for this country
      postalCode.setCustomValidity(constraints[country][1]);
    }
  }

window.onload = () => {
    document.getElementById("country").onchange = checkPostalCod();
    document.getElementById("postal-code").oninput = checkPostalCode();
};
  