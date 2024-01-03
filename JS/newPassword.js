var SignEmailInput = document.getElementById("emailInput");
var SignPasswordInput = document.getElementById("passwordInput");
var SignConfirmInput = document.getElementById("confirmpassword");
var SignCheckBox = document.getElementById("signupcheck");
var SignupButton = document.getElementById("Signup");
var LoginAgainButton = document.getElementById("LoginAgain");
             // Warning Paragraphs
var warningEmailParagraph = document.getElementById("validateEmailParagraph");
var warningPasswordParagraph = document.getElementById("validatePasswordParagraph");
var warningConfirmParagraph = document.getElementById("validateConfirmParagraph");     
             // Empty Array to push objects
var emailsArray = []     

// Select regex to validate email
var emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;  // Never start with space or @ --> Follow: text --> @ --> text --> .com

// Select regex to validate password
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;     //must contain at least one lowercase letter, one uppercase letter, one digit, and one special character from the provided set [@$!%*?&], and it must be at least 8 characters long.

// ******* Email Validation ******
function validateEmail(){
    var email = SignEmailInput.value;
    if(emailRegex.test(email) == true){
        SignEmailInput.classList.add("is-valid");
        SignEmailInput.classList.remove("is-invalid");
        warningEmailParagraph.classList.add("d-none");
        return true;
    }else{
        SignEmailInput.classList.remove("is-valid");
        SignEmailInput.classList.add("is-invalid");
        warningEmailParagraph.classList.remove("d-none");
        return false;
    }
}
// Apply input event on email input
SignEmailInput.addEventListener("input", validateEmail);

// ******* Password Validation ******
function validatePassword(){
    var password = SignPasswordInput.value;
    if(passwordRegex.test(password) == true){
        SignPasswordInput.classList.add("is-valid");
        SignPasswordInput.classList.remove("is-invalid");
        warningPasswordParagraph.classList.add("d-none");
        return true;
    }else{
        SignPasswordInput.classList.remove("is-valid");
        SignPasswordInput.classList.add("is-invalid");
        warningPasswordParagraph.classList.remove("d-none");
        return false;
    }
}
// Apply input event on password input
SignPasswordInput.addEventListener("input", validatePassword);

// ***** Confirm Validation ********
function validateConfirm(){
    if(SignPasswordInput.value == SignConfirmInput.value){
        SignConfirmInput.classList.add("is-valid");
        SignConfirmInput.classList.remove("is-invalid");
        warningConfirmParagraph.classList.add("d-none");
        return true;
    }else{
        SignConfirmInput.classList.remove("is-valid");
        SignConfirmInput.classList.add("is-invalid");
        warningConfirmParagraph.classList.remove("d-none");
        return false;
    }
}
// Apply input event on confirm password input
SignConfirmInput.addEventListener("input", validateConfirm);

// ***** Checkbox Validation ********
function validateCheckbox(){
    var ischecked ;
    if(SignCheckBox.checked == true){
        ischecked = true;
    }else{
        ischecked = false;
    }
    return ischecked;
}

// ***** All Inputs Validation ********
function validateAll(){
    if(validateEmail() == true && validatePassword() == true && validateConfirm() == true && validateCheckbox() == true){
        return true;
    }else{
        return false;
    }
}

// ********* Check if any input is empty *****
function isEmpty(){
    if(SignEmailInput.value == "" || SignPasswordInput.value == "" || SignConfirmInput.value == ""){
        Swal.fire({
            position: "center",
            icon: "error",
            title: "You must fill all inputs.",
            showConfirmButton: true,
            timer: 1500
        });
        return true
    }else{
        return false;
    }
}

// ********* Update Password ********** //
function updatePassword() {
    // Get the entered email and new password values
    var userEmail = document.getElementById("emailInput").value;
    var newPassword = document.getElementById("passwordInput").value;

    // Retrieve stored emails from local storage
    var storedEmails = JSON.parse(localStorage.getItem("Created_Emails"));

    // Check if the entered email exists in the stored emails
    var foundEmailIndex = storedEmails.findIndex(function (email) {
        return email.email.toLowerCase() === userEmail.toLowerCase();
    });

    if (foundEmailIndex !== -1) {
        // Replace the password for the found email
        storedEmails[foundEmailIndex].password = newPassword;

        // Update local storage with the modified emails
        localStorage.setItem("Created_Emails", JSON.stringify(storedEmails));

        // Display success message
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Password updated successfully.",
            showConfirmButton: true,
            timer: 1500
        });
        console.log("Password updated successfully.");
    } else {
        // Display error message if email is not found
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Email not found. Password not updated.",
            showConfirmButton: true,
            timer: 1500
        });
        console.log("Email not found. Password not updated.");
    }
}

// ********* Go to Login Again
function loginAgain(){
    window.location = "pages/login.html";
}

// ********* Signup after true validation *****
function signup(){
    if(validateAll() == true && isEmpty() == false){
        updatePassword();
        LoginAgainButton.classList.remove("d-none");
        LoginAgainButton.classList.add("d-block");
        loginAgain();
    }
    else{
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    }
}


// Apply event on sign up button
SignupButton.addEventListener("click", signup)