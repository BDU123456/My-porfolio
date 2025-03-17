function Validate() {
  var nameField = document.getElementById("name");
  var name = nameField.value;
  if (name === "") {
    alert("Name is required.");
  }
  if(!/^[a-zA-Z ]+$/.test(name)){
    alert("Your name should contain only alphabet letters!");
  }
  var genderMaleField = document.getElementById("male");
  var genderFemaleField = document.getElementById("female");
  var genderMale = genderMaleField.checked;
  var genderFemale = genderFemaleField.checked;
  if (!genderMale && !genderFemale) {
    alert("Gender is required.");
  }

  var birthdateField = document.getElementById("birthdate");
  var birthdate = birthdateField.value;
  if (!birthdate) {
    alert("Birthdate is required.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
    alert("Invalid date format. Please use YYYY-MM-DD.");
  }
  var birthdateDate = new Date(birthdate);
  if (birthdateDate > new Date()) {
    alert("Birthdate should not have been in the future.");
  }

  var phoneNoField = document.getElementById("phone_no");
  var phone_no = phoneNoField.value;
  var phonePattern = /^\+2519\d{8}$/;
  if (!phone_no) {
    alert("Phone number is required.");
  }
  if (!phonePattern.test(phone_no)) {
    alert("Please enter a valid Ethiopian phone number.");
  }

  var emailField = document.getElementById("email");
  var email = emailField.value;
  var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email) {
    alert("Email is required.");
  }
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
  }

  var passwordField = document.getElementById("pwd");
  var password = passwordField.value;
  if (password === "") {
    alert("Password is required.");
  }
  alert("Welcome, You have approved successfully!");
}
