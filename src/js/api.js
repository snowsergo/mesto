class Api {
  constructor() {}
  //  Надо исправить: Необходимо в метод добавить обработку ошибок
  //    .catch((err) => {
  //  	console.log(err);
  //  	});
  setLike(server, token, cardId) {
    return fetch(`${server}/cards/like/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      }
    }).catch(err => {
      console.log("Ошибка установки лайка", err);
    });
  }

  removeLike(server, token, cardId) {
    return fetch(`${server}/cards/like/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      }
    }).catch(err => {
      console.log("Ошибка удаления лайка", err);
    });
  }

  //добавление карточки
  sentCard(server, token, name, link) {
    return fetch(`${server}/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })

      .catch(err => {
        console.log("Ошибка отправки лайка", err);
      });
  }

  //удаление карточки
  removeCard(server, token, cardId) {
    return fetch(`${server}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      }
    }).catch(err => {
      console.log("Ошибка удаления карточки", err);
    });
  }

  //запрос данных пользователя
  getUserInfo(server, token) {
    return fetch(`${server}/users/me`, {
      headers: {
        authorization: token
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка загрузки пользователя: ${res.status}`);
    });
  }

  //отправка данных пользователя
  setUserInfo(server, token, name, about) {
    return fetch(`${server}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).catch(err => {
      console.log("Ошибка отправки данных пользователя", err);
    });
  }

  //запрос карточек с сервера
  getInitialCards(server, token) {
    return fetch(`${server}/cards`, {
      headers: {
        authorization: token
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка загрузки первоначальных карточек: ${res.status}`
      );
    });
  }
}
