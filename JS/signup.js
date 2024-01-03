// ***************************** Signup Form --- Variables ******************************** //
             // Inputs & Button
             var SignNameInput = document.getElementById("nameInput");
             var SignEmailInput = document.getElementById("emailInput");
             var SignPasswordInput = document.getElementById("passwordInput");
             var SignConfirmInput = document.getElementById("confirmpassword");
             var SignCheckBox = document.getElementById("signupcheck");
             var SignupButton = document.getElementById("Signup");
                          // Warning Paragraphs
             var warningNameParagraph = document.getElementById("validateNameParagraph");
             var warningEmailParagraph = document.getElementById("validateEmailParagraph");
             var warningPasswordParagraph = document.getElementById("validatePasswordParagraph");
             var warningConfirmParagraph = document.getElementById("validateConfirmParagraph");     
                          // Empty Array to push objects
             var emailsArray = []             
             // ***** Name Validation ********
             
             // Select regex to validate name
             var nameRegex = /^[a-zA-Z]{3,10}(?=\s[a-zA-Z]{3,10}$)/;    // 1st name starts with capital or small char(3 > char > 10) then space then add 2nd name starts with capital or small char(3 > char > 10)
             
             function validateName(){
                 var text = SignNameInput.value;
                 if(nameRegex.test(text) == true){
                     SignNameInput.classList.add("is-valid");
                     SignNameInput.classList.remove("is-invalid");
                     warningNameParagraph.classList.add("d-none");
                     return true;
                 }else{
                     SignNameInput.classList.remove("is-valid");
                     SignNameInput.classList.add("is-invalid");
                     warningNameParagraph.classList.remove("d-none");
                     return false;
                 }
             }
             // Apply input event on name input
             SignNameInput.addEventListener("input", validateName);
             
             // ***** Email Validation ********
             
             // Select regex to validate email
             var emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;  // Never start with space or @ --> Follow: text --> @ --> text --> .com
             
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
             
             // ***** Password Validation ********
             // Select regex to validate password
             var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;     //must contain at least one lowercase letter, one uppercase letter, one digit, and one special character from the provided set [@$!%*?&], and it must be at least 8 characters long.
             
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
                 if(validateName() == true && validateEmail() == true && validatePassword() == true && validateConfirm() == true && validateCheckbox() == true){
                     console.log("True Validation For All Inputs");
                     return true;
                 }else{
                     console.log("Error XXXXXXXXXXXXX");
                     return false;
                 }
             }
             // ***** Check if Inputs are empty ********
             function signIsEmpty(){
                 if(SignNameInput.value == "" || SignEmailInput.value == "" || SignPasswordInput.value == "" || SignConfirmInput.value == ""){
                     console.log("You must fill all inputs");
                     return true;
                 }else{
                     console.log("All imputs include data");
                     return false;
                 }
             }
             
             // ***** Clear all signup inputs
             function clearSignForm(){
                 // Make all inputs empty
                 SignNameInput.value="";
                 SignEmailInput.value="";
                 SignPasswordInput.value="";
                 SignConfirmInput.value="";
                 // Remove all validation sign and checked from all inputs
                 SignNameInput.classList.remove("is-valid");
                 SignEmailInput.classList.remove("is-valid");
                 SignPasswordInput.classList.remove("is-valid");
                 SignConfirmInput.classList.remove("is-valid");
                 SignCheckBox.checked = false;
             }
             
             // ******* check if local storage is empty or not
             if (localStorage.getItem("Created_Emails") != null){
                 emailsArray = JSON.parse(localStorage.getItem("Created_Emails"))
             }else{
                 emailsArray = [] 
             }
             
             // ******* check if the inserted email is saved in local storage 
             function signIsExist(){
                 var isExist;
                 for(var i = 0; i < emailsArray.length; i++ ){
                     if(emailsArray[i].email.toLowerCase() == SignEmailInput.value.toLowerCase()){
                         console.log("Refused.. This account is already exist");
                         Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "This account is already exist. Use another one",
                            showConfirmButton: true,
                            timer: 1500
                        });
                         isExist = true;
                     }else{
                         console.log("Accepted.. This account is new");
                         isExist = false;
                     }
                 }
                 return isExist;
             }
             
             // ***** Sign UP Process********************
             function signup() {
                 if (signIsEmpty()) {
                     // Handle empty inputs
                     Swal.fire({
                         position: "center",
                         icon: "error",
                         title: "You must fill all inputs",
                         showConfirmButton: true,
                         timer: 1500
                     });
                 } else if (signIsExist()) {
                     // Handle existing account
                     Swal.fire({
                         position: "center",
                         icon: "error",
                         title: "This account is already exist. Use another one",
                         showConfirmButton: true,
                         timer: 1500
                     });
                 } else if (!validateAll()) {
                     // Handle validation failure
                     Swal.fire({
                         position: "center",
                         icon: "error",
                         title: "Follow validation instructions",
                         showConfirmButton: true,
                         timer: 1500
                     });
                 } else {
                     // If all conditions pass, proceed with account creation
                     var emailObject = {
                         name: nameInput.value,
                         email: emailInput.value,
                         password: passwordInput.value
                     };
                     emailsArray.push(emailObject);
                     localStorage.setItem('Created_Emails', JSON.stringify(emailsArray));
             
                     Swal.fire({
                         position: "center",
                         icon: "success",
                         title: "Your account has been created.",
                         showConfirmButton: true,
                         timer: 1500
                     });
                 }
             
                 // Clear all inputs in any case
                 clearSignForm();
             }
             
             // Apply event on sign up button
             SignupButton.addEventListener("click", signup);