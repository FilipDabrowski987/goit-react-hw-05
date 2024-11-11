import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Strona, której szukasz nie istnieje</p>
            <Link to="/">
                Powrót do strony głównej
            </Link>
        </div>
    )
}

export default NotFoundPage