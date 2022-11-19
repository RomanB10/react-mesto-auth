import unionFail from "../images/unionFail.svg";
import unionSuccess from "../images/unionSuccess.svg";

function InfoTooltip({
  isInfoToolTipOpen,
  tooltipStatus,
  onClose,
}) {

  const imageInfo = tooltipStatus === 'success' ? unionSuccess: unionFail;
  const textInfo = tooltipStatus  === 'success' ? `Вы успешно зарегистрировались!`:`Что-то пошло не так! Попробуйте еще раз.`;

  return (
  
    <div
      className={
        isInfoToolTipOpen
          ? "popup popup_type_type_union  popup_opened"
          : "popup popup_type_type_union"
      }
    >
      <div className={`popup__container`}>
      <form
          className={`popup__form popup__form_type_union`}
          name="_type_union"
        >
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
          tabIndex="4"
          onClick={onClose}
        />
        <img
          className={"popup__image-union"}
          src={imageInfo}
          alt=""
        />
        <h3 className={`popup__title popup__title_type_union`}>
          {textInfo}
        </h3>
      </form>
      </div>
    </div>

  );
}

export default InfoTooltip;
