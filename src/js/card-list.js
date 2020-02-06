import {ownerId} from '../js/server-info.js';

export default class Cardlist {
  constructor() {}

  addCard(name, link, id) {
    const card = {
      name: name,
      link: link,
      likeCount: 0,
      isOwner: true,
      cardId: id,
      isLiked: false
    };
    return card;

    //Можно лучше: Внутри классов не стоит использовать экземпляры других классов. (исправил)
    // Классы должны быть независимы друг от друга. (исправил)
    // Всё взаимодействие описываем в управляемом файле. script.js (исправил)
    // валидации здесь не должно быть (исправил)
    // Нельхя из класса обращаться к card, можете передавать как парамерт в класс
  }

  render(obj) {
    const newImage = document.createElement("div");
    const newDelButton = document.createElement("button");
    const newCardName = document.createElement("h3");
    const newCardLikes = document.createElement("p");
    const newLikeButton = document.createElement("button");
    const placesList = document.querySelector(".places-list");

    newDelButton.classList.add("place-card__delete-icon");
    if (obj.isOwner) {
      newDelButton.classList.add("place-card__delete-icon_visible");
      newDelButton.setAttribute("id", obj.cardId);
    }
    newLikeButton.classList.add("place-card__like-icon");

    newImage.appendChild(newDelButton);
    newCardName.classList.add("place-card__name");
    newImage.classList.add("place-card__image");
    newImage.setAttribute("style", "background-image: url(" + obj.link + ")");
    newCardLikes.classList.add("place-card__like-count");
    newCardLikes.textContent = obj.likeCount;
    newCardName.textContent = obj.name;

    newLikeButton.setAttribute("id", obj.cardId);
    if (obj.isLiked) {
      newLikeButton.classList.add("place-card__like-icon_liked");
    }

    // console.log(isLiked);
    placesList.innerHTML += `
      <div class="place-card"> 
        ${newImage.outerHTML}
        <div class="place-card__description">
          ${newCardName.outerHTML}
          <div class="place-card__like-block">
          ${newLikeButton.outerHTML}
          ${newCardLikes.outerHTML}
        </div>
      </div>`;
  }

  getRenderArray(arr) {
    const outputArr = [];

    for (let obj of arr) {
      let isOwner = false;
      let isLiked = false;
      if (obj.owner._id == ownerId) {
        isOwner = true;
      }

      for (let elem of obj.likes) {
        if (elem._id == ownerId) {
          isLiked = true;
        }
      }

      outputArr.push({
        name: obj.name,
        link: obj.link,
        likes: obj.likes.length,
        isOwner: isOwner,
        cardId: obj._id,
        isLiked: isLiked
      });
    }
    // console.log(outputArr);
    return outputArr;
  }
}
