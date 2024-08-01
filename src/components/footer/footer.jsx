import './footer.css'

import homeIcon from '../../logo.svg';  
import infoIcon from '../../logo.svg';  
import playIcon from '../../logo.svg';

export function Footer () {
    return(
        <footer className="footer">
        <a href="" className="footer-button">
          <img src={homeIcon} alt="Inicio" className="button-icon"/>
          Inicio
        </a>
        <a href="" className="footer-button">
          <img src={infoIcon} alt="Información" className="button-icon"/>
          Información
        </a>
        <a href="" className="footer-button">
          <img src={playIcon} alt="Jugar" className="button-icon"/>
          Jugar
        </a>
      </footer>
    )
}


