
import { isValidEmail, isValidPassword, displayError } from '../../utils/loginUtil.js';
 // Add event listener after the script is loaded
document.getElementById('login-form').addEventListener('submit', validateLogin);

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
