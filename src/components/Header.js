import headerLogo from "../images/logo.svg"; //Мы импортировали файл изображения logo.svg в компонент строчкой кода
import {Link, Route,Switch} from "react-router-dom";

function Header({isLoggedIn,onLogout,userData}) {
  console.log('header',userData);
 /*console.log('header',userData.email|| "пусто");*/
  return (
    <header className="header root__section">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Здесь должно быть изображение Лого"/>
        <ul className="header__nav">
       { /*<li><Link to="signup" className="header__link">Зарегистрироваться</Link></li>*/}
       {isLoggedIn ? 
        <>
        <li><p className="header__link">з{userData.data.email}</p></li>
        <li><button onClick={onLogout} className="header__link header__button">Выйти</button></li>
        </>:
        <>
        <Switch>
        <Route exact path="/signup">
        <li><Link to="/signin" className="header__link">Войти</Link></li>
        </Route>
        <Route exact path="/signin">
        <li><Link to="/signup" className="header__link">Регистрация</Link></li>
        </Route>
        </Switch>
        </>
      }
    </ul>

    </header>
  );
}

export default Header;
/*


      <ul className="header__nav">
       { /*<li><Link to="signup" className="header__link">Зарегистрироваться</Link></li>*/
    /*   {isLoggedIn ? 
        <>
        <li><Link to="/" className="header__link">{userData.data.email || " "}</Link></li>
        <li><Link onClick={onLogout} className="header__link header__button">Выйти</Link></li>
        </>:
        <>
        <li><Link to="/signin" className="header__link">Войти</Link></li>
        <li><Link to="/signup" className="header__link">Регистрация</Link></li>
        </>
      }
    </ul>*/

    /*
          />
<Switch>
  <Route exact path="/signin">
    <Link to="/signup" className="header__link">Регистрация</Link>
  </Route>
  <Route exact path="/signup">
     <Link to="/signin" className="header__link">Войти</Link>
  </Route>
  <Route exact path="/">
    <>
     <p className="header__link">{userData.data || ""}</p>
     <button onClick={onLogout} className="header__link header__button">Выйти</button>
     </>
  </Route>
</Switch>*/