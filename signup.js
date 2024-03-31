
//to go back to the previous page
function goBack() {
    window.history.back();
}

//Hide and Show password : Eye button
function hideAndShowPassword(ElementId) {
    const element = document.querySelector('#' + ElementId);
    const type = element.getAttribute('type');
    type === 'password' ? element.setAttribute('type', 'text') : element.setAttribute('type', 'password');
}

//check if password == confirm password
function passwordValidity(event, password1, password2) {
    const pass1 = document.querySelector('#' + password1);
    const pass2 = document.querySelector('#' + password2);
    if (pass1.value != pass2.value) {
        event.preventDefault();
        document.getElementById('error-message').textContent = "Passwords do not match";
        document.getElementById('error-message').style.color = 'red';
        pass1.value = "";
        pass2.value = "";
        setTimeout(() => {
            document.getElementById('error-message').textContent = "";
        }, 2000);
    }
}

//toogle password
const eyeIcon1 = document.querySelector('#toogle-password');
eyeIcon1.addEventListener('click', function () {
    hideAndShowPassword('password');
    this.style.borderColor = this.style.borderColor !== 'transparent' ? 'transparent' : 'white';
});

//toogle confirm password
const eyeIcon2 = document.querySelector('#toogle-confirm-password');
eyeIcon2.addEventListener('click', function () {
    hideAndShowPassword('confirm-password');
    this.style.borderColor = this.style.borderColor !== 'transparent' ? 'transparent' : 'white';
});

//check password validity on submission
const submit = document.querySelector('#submit');
submit.addEventListener('click', function (event) {
    passwordValidity(event, 'password', 'confirm-password');
});
