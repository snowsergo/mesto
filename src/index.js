console.log("Hello from index.js");
import './pages/index.css';

import Api from '../src/js/api.js';
import Cardlist from '../src/js/card-list.js';
import Card from '../src/js/card.js';
import Popup from '../src/js/popup.js';
import {server, token} from '../src/js/server-info.js';
import User from '../src/js/user.js';
//import message from '../src/js/validation-messages.js';
import Validation from '../src/js/validation.js';


//-------------------------------------- Переменные------------------------------------

export const placesList = document.querySelector(".places-list");
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup-edit");
const popupImage = document.querySelector(".popup-image");


//const errors = document.querySelectorAll(".error-message");

const api = new Api();
const card = new Card();
const cardlistObj = new Cardlist();
const popupObj = new Popup();
const userObj = new User();
const validObj = new Validation();
const root = document.querySelector(".root");

export const nameInput = document.querySelector("#name");
export const jobInput = document.querySelector("#job");

export const placeInput = document.querySelector("#place");
const linkInput = document.querySelector("#link");

export const cardForm = document.forms.card;
export const userForm = document.forms.user;

//---------------------------------1. Загрузка информации о пользователе с сервера---------------------------------
api.getUserInfo(server, token).then(result => {
  userObj.change(result);
});

//--------------------------------2. Загрузка первоначальных карточек с сервера-------------------------------------
api
  .getInitialCards(server, token)
  .then(result => {
    return cardlistObj.getRenderArray(result);
  })
  .then(result => {
    for (let elem of result) {
      cardlistObj.render(card.create(elem));
    }
  });



//-----------------------------------функции----------------------------------------------------

function handlePlacesList(event) {
  const cardId = event.target.getAttribute("id");
  // ---------------------------------------------------------Лайки----------------------------
  if (event.target.classList.contains("place-card__like-icon")) {
    if (event.target.classList.contains("place-card__like-icon_liked")) {
      api.removeLike(server, token, cardId).then(() => {
        card.removeLike(event.target);
      });
    } else {
      api.setLike(server, token, cardId).then(() => {
        card.setLike(event.target);
      });
    }
  } else if (event.target.classList.contains("place-card__delete-icon")) {
    // ---------------------------------------6 Удаление карточки--------------------------------------------------------------
    if (window.confirm("Are you serious?")) {
      api.removeCard(server, token, cardId).then(() => {
        card.remove(event.target);
      });
    }
  }
}

function handlePopup(event) {
  if (event.target.classList.contains("user-info__button")) {
    popupObj.open(popup);
    return;
    
  }
  if (event.target.classList.contains("user-edit__button")) {
    popupObj.setInputText();
    popupObj.open(popupEdit);
    return;
    
  }
  if (event.target.classList.contains("place-card__image")) {
    popupObj.setImageLink(event);
    popupObj.open(popupImage);
    return;
    
  }
  if (event.target.id === "place-close") {
  
   
    cardForm.reset();
    popupObj.close(popup);
    popupObj.removeErrorMessages();
    return;
  
  }
  if (event.target.id === "user-close") {
    userForm.reset();
    popupObj.close(popupEdit);
    popupObj.removeErrorMessages();
    return;
  }
  if (event.target.id === "image-close") {
    popupObj.close(popupImage);
    return;
  }
}

function handleUser(event) {
  event.preventDefault();
  popupObj.renderLoading(true);
  api
    .setUserInfo(
      server,
      token,
      userForm.elements.name.value,
      userForm.elements.job.value
    )
    .then(() => {
      popupObj.renderLoading(false);
      const userName = document.querySelector(".user-info__name");
      const userJob = document.querySelector(".user-info__job");
      userName.textContent = `${userForm.elements.name.value}`;
      userJob.textContent = `${userForm.elements.job.value}`;
      popupObj.close(popupEdit);
    });
}

function handleCard(event) {
  event.preventDefault();
  popupObj.renderLoading(true);
  api
    .sentCard(
      server,
      token,
      cardForm.elements.place.value,
      cardForm.elements.link.value
    )
    .then(data => {
      popupObj.renderLoading(false);
      cardlistObj.render(
        cardlistObj.addCard(
          cardForm.elements.place.value,
          cardForm.elements.link.value,
          data._id
        )
      );
      popupObj.close(popup);
      cardForm.reset();
    });
}
//-----------------------------------Слушатели----------------------------------------------------
placesList.addEventListener("click", handlePlacesList);
// ---------------------------------------открытие закрытие попапов------------------------
root.addEventListener("click", handlePopup);
//-----------------------------------изменение пользователя----------------------------------------------------
userForm.addEventListener("submit", handleUser);

//-----------------------------------4. Добавление новой карточки на сервер----------------------------------------------------

cardForm.addEventListener("submit", handleCard);

userForm.addEventListener("input", function (event) {
  validObj.userValidate(event);
});

cardForm.addEventListener("input", function (event) {
  validObj.cardValidate(event);
});

nameInput.addEventListener("input", function (event) {
  validObj.handleValidate(event);
});

jobInput.addEventListener("input", function (event) {
  validObj.handleValidate(event);
});

placeInput.addEventListener("input", function (event) {
  validObj.handleValidate(event);
});
linkInput.addEventListener("input", function (event) {
  validObj.handleValidate(event);
});

