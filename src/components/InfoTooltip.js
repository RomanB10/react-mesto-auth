import PopupWithForm from "./PopupWithForm";
import  unionFail from "../images/unionFail.svg";
import unionSuccess from "../images/unionSuccess.svg";

function InfoTooltip({isInfoToolTipOpen, tooltipStatus, onClose,registered}){
    console.log('В InfoTooltip приходит',registered)
         return(
            <PopupWithForm
            id="1"
            name="_type_union"
            title={tooltipStatus}
            arialLabel={registered ? 'Успешная регистрация':'Ошибка регистрация'}
            isOpen={isInfoToolTipOpen} 
            onClose={onClose} //в скобках передаваемый пропс из APP, далее прокидываем его в компонент PopupWithForm
            img={registered ? unionSuccess: unionFail}
          >
          </PopupWithForm>
          );
         }

export default InfoTooltip;
