
let errorDisplayed = false; // Variable to track if error is already displayed


function displaySignUp(){
    var loginWrapper = document.getElementById("loginWrapper");
    var signUpWrapper = document.getElementById("signUpWrapper");
    if (loginWrapper) {
            loginWrapper.style.display = "none";
            signUpWrapper.style.display = "block";
    }
}

// handle login form submit event 
function validateLogin(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get email and password input elements id and values:
   var emailInput  = document.getElementById("email-field");
   var emailValue = emailInput.value;
   var passwordInput  = document.getElementById("password-field");
   var passwordValue = passwordInput.value;
    // Check if email or password is empty (let the form handle it).
    if (!emailValue || !passwordValue) return; 
    // Perform validation if email and password are according to the rules.
    if (!isValidEmail(emailValue)) { 
        displayError('Invalid email address', emailInput);
        return;
    }
    if (!isValidPassword(passwordInput.value)) { 
        displayError('Invalid password.', passwordInput);
        return;
    }
    // If validation passes, show user input in alert
    // TODO: send values to backend
    alert('Login successful!\nEmail: ' + emailValue + '\nPassword: ' + passwordValue);   
}
// handle sign in form submit event 
function validateSignin(event){
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get email and password input elements and values:
    var nameInput = document.querySelector('input[name="name"]');
    var nameValue = nameInput.value;
    var emailInput = document.querySelector('input[name="email"]');
    var emailValue = emailInput.value;
    var passwordInput = document.querySelector('input[name="password"]');
    var passwordValue = passwordInput.value;
    var confirmPassInput = document.querySelector('input[name="confirmPass"]');
    var confirmPassValue = confirmPassInput.value;
    // Check if email or password is empty (let the form handle it).
    if (!nameValue || !emailValue || !passwordValue || !confirmPassValue) return; 
    // Perform validation if email and password are according to the rules.
     if (!isValidEmail(emailValue)) { 
        displayError('Invalid email address', emailInput);
        return;
    }
    if (!isValidPassword(passwordValue)) { 
        displayError('Invalid password.', passwordInput);
        return;
    }
    if (!IsPasswordsMatch(passwordValue,confirmPassValue)) { 
        displayError('Passwords do not match.', confirmPassInput);
        return;
    }
    // If validation passes, show user iput in alert
    //TODO: send values to backend.
    alert('Sign in successful!\nFull Name: '+ nameValue + '\nEmail: ' + emailValue + '\nPassword: ' + passwordValue);
}
// Display error message to user
function displayError(message, inputElement) {
    if (!errorDisplayed) {
        var errorContainer = document.createElement('div');
        errorContainer.classList.add('error-messages');
        errorContainer.textContent = message;
        errorContainer.style.color = 'red';
        errorDisplayed = true;
        var parentContainer = inputElement.parentElement;
        parentContainer.appendChild(errorContainer);

        // Automatically remove the error message after 6 seconds
        setTimeout(() => {
            errorContainer.remove();
            errorDisplayed = false; // Reset errorDisplayed flag
        }, 6000);
    }
}
// email validation rules
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Password validation rules
function isValidPassword(password) {  
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
}
// confirmed Password match rule
function IsPasswordsMatch(password, confirmPassword){
        return password == confirmPassword; 
}





