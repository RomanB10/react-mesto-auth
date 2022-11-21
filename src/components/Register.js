import { useState } from "react";
import { Redirect, Link } from "react-router-dom";

function Register({ onRegister, isLoggedIn }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  /*const [message, setMessage] = useState("");*/

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
    onRegister(userData.password, userData.email);
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="registerContainer">
      <div className={`popup__container popup__container_type_register`}>
        <form
          className={`popup__form`}
          action="./scripts/script.js"
          method="post"
          name={`_type_auth`}
          tabIndex="0"
          onSubmit={handleSubmit}
        >
          <h3 className={`popup__title popup__title_type_register`}>
            Регистрация
          </h3>

          <fieldset
            className={`popup__form-items popup__form-items_type_register`}
          >
            <div className="popup__form-item popup__form-item_type_register">
              <input
                className="popup__input popup__input_type_register"
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
              <span className="name-error popup__input-error" />
            </div>
            <div className="popup__form-item popup__form-item_type_register">
              <input
                className="popup__input popup__input_type_register"
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
              <span className="job-error popup__input-error" />
            </div>
          </fieldset>

          <button
            type="submit"
            name="submit"
            className={`popup__submit-btn popup__submit-btn_type_register`}
            tabIndex="3"
          >
            Зарегистрироваться
          </button>
          <p className="popup__question">
            Уже зарегистрированы?
            <Link className="popup__question" to="/signin">
              {" "}
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
