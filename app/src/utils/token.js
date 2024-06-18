
// This file is used to store the token in the local storage of the browser.

// The setToken function is used to store the token in the local storage of the browser.
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}
// The getToken function is used to get the token from the local storage of the browser.
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}
// The removeToken function is used to remove the token from the local storage of the browser.
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
}