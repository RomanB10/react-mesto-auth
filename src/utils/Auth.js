export const BASE_URL = "https://auth.nomoreparties.co";

//Метод регистрации
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(checkResponse);
};

//Метод авторизации
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(checkResponse);
};

//Проверка валидности токена
export const chekToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, //записываем схему аутентификации токен
    },
  }).then(checkResponse);
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};
