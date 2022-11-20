import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"; //подгрузили компонент формы

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(); //записываем объект, возвращаемый хуком в переменную

  function handleSubmit(event) {
    //запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    //Передаем значение avatar во внешний обработчик APP
    onUpdateAvatar(
      { avatar: avatarRef.current.value } //значение инпута полученное с помощью рефа
    );
  }

  //useEffect, реагирует на пропс isOpen, очищает значения инпутов при открытии попапа
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
      onClose={onClose} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          className="popup__input popup__input_type_change-avatar"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
          title="Введите URL"
          tabIndex="1"
          ref={avatarRef}
        />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
