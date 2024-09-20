import './header.css'
import { Link } from 'react-router-dom';
import GoogleIcon from '../img/usuario_logo.png';
import logo from '../img/logo.png';

export function Header () {
    return(
      
    <header class="header">
    <img src={logo} alt="logo" class="header-left" />
    <h1 class="header-title">APP ESI</h1>
    <Link to="/usuario" class="header-button">
    <img src={GoogleIcon} alt="Inicio" class="button-icon" />
    Usuario
    
    </Link>
    
    </header>

    )
}


