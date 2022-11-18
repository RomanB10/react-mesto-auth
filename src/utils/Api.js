class Api {
  /* #onResponse(res){
     res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }*/
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  /*  _getResponse(res) {
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }*/

  //Загрузка карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/v1/cohort-51/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/v1/cohort-51/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }
  //Удаление карточки
  removeCard(idCard) {
    return fetch(`${this._url}/v1/cohort-51/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Установка и снятие лайка (PUT,DELETE) https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes

  changeLikeCardStatus(idCard, isLiked) {
    const addLike = { method: "PUT", headers: this._headers };
    const deleteLike = { method: "DELETE", headers: this._headers };

    return fetch(
      `${this._url}/v1/cohort-51/cards/${idCard}/likes`,
      isLiked ? deleteLike : addLike
    ).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/v1/cohort-51/users/me`, {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Обновление данных пользователя (name, about)
  setUserInfo(data) {
    return fetch(`${this._url}/v1/cohort-51/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Обновление аватара пользователя (avatar)
  setUserAvatar(data) {
    return fetch(`${this._url}/v1/cohort-51/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }
}

//Прямо внутри api.js создайте экземпляр класса Api с нужными параметрами (включая ваш токен)
//и экспортируйте этот экземпляр вместо самого класса.
const api = new Api({
  url: "https://mesto.nomoreparties.co",
  headers: {
    "Content-type": "application/json",
    authorization: "d90e3811-ba6b-4a7f-96a8-92745ac1e8db",
  },
});

export default api;
