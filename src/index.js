console.log("Hello from index.js");
import './pages/index.css';

//   Токен: c66b50f5-8822-4a68-8668-3460b8d083f5
//   Идентификатор группы: cohort6
// 95.216.175.5
// мой  id   dd8250e77aa5d43ee5755cb3   - для удаления карточек

//-------------------------------------- Переменные------------------------------------

const placesList = document.querySelector(".places-list");
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup-edit");
const popupImage = document.querySelector(".popup-image");

const popupPic = document.querySelector(".popup__pic");
const errors = document.querySelectorAll(".error-message");

const api = new Api();
const card = new Card();
const cardlistObj = new Cardlist();
const popupObj = new Popup();
const userObj = new User();
const validObj = new Validation();
const root = document.querySelector(".root");

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");

const placeInput = document.querySelector("#place");
const linkInput = document.querySelector("#link");

const cardForm = document.forms.card;
const userForm = document.forms.user;

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

// Можно лучше: Когда в слушателе вы создаёте реализацию, вынесите её в отдельную функцию. В будущем вы сможите переиспользовать функцию (исправил)
// Как пример:
// element.addEventListener('click', myFuncInfo);
// function myFuncInfo(event){ /* Здесь ваша реализация */ }

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
    //надо исправить: удалите else оно лишнее, добавьте return для выхода (исправил)
  }
  if (event.target.classList.contains("user-edit__button")) {
    popupObj.setInputText();
    popupObj.open(popupEdit);
    return;
    //надо исправить: удалите else оно лишнее, добавьте return для выхода (исправил)
  }
  if (event.target.classList.contains("place-card__image")) {
    popupObj.setImageLink(event);
    popupObj.open(popupImage);
    return;
    //надо исправить: удалите else оно лишнее, добавьте return для выхода (исправил)
  }
  if (event.target.id == "place-close") {
    // используйте строгое сравнение
    cardForm.reset();
    popupObj.close(popup);
    popupObj.removeErrorMessages();
    return;
    //надо исправить: удалите else оно лишнее, добавьте return для выхода (исправил)
  }
  if (event.target.id === "user-close") {
    // используйте строгое сравнение (исправил)
    userForm.reset();
    popupObj.close(popupEdit);
    popupObj.removeErrorMessages();
    return;
    //надо исправить: удалите else оно лишнее, добавьте return для выхода(исправил)
  }
  if (event.target.id === "image-close") {
    // используйте строгое сравнение (исправил)
    popupObj.close(popupImage);
    return;
  }
}

// Можно лучше: Когда в слушателе вы создаёте реализацию, вынесите её в отдельную функцию. В будущем вы сможите переиспользовать функцию
// Как пример:
// element.addEventListener('click', myFuncInfo);
// function myFuncInfo(event){ /* Здесь ваша реализация */ }(исправил)

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
// Можно лучше: Когда в слушателе вы создаёте реализацию, вынесите её в отдельную функцию. В будущем вы сможите переиспользовать функцию
// Как пример:
// element.addEventListener('click', myFuncInfo);
// function myFuncInfo(event){ /* Здесь ваша реализация */ } (исправил)
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

//Можно лучше: Имена файлов соответствуют имени класса. Cardlist -> card-list.js Имена должны быть единообразно написаны. В именах не используем camelCase (исправил)

/*Отличная работа. Остался баг: при добавлении карточки форма не очищается. Стоит поправить перед началом работы над следующим спринтом. (исправил)
Нужно постараться не использовать методы одних классов в методах других. Поддерживать такой код сложно и он очень хрупкий.
 Взаимодействие реализуем  в управляемом файле и с помошью передачи необходимых данных в аргументы функций. (в процессе освоения)
* Удачи в обучении.*/

/**
 * Здравствуйте.
 * Ну во первых создать класс Api, как вы поняли (готово)
 * удалите initial-ßards.js (готово)
 *
 * Всё написал в работе
 *
 */

/**
 * Здравствуйте.
 * Надо исправить: Из класса Api надо вынести http://95.216.175.5/cohort6 информация во первых дублируется, а во вторых лучше её передавать в качестве параметров (исправил)
 * Надо исправить:  Вы же написали что удалили  initial-ßards.js а он есть.... (удалил)
 * Надо исправить:  Вы пытаетесь преобразовать данные котонрые приходят из API в этом файле
 *     .then(res => res.json())
 * Как и проверить
 *       if (res.ok) {
 * Но это всё должно быть в классе Api (исправил)
 *
 * Можно лучше:  token  ownerId лучше вынести в отдельный файл (исправил)
 *
 */
/*  Вопрос!!! Во всех ли слушателях нужно выносить реализацию в отдельные функции? если нет то в каких случаях выносить а в каких нет?
  element.addEventListener('click', myFuncInfo);
 function myFuncInfo(event){
 */
/**
 * Здравствуйте.
 * Работа принимается.
 * Выносить лучше всегда, такой код можно переиспользовать ещё раз.
 *
 *
 */