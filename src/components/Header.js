import headerLogo from "../images/logo.svg"; 
import { Link, Route, Switch } from "react-router-dom";

function Header({ isLoggedIn, onLogout, userData }) {
  return (
    <header className="header root__section">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Здесь должно быть изображение Лого"
      />

      <div className="header__dropdown">
        {isLoggedIn ? (
          <>
            <ul className={`header__nav  header__nav-content`}>
              <li>
                <p className="header__link">
                  {userData.data === undefined ? "":userData.data.email}
                </p>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="header__link header__button"
                >
                  Выйти
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className={`header__nav  header__nav-content`}>
              <Switch>
                <Route exact path="/signup">
                  <li>
                    <Link to="/signin" className="header__link">
                      Войти
                    </Link>
                  </li>
                </Route>
                <Route exact path="/signin">
                  <li>
                    <Link to="/signup" className="header__link">
                      Регистрация
                    </Link>
                  </li>
                </Route>
              </Switch>
            </ul>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
