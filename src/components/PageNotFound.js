import {Link} from "react-router-dom";

function PageNotFound(){
    return (
        <div className="not-found">
            <h3 className="not-found__title"><span>404</span> - Страница не найдена</h3>
            <Link className="not-found__button" to="/">Назад</Link>
        </div>
    )
}

export default PageNotFound;