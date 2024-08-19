// SHOW HIDDEN - PASSWORD
const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye)

    iconEye.addEventListener('click', () => {
        // Change password to text
        if (input.type === 'password') {
            //Switch to text
            input.type = 'text'

            // Change icon
            iconEye.classList.add('ri-eye-line')
            iconEye.classList.remove('ri-eye-off-line')
        } else {
            //Change to password
            input.type = 'password'

            // Change icon
            iconEye.classList.remove('ri-eye-line')
            iconEye.classList.add('ri-eye-off-line')
        }
    })
}

showHiddenPass('login-pass', 'login-eye')
showHiddenPass('register-pass', 'register-eye')

// BASCULER ENTRE LES FORMULAIRES DE CONNEXION ET D’INSCRIPTION
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterForm = document.getElementById('showRegisterForm');
const showLoginForm = document.getElementById('showLoginForm');

loginToggle.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

registerToggle.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

showRegisterForm.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

showLoginForm.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

// CODE SUPPLÉMENTAIRE POUR BASCULER LES FORMULAIRES À L’AIDE D’UN BOUTON
document.getElementById('toggleFormButton').addEventListener('click', function () {
    if (loginForm.style.display === 'none' && registerForm.style.display === 'none') {
        loginForm.style.display = 'block';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
    }
});