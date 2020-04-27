
export function getToken() {
    if (typeof(localStorage.token) !== "undefined") {
        return localStorage.token;
    }

    return false;
}

export function getUserId() {
    if(typeof(localStorage.userId) !== "undefined") {
        return localStorage.userId;
    }

    return false;
}

export function deleteToken() {
    localStorage.removeItem("token");
}

export function deleteUserId() {
    localStorage.removeItem("userId");
}