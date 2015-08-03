const token = btoa('username' + ':' + 'password');

export function getRequestHeaders() {
    return {
        Authorization: 'Basic ' + token,
        Accept: 'application/json'
    };
}

export function setRequestHeaders(xhr) {
    xhr.setRequestHeader('Authorization', 'Basic ' + token);
    xhr.setRequestHeader('Accept', 'application/json');
}
