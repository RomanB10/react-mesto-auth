import { Link } from "react-router-dom";

function PopupWithForm(props) {
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
          noValidate
          tabIndex="0"
          onSubmit={props.onSubmit}
        >
          {props.name === `_type_register`|| props.name === `_type_auth`?
          <>
              <h3
                className={`popup__title popup__title_type_success popup__title${props.name}`}
              >
                {props.title}
              </h3>
              <fieldset
                className={`popup__form-items popup__form-items${props.name}`}
              >
                {props.children}
              </fieldset>

             
              <button
                type="submit"
                name="submit"
                className={`popup__submit-btn popup__submit-btn${props.name}`}
                tabIndex="3"
              >
                {props.btnText}
              </button>

              {props.name === `_type_register` &&
              <p className = "popup__question">
              Уже зарегистрированы?<Link className="popup__question" to ="/signin"> Войти</Link>
              </p>}
              
              </>:
              <>
               <button
                className="popup__close-btn"
                type="button"
                aria-label="Закрыть"
                tabIndex="4"
                onClick={props.onClose}
              />
               {props.name === `_type_union` &&
               <img className={'popup__image-union'} src={props.img} alt=""/>
                         /*     <div className={`popup__image-union${props.name}`} ></div>}*/
               }

              <h3
                className={`popup__title popup__title_type_success popup__title${props.name}`}
              >
                {props.title}
              </h3>
              {props.name === `_type_union`? "":
              <>
              <fieldset
                className={`popup__form-items popup__form-items${props.name}`}
              >
                {props.children}
              </fieldset>
              <button
                type="submit"
                name="submit"
                className={`popup__submit-btn popup__submit-btn${props.name}`}
                tabIndex="3"
              >
                {props.btnText}
              </button>
              </>
              }
              </>}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

/*

            <button
              className="popup__close-btn"
              type="button"
              aria-label="Закрыть"
              tabIndex="4"
              onClick={props.onClose}
            />
        
          {props.name === `_type_success` || props.name === `_type_fail`&&
          <div className={`popup__image-union${props.name}`} ></div>}
          <h3 className={`popup__title popup__title_type_success popup__title${props.name}`}>
            {props.title}
          </h3>
          
          <fieldset
            className={`popup__form-items popup__form-items${props.name}`}
          >
            {props.children}
          </fieldset>

          {props.name === `_type_register`|| props.name === `_type_auth`&& 
          <button
            type="submit"
            name="submit"
            className={`popup__submit-btn popup__submit-btn${props.name}`}
            tabIndex="3"
          >
            {props.btnText}
          </button>}
          
          {props.name === `_type_register` && 

            <p className = "popup__question">
              Уже зарегистрированы?<Link className="popup__question" to ="/signin"> Войти</Link>
            </p>
          }


/*
 <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <form
          className="popup__form popup__form_type_edit-profile"
          action="./scripts/script.js"
          method="post"
          name={`${props.name}`}
          noValidate
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
          <h3 className="popup__title-profile">{props.title}</h3>
          <fieldset className="popup__form-items">{props.children}</fieldset>
          <button
            type="submit"
            name="submit"
            className="popup__submit-btn"
            tabIndex="3"
          >
            {props.btnText}
          </button>
        </form>
      </div>
    </div>
    */




    /*
    {props.name === "_type_auth" || props.name === "_type_register" ? (
            <>
              <h3
                className={`popup__title popup__title_type_success popup__title${props.name}`}
              >
                {props.title}
              </h3>


              {props.name === `_type_success` || props.name === `_type_fail`&&
                <div className={`popup__image-union${props.name}`} ></div>}
              <fieldset
                className={`popup__form-items popup__form-items${props.name}`}
              >
                {props.children}
              </fieldset>
              <button
                type="submit"
                name="submit"
                className={`popup__submit-btn popup__submit-btn${props.name}`}
                tabIndex="3"
              >
                {props.btnText}
              </button>

              {props.name === `_type_register` && (
                <p className="popup__question">
                  Уже зарегистрированы?
                  <Link className="popup__question" to="/signin">
                    {" "}
                    Войти
                  </Link>
                </p>
              )}
            </>
          ) : (
            <>
              <button
                className="popup__close-btn"
                type="button"
                aria-label="Закрыть"
                tabIndex="4"
                onClick={props.onClose}
              />
              <h3
                className={`popup__title popup__title_type_success popup__title${props.name}`}
              >
                {props.title}
              </h3>
              <fieldset
                className={`popup__form-items popup__form-items${props.name}`}
              >
                {props.children}
              </fieldset>
              <button
                type="submit"
                name="submit"
                className={`popup__submit-btn popup__submit-btn${props.name}`}
                tabIndex="3"
              >
                {props.btnText}
              </button>
            </>
          )}
          */