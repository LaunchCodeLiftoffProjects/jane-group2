import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('box-project-user')));

export const authService = {
    register,
    login,
    logout,
    header,
    evaluate,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

function register(email, username, password, verifyPassword) {
    return fetch("api/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            verifyPassword: verifyPassword,
        })
    })
        .then(evaluate)
        .then(success => {
            return success;
        });
}

function login(username, password) {
    return fetch("api/auth", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(evaluate)
        .then(success => {
            localStorage.setItem('box-project-user', JSON.stringify(success.user));
            currentUserSubject.next(success.user);

            return success;
        });
}

function logout() {
    console.log('logout()');
    localStorage.removeItem('box-project-user');
    currentUserSubject.next(null);
}

function header() {
    const currentUser = currentUserSubject.value;
    if (currentUser && currentUser.token) {
        return `Bearer ${currentUser.token}`;
    }
    return '';
}

function evaluate(response) {
    return response.text().then(text => {
        const json = text && JSON.parse(text);

        if (response.ok) {
            return json;
        }

        if ([401, 403].indexOf(response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            authService.logout();
            // TODO: redirect home, current issue is we are not a component so we can't do a useLocation?
            console.log("not authorized!");
        }

        return Promise.reject((json && json.message) || response.statusText);
    });
}