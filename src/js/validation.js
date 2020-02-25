
import {message} from '../js/validation-messages.js';
import {nameInput,jobInput,placeInput,cardForm} from '../index.js';

export default class Validation {
  constructor() {}

  checkLink() {
    const str = cardForm.elements.link.value;
    
    return (
      str.startsWith("https://") &&
      !str.includes(" ") &&
      !str.includes('"') &&
      !str.includes(",") &&
      str.includes(".")
    );
  }
  
  //проверка ввода текста
  inputValidate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);

    if (element.value.length === 0) {
      errorElement.textContent = message.ru.validationRequired;
      errorElement.classList.add("error-message__visible");
      return false;
    }
    if (element.value.length < 2 || element.value.length > 30) {
      errorElement.textContent = message.ru.validationLenght;
      errorElement.classList.add("error-message__visible");
      return false;
    }
    errorElement.textContent = message.ru.validationDone;
    errorElement.classList.remove("error-message__visible");
    return true;
  }

  //проверка ввода ссылки
  inputLinkValidate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);

    if (this.checkLink()) {
      errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
      return true;
    } else {
      errorElement.textContent = message.ru.validationLink;
      errorElement.classList.add("error-message__visible");
      return false;
    }
  }
  //проверка формы карточки
  cardValidate() {
    //const placeInput = document.querySelector("#place");
    const popupCardButton = document.querySelector(".popup__card-add-button");
    if (placeInput.validity.valid && this.checkLink()) {
      popupCardButton.classList.add("popup__button-is-active");
      popupCardButton.removeAttribute("disabled");
    } else {
      popupCardButton.classList.remove("popup__button-is-active");
      popupCardButton.setAttribute("disabled", true);
    }
  }
  // проверка формы пользователя
  userValidate() {
    const popupUserButton = document.querySelector(".popup__user-add-button");
    //const nameInput = document.querySelector("#name");
    //const jobInput = document.querySelector("#job");
    if (nameInput.validity.valid && jobInput.validity.valid) {
      popupUserButton.classList.add("popup__button-is-active");
      popupUserButton.removeAttribute("disabled");
    } else {
      popupUserButton.classList.remove("popup__button-is-active");
      popupUserButton.setAttribute("disabled", true);
    }
  }
  //валидация инпутов
  handleValidate(event) {
    if (event.target.id == "link") {
      this.inputLinkValidate(event.target);
    } else this.inputValidate(event.target);
  }
};
