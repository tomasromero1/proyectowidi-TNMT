import './footer.css';
import { Link } from 'react-router-dom';
import homeIcon from '../img/icon_home.png';  
import infoIcon from '../img/book_icon.png';  
import playIcon from '../img/joystick_icon.png';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-button">
                <Link to="/home">
                    <img src={homeIcon} alt="Inicio" className="button-icon" />
                    Inicio
                </Link>
            </div>
            <div className="footer-button">
                <Link to="/informacion">
                    <img src={infoIcon} alt="Información" className="button-icon" />
                    Información
                </Link>
            </div>
            <div className="footer-button">
                <Link to="/play">
                    <img src={playIcon} alt="Jugar" className="button-icon" />
                    Jugar
                </Link>
            </div>
        </footer>
    );
}
