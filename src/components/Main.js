import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext"; //импорт контекста
import { useContext } from "react"; //ипорт хука для использования КОНТЕКСТА

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext); //Подписываемся на контекст

  return (
    <main className="main">
      <section className="profile root__section">
        <div className="profile__container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Здесь должно быть изображение Аватара"
          />
          <button
            className="profile__avatar-btn"
            type="submit"
            name="submit"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-btn"
            type="button"
            onClick={onAddPlace}
          />
        </div>
      </section>
      <section className="content root__section">
        <ul className="photo-grid">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onImageZoom={onCardClick} //Спускае пропс в card
              onCardLike={onCardLike} //Спускае пропс в card
              onCardDelete={onCardDelete} //Спускае пропс в card
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
