function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        card
          ? "popup popup_type_open-image  popup_opened"
          : "popup popup_type_open-image"
      }
    >
      {card &&(
      <div className="popup__container-image">
        <figure className="popup__main-illustration">
          <button
            className="popup__close-btn"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}/>
          <img
            className="popup__image-place"
            src={card.link}
            alt={`Здесь должно быть изображение ${card.name}`}
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
)}
    </div>
  );
}

export default ImagePopup;

//*необходимо отдельо для контейнера с классом "popup__container-image" устанавливать условие по card, 
//так как в противном случае при отрисовке элемента со значением null в кносоль выдает ошибку (null.link, null.card),что невозможно. 
//т.е. подстановка card.link, card.name произойдет только при card отличном от null (когда card это объект с нужными полями)
