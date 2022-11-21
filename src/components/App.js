import { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";

import api from "../utils/Api";
import * as Auth from "../utils/Auth";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  //переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  //переменные состояния тултипа
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState("");

  const [selectedCard, setSelectedCard] = useState(null); //выбранная картинка для увеличенного размера

  const [loggedIn, setLoggedIn] = useState(false); //инфо о авторизованы мы или нет
  const [loading, setLoading] = useState(true); //инфо идет загрузка или нет
  const [userData, setUserData] = useState({}); // состояние пользователя _id, email

  // Стейт, отвечающий за данные ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
  const [currentUser, setCurrentUser] = useState({});

  //Стейт, отвечающий за отобрпжение КАРТОЧЕК
  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmationClick() {
    setIsConfirmationPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  //Отправка на сервер данных (name, description).Объект значений передается из EditProfilePopup
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((dataFromServer) => {
        setCurrentUser(dataFromServer); //обновление стейта
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Отправка на сервер данных (avatar).Объект значений передается из EditAvatarPopup
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((dataFromServer) => {
        setCurrentUser(dataFromServer); //обновление стейта
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Отправка на сервер Новой карточки.Объект значений передается из AddPlacePopup
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((dataFromServer) => {
        const newCard = dataFromServer;
        setCards([newCard, ...cards]); //при сеттере необходимо создавать новый массив, клонируя предыдущий ...spread
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Функция установки лайков
  function handleCardLike(card) {
    //Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Отправляем запрос в API и получаем обновленные данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((cardFromServer) => {
        setCards(
          (
            state //вместо значения в setCards передаем функцию, первый параметр (state)которой-текущий стейт
          ) =>
            state.map((item) => (item._id === card._id ? cardFromServer : item))
        ); //обновляем стейт карточек */
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  //Функция удаления карточки
  function handleCardDelete(card) {
    handleConfirmationClick(true);

    api
      .removeCard(card._id)
      .then(() => {
        const updatedCards = cards.filter(function (item) {
          return item._id !== card._id;
        }); //возвращает новый массив без карточки, в которой кликнули по корзине
        setCards(updatedCards); //обновляем стейт карточек локально
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос к серверу за данными (загрузка текущего ПОЛЬЗОВАТЕЛЯ)
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((dataFromServer) => {
          setCurrentUser(dataFromServer); //обновленние стейт переменной данными с СЕРВЕРА
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Запрос к серверу за данными (загрузка КАРТОЧЕК)
  useEffect(() => {
    if (loggedIn) {
      api
        .getAllCards()
        .then((dataFromServer) => {
          setCards(dataFromServer); //обновленние стейт переменной данными с СЕРВЕРА
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //ЗАПРОС ПРОВЕРКИ ТОКЕНА
  const tokenCheck = useCallback(async () => {
    try {
      setLoading(true); //каждый раз при отправке токена нужно показывать, что идет загрузка.Явно устанавлиаем истуину
      let jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("no token");
      }
      const user = await Auth.chekToken(jwt); //await использую, чтобы не писать логику в then
      if (!user) {
        throw new Error("invalid user");
      }
      if (user) {
        setLoggedIn(true);
        setUserData(user.data); //Обновление стэйта данными с ссервера _id, email*/
      }
    } catch (err) {
      if (err === 400) {
        console.log("400 — Токен не передан или передан не в том формате");
      }
      if (err === 401) {
        console.log("401 — Переданный токен некорректен");
      } else {
        console.log(`Ошибка:${err}`);
      }
    } finally {
      setLoading(false); // установка состояния загрузки лучше перенести в finally
    }
  }, []);

  //ЗАПРОС НА АВТОРИЗАЦИЮ, результат в дату.Как пропс handleLogin передаем в компонент Login (там как аргументы передаем емаил и пароль)
  const cbLogin = useCallback(
    async (password, email) => {
      try {
        setLoading(true);
        const data = await Auth.authorize(password, email); //записали TOKEN В data
        if (!data) {
          throw new Error("Неверные имя или пароль пользователя");
        }
        if (data.token) {
          localStorage.setItem("jwt", data.token); //сохраняем jwt
          setUserData({ email: `${email}` });
          setTooltipStatus(`success`);
          setLoggedIn(true);
          return data;
        }
      } catch (err) {
        setIsInfoToolTipOpen(true);
        setTooltipStatus(`fail`);
        if (err === 400) {
          console.log("400 - Не передано одно из полей");
        }
        if (err === 401) {
          console.log("401 - пользователь с email не найден");
        } else {
          console.log(`Ошибка:${err}`);
        }
      } finally {
        setLoading(false);
      }
    },
    [setTooltipStatus, setLoggedIn, setLoading, setIsInfoToolTipOpen]
  );

  //ЗАПРОС НА РЕГИСТРАЦИЮ
  const cbRegister = useCallback(
    async (password, email) => {
      try {
        setLoading(true);
        const data = await Auth.register(password, email);
        if (!data) {
          throw new Error("Неверные имя или пароль пользователя");
        }
        setTooltipStatus(`success`);
        return data;
      } catch (err) {
        setTooltipStatus(`fail`);
        if (err === 400) {
          console.log("400 - Некорректно заполнено одно из полей");
        } else {
          console.log(`Ошибка:${err}`);
        }
      } finally {
        setIsInfoToolTipOpen(true);
        setLoading(false);
      }
    },
    [setTooltipStatus, setLoading, setIsInfoToolTipOpen]
  );

  //Колбэк ВЫХОДА ИЗ СИСТЕМЫ(обнуление стэйтов и удаление токена из хранилища)
  const cbLogout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setUserData({});
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  if (loading) {
    //на весь компонент App пока идет загрузка рендери это
    return "...Loading";
  }

  return (
    <div className="root">
      <div className="page root__section">
        <CurrentUserContext.Provider value={currentUser}>
          <Header onLogout={cbLogout} userData={userData} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Route path="/signin">
              <Login
                onClose={closeAllPopups}
                handleLogin={cbLogin}
                isLoggedIn={loggedIn}
              />
            </Route>
            <Route path="/signup">
              <Register onRegister={cbRegister} isLoggedIn={loggedIn} />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
            <Route>
              {loggedIn ? <Redirect exact to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            id="3"
            name="confirmation"
            title="Вы уверены?"
            btnText="Да"
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            tooltipStatus={tooltipStatus}
            isInfoToolTipOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
