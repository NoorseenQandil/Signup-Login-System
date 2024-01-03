// ***************************** Login Form --- Variables ******************************** //
var LoginEmailInput = document.getElementById("loginEmail");
var LoginPasswordInput = document.getElementById("loginPassword");
var LoginButton = document.getElementById("loginBtn");
                               // Warning Paragraphs
var warningEmailLogin = document.getElementById("EmailWarning");
var warningPasswordLogin = document.getElementById("PasswordWarning");    


// Select regex to validate email
var emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;  // Never start with space or @ --> Follow: text --> @ --> text --> .com


// Select regex to validate password
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;     //must contain at least one lowercase letter, one uppercase letter, one digit, and one special character from the provided set [@$!%*?&], and it must be at least 8 characters long.

// ************ Login Email Validation ************ //
function validateEmailLogin(){
    var interedEmail = LoginEmailInput.value;
    if(emailRegex.test(interedEmail) == true){
        LoginEmailInput.classList.add("is-valid");
        LoginEmailInput.classList.remove("is-invalid");
        warningEmailLogin.classList.add("d-none");
        return true;
    }else{
        LoginEmailInput.classList.remove("is-valid");
        LoginEmailInput.classList.add("is-invalid");
        warningEmailLogin.classList.remove("d-none");
        return false;
    }
}
// Apply input event on email input
LoginEmailInput.addEventListener("input", validateEmailLogin);

// ************ Login Password Validation ************ //
function validatePasswordLogin(){
    var interedPassword = LoginPasswordInput.value;
    if(passwordRegex.test(interedPassword) == true){
        LoginPasswordInput.classList.add("is-valid");
        LoginPasswordInput.classList.remove("is-invalid");
        warningPasswordLogin.classList.add("d-none");
        return true;
    }else{
        LoginPasswordInput.classList.remove("is-valid");
        LoginPasswordInput.classList.add("is-invalid");
        warningPasswordLogin.classList.remove("d-none");
        return false;
    }
}
// Apply input event on email input
LoginPasswordInput.addEventListener("input", validatePasswordLogin);


// *********** Clear all inputs in login ******** //
function clearLoginInputs(){
    // Make all inputs empty
    LoginEmailInput.value = "";
    LoginPasswordInput.value = "";
    // Remove all validation sign and checked from all inputs
    LoginEmailInput.classList.remove("is-valid");
    LoginPasswordInput.classList.remove("is-valid");
}

// ******** Check if email or password input is empty ************ //
// function isLoginEmpty() {
//     if (LoginEmailInput.value == "" || LoginPasswordInput.value == "") {
//       return false;
//     } else {
//       return true;
//     }
//   }


// // ************ Function For Login 
// function LoginIsExist() {
//     if(isLoginEmpty() == false){
//         Swal.fire({
//             position: "center",
//             icon: "error",
//             title: "Enter email and password.",
//             showConfirmButton: true,
//             timer: 1500
//         });
//         clearLoginInputs();
//     }
//     else if(validateEmailLogin() == false || validatePasswordLogin() == false){
//         Swal.fire({
//             position: "center",
//             icon: "error",
//             title: "Check validation.",
//             showConfirmButton: true,
//             timer: 1500
//         });
//         clearLoginInputs();
//     }
//     else{
//         var userEmail = LoginEmailInput.value;
//         var userPassword = LoginPasswordInput.value;
//         for (var i = 0; i < emailsArray.length; i++) {
//             if (
//             emailsArray[i].email.toLowerCase() == userEmail.toLowerCase() &&
//             emailsArray[i].password == userPassword
//             ) {
//             localStorage.setItem("sessionUserName", emailsArray[i].name);
//             Swal.fire({
//                 position: "center",
//                 icon: "success",
//                 title: "Loged in successfully.",
//                 showConfirmButton: true,
//                 timer: 1500
//             });
//             clearLoginInputs()
//             window.location = "../home.html";
//             } else {
//                 Swal.fire({
//                     position: "center",
//                     icon: "error",
//                     title: "Not found !!!",
//                     showConfirmButton: true,
//                     timer: 1500
//                 });
//             }
//             clearLoginInputs();
//         }
//     }
// }
// // Apply an event on Login Button
// LoginButton.addEventListener("click", LoginIsExist)

// // ********** Say Welcome when open home page ************ //
// function sayWelcome(){
//     var userNameHome = localStorage.getItem("sessionUserName");
//     var welcome = document.getElementById("userName");
//     // console.log(userNameHome);
//     if (userNameHome) {
//     welcome.innerHTML = `${userNameHome}`;
//     }
// }

// // ***************** Logout ************************* //
// function logout(){
//     localStorage.removeItem("sessionUserName");
//     window.location = "../index.html";
// }


function isLoginEmpty() {
    return LoginEmailInput.value === "" || LoginPasswordInput.value === "";
  }
  
  function LoginIsExist() {
    if (isLoginEmpty()) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Enter email and password.",
        showConfirmButton: true,
        timer: 1500,
      });
      clearLoginInputs();
      return;
    } else if (!validateEmailLogin() || !validatePasswordLogin()) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Check validation.",
        showConfirmButton: true,
        timer: 1500,
      });
      clearLoginInputs();
      return;
    }
  
    var userEmail = LoginEmailInput.value;
    var userPassword = LoginPasswordInput.value;
    var userFound = false;
  
    for (var i = 0; i < emailsArray.length; i++) {
      if (
        emailsArray[i].email.toLowerCase() === userEmail.toLowerCase() &&
        emailsArray[i].password === userPassword
      ) {
        localStorage.setItem("sessionUserName", emailsArray[i].name);
        userFound = true;
        break;
      }
    }
  
    if (userFound) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged in successfully.",
        showConfirmButton: true,
        timer: 1500,
      }).then((result) => {
        if (result.isConfirmed) {
          clearLoginInputs();
          window.location = "pages/WelcomePage.html";
        }
      });
    }  else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Not found!",
        showConfirmButton: true,
        timer: 1500,
      });
      clearLoginInputs();
    }
  }
  
  // Apply an event on Login Button
  LoginButton.addEventListener("click", LoginIsExist);
  
  // ********** Say Welcome when open home page ************ //
  function sayWelcome() {
    var userNameHome = localStorage.getItem("sessionUserName");
    var welcome = document.getElementById("userName");
    if (userNameHome) {
      welcome.innerHTML = `${userNameHome}`;
    }
  }
  
  // Trigger sayWelcome on page load
  sayWelcome();