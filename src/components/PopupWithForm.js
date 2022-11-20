import { useEffect } from "react";

function PopupWithForm(props) {

  function handleEscClose(evt){
    if (evt.key === "Escape") {
      props.onClose && props.onClose()
    }
  }
    
  useEffect(() => {
     window.addEventListener('keydown', handleEscClose);
     return ()=>{
      window.removeEventListener('keydown', handleEscClose)
     };
  }, [])
  
  return (
    <div
      className={
        props.isOpen ? `popup popup_opened popup${props.name}` : `popup`
      }
    >
      <div className={`popup__container popup__container${props.name}`}>
        <form
          className={`popup__form popup__form${props.name}`}
          action="./scripts/script.js"
          method="post"
          name={`${props.name}`}
          tabIndex="0"
          onSubmit={props.onSubmit}
        >
              <button
                className="popup__close-btn"
                type="button"
                aria-label="Закрыть"
                tabIndex="4"
                onClick={props.onClose}
              />
              <h3 className={`popup__title popup__title${props.name}`}>{props.title}</h3>
              <fieldset className={`popup__form-items popup__form-items${props.name}`}>{props.children}</fieldset>
              <button
                type="submit"
                name="submit"
                className={`popup__submit-btn popup__submit-btn${props.name}`}
                tabIndex="3"
              >
                {props.btnText}
              </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

