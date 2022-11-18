import { useState } from "react";
import PopupWithForm from "./PopupWithForm"; //подгрузили компонент формы
import { Redirect } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Login({onClose, handleLogin, isLoggedIn }) {
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
      <PopupWithForm
        id="1"
        name="_type_auth"
        title="Вход"
        btnText="Войти"
        isOpen={true} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
        onSubmit={handleSubmit}
      >
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
            title=" Длина поля должна быть 2 и более символов и менее или равно 40"
            tabIndex="1"
            value={userData.email || ""} //добавили проверку,чтобы в value инпута не попадало значение undefined
            onChange={handleChange}
          />
          <span className="name-error popup__input-error" />
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
            title=" Длина поля должна быть 2 и более символов и менее или равно 200"
            tabIndex="2"
            value={userData.password || ""} //добавили проверку,чтобы в value инпута не попадало значение undefined
            onChange={handleChange}
          />
          <span className="job-error popup__input-error" />
        </div>
      </PopupWithForm>
    </div>
  );
}

export default Login;
