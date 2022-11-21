import { useState } from "react";
import { Redirect } from "react-router-dom";

function Login({ handleLogin, isLoggedIn }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    //запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    if (!userData.password || !userData.email) {
      return;
    }
    handleLogin(userData.password, userData.email);
  }
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginContainer">
      <div className={`popup__container popup__container_type_auth`}>
        <form
          className={`popup__form`}
          action="./scripts/script.js"
          method="post"
          name={`_type_auth`}
          tabIndex="0"
          onSubmit={handleSubmit}
        >
          <h3 className={`popup__title popup__title_type_auth`}>Вход</h3>

          <fieldset className={`popup__form-items popup__form-items_type_auth`}>
            <div className="popup__form-item popup__form-item_type_auth">
              <input
                className="popup__input popup__input_type_auth"
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="40"
                tabIndex="1"
                value={userData.email || ""} //добавили проверку,чтобы в value инпута не попадало значение undefined
                onChange={handleChange}
              />
            </div>
            <div className="popup__form-item popup__form-item_type_auth">
              <input
                className="popup__input popup__input_type_auth"
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                tabIndex="2"
                value={userData.password || ""} //добавили проверку,чтобы в value инпута не попадало значение undefined
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            name="submit"
            className={`popup__submit-btn popup__submit-btn_type_auth`}
            tabIndex="3"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
