import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('box-project-user')));

export const authService = {
    login,
    logout,
    header,
    evaluate,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

function login(username, password) {
    console.log("login()");
    return fetch("api/auth", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(json => {
        console.log('success: ' + json.success);
        console.log('username: ' + json.user.username);
        console.log('token: ' + json.user.token);

        localStorage.setItem('box-project-user', JSON.stringify(json.user));
        currentUserSubject.next(json.user);

        return json;
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
        if (response.ok) {
            return text;
        }

        if ([401, 403].indexOf(response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            authService.logout();
            // TODO: redirect home, current issue is we are not a component so we can't do a useLocation?
            console.log("not authorized!");
        }

        return Promise.reject(response.statusText);
    });
}