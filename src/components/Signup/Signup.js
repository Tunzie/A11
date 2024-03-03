
import { isValidEmail, isValidPassword, displayError } from '../../utils/loginUtil.js';

document.getElementById('signup-form').addEventListener('submit', validateSignup);

// handle sign in form submit event 
function validateSignup(event){
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

// confirmed Password match rule
function IsPasswordsMatch(password, confirmPassword){
    return password == confirmPassword; 
}
