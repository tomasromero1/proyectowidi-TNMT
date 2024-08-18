import './header.css'

import GoogleIcon from '../img/usuario_logo.png';
import logo from '../img/logo.png';

export function Header () {
    return(
      
    <header class="header">
    <img src={logo} alt="logo" class="header-left" />
    <h1 class="header-title">APP ESI</h1>
    <a href="" class="header-button">
    <img src={GoogleIcon} alt="Inicio" class="button-icon" />
    Usuario
    </a>
    </header>

    )
}


