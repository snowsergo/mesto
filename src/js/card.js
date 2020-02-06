import {placesList} from '../index.js';

export default class Card {
  constructor() {}

  getCardId(obj) {
    return obj._id;
  }

  removeLike(element) {
    element.classList.remove("place-card__like-icon_liked");
    element.nextElementSibling.textContent =
      Number(element.nextElementSibling.textContent) - 1;
  }

  setLike(element) {
    element.classList.add("place-card__like-icon_liked");
    element.nextElementSibling.textContent =
      Number(element.nextElementSibling.textContent) + 1;
  }

  remove(element) {
    placesList.removeChild(element.closest(".place-card"));
  }

  create(obj) {
    const card = {
      name: obj.name,
      link: obj.link,
      likeCount: obj.likes,
      isOwner: obj.isOwner,
      cardId: obj.cardId,
      isLiked: obj.isLiked
    };
    return card;
  }
}
