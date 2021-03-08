const login = '<h1>Login</h1><input type="email" class="form-control" id="log-email" aria-describedby="emailHelp" placeholder="Enter email"><input type="password" class="form-control" id="log-password" placeholder="Password"><button type="button" class="btn btn-primary" id="login">Log In</button><button type="button" class="btn btn-info" id="regist">Registration</button>';

const register = '<h1>Registration</h1><input type="text" class="form-control" id="first-name" placeholder="First Name"><input type="text" class="form-control" id="last-name" placeholder="Last Name"><input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"><input type="password" class="form-control" id="password" placeholder="Password: min 6 symbols"><input type="password" class="form-control" id="check-password" placeholder="Check Password"><button type="button" class="btn btn-primary" id="accept">Accept</button>';

const loginRegCnt = document.getElementById('log-reg-cnt')
loginRegCnt.innerHTML = login

// registration functions
document.getElementById('regist').onclick = function() {
    loginRegCnt.innerHTML = register;

    const acceptBtn = document.getElementById('accept');
    const user = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined
    };

    acceptBtn.onclick = function () {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const checkPassword = document.getElementById('check-password').value;

        if (firstName === '' || lastName === '' || email === '' || password === '' || checkPassword === '') {
            err(true, 'empty');
        } else if (password !== checkPassword || password.length < 5) {
            err(true, 'password');
        } else {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;

            const checkUser = JSON.parse(localStorage.getItem(email))
            if (checkUser == null) {
                const stringUser = JSON.stringify(user);
                localStorage.setItem(user.email, stringUser);
                err(false);
                location.reload();
            } else {
                err(true, 'email')
            }
        }
    };
};

// login functions
document.getElementById('login').onclick = function () {
    const logEmail = document.getElementById('log-email').value;
    const logPass = document.getElementById('log-password').value;

    if (logEmail === '' || logPass === '') {
        err(true, 'empty');
    } else if (logPass.length < 5) {
        err(true, 'password');
    } else {
        const loginUser = JSON.parse(localStorage.getItem(logEmail));
        if (loginUser == null || loginUser.password !== logPass) {
            err(true, 'incorect')
        } else {
            loginRegCnt.innerHTML = '<h1>Hi ' + loginUser.firstName + ' ' + loginUser.lastName;
        }
    }
}

// errors
function err(error, val = '') {
    if (error && val === 'empty') {
        alert('You have appty types!!!');
    } else if (error && val === 'password') {
        alert('Password is Incorect!!!')
    } else if (error && val === 'incorect') {
        alert('Password or Email is Incorect!!!')
    } else if (error && val === 'email') {
        alert('This Email already registered!!!')
    } else {
        alert('Succesfuly registered :)');
    };
};
