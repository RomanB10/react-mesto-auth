import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"; //подгрузили компонент формы

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //переменные состояния профайла
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //ПОДПИСКА НА КОНТЕКСТ
  const currentUser = useContext(CurrentUserContext); //Этот ХУК возвращает значение контекста, которое было передано в пропс value провайдера

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    //запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    //Передаем значения name, description управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  //После загрузки текущего пользователя из Api
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      id="1"
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
      onClose={onClose} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          tabIndex="1"
          value={name || ""}//добавили проверку,чтобы в value инпута не попадало значение undefined
          onChange={handleChangeName}
        />
      </div>
      <div className="popup__form-item">
        <input
          className="popup__input popup__input_type_job"
          type="text"
          name="job"
          id="job"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          tabIndex="2"
          value={description || ""}//добавили проверку,чтобы в value инпута не попадало значение undefined
          onChange={handleChangeDescription}
        />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
