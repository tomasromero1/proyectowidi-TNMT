import './Footer.css';
import { Link } from 'react-router-dom';
import homeIcon from '../img/icon_home.png';  
import infoIcon from '../img/book_icon.png';  
import playIcon from '../img/joystick_icon.png';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-button">
                <Link to="/">
                    <img src={homeIcon} alt="Inicio" className="button-icon" />
                    Inicio
                </Link>
            </div>
            <div className="footer-button">
                <Link to="/Informacion">
                    <img src={infoIcon} alt="Información" className="button-icon" />
                    Información
                </Link>
            </div>
            <div className="footer-button">
                <Link to="/Play">
                    <img src={playIcon} alt="Jugar" className="button-icon" />
                    Jugar
                </Link>
            </div>
            <div className="footer-button">
                <Link to="/src/NuevaPantalla.jsx">
                    <img src={homeIcon} alt="Inicio" className="button-icon" />
                    NuevaPantalla
                </Link>
            </div>
        </footer>
    );
}
