export default class User {
  constructor() {}
  //Можно лучше: Не забываем про event на вход.(исправил)
  change(obj) {
    const name = document.querySelector(".user-info__name");
    const job = document.querySelector(".user-info__job");
    const userImage = document.querySelector(".user-info__photo");

    name.textContent = obj.name;
    job.textContent = obj.about;
    userImage.style.backgroundImage = `url(${obj.avatar})`;
  }
}
