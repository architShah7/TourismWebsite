let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let description = document.getElementById("description");

let fNameMsg = document.getElementById("firstNameHelp");
let lNameMsg = document.getElementById("lastNameHelp");
let emailMsg = document.getElementById("emailHelp");
let descMsg = document.getElementById("descriptionHelp");

document.getElementById("submit").onclick = () => {
  //Validate first name entry is filled in
  if (!validateFilled(firstName, fNameMsg, "Missing First Name!")) {
    return;
  }
  //Validate first name only contains alphabets as characters
  if (
    !validateValue(firstName, fNameMsg, /^[a-zA-Z ]+$/, "Invalid First Name")
  ) {
    return;
  }
  fNameMsg.innerHTML = "";
  //validate last name entry is filled in
  if (!validateFilled(lastName, lNameMsg, "Missing Last Name!")) {
    return;
  }
  //validate last name contains alphabets as characters
  if (!validateValue(lastName, lNameMsg, /^[a-zA-Z ]+$/, "Invalid Last Name")) {
    return;
  }
  lNameMsg.innerHTML = "";

  //Validate the email field is filled in
  if (!validateFilled(email, emailMsg, "Missing Email Address!")) {
    return;
  }

  //https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
  //validate the provide email address is valid
  if (
    !validateValue(
      email,
      emailMsg,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid Email Address"
    )
  ) {
    return;
  }
  emailMsg.innerHTML = "";
  //validate the textbox contains a description
  if (
    !validateFilled(
      description,
      descMsg,
      "Please provide a brief description of the suggestion or issue!"
    )
  ) {
    return;
  }

  descMsg.innerHTML = "";

  //clear the input fields when submitted
  var inputfields = [firstName, lastName, email, description];
  inputfields.map((inElem) => {
    inElem.value = "";
  });

  //display a notification upon submit
  $.notify(
    "Thank you for the suggestions. We will review it shortly and may include it on our website.",
    { globalPosition: "top left", className: "success" }
  );
};

//Function used to check whether an input field has been populated or not
validateFilled = (element, msg, msgStr) => {
  if (element.value == "") {
    msg.innerHTML = msgStr;
    msg.style = "color:red";
    element.focus();
    return false;
  }
  return true;
};

//Function used to validate the value of an input field using regular expressions
validateValue = (element, msg, regexp, msgStr) => {
  if (!regexp.test(element.value)) {
    msg.innerHTML = msgStr;
    msg.style = "color:red";
    element.focus();
    return false;
  }
  return true;
};
