import './header.css'

import GoogleIcon from '../../logo.svg';

export function Header () {
    return(
      
    <header class="header">
    <a href="" class="header-left"></a>
    <h1 class="header-title">APP ESI</h1>
    <a href="" class="header-button">
    <img src={GoogleIcon} alt="Inicio" class="button-icon" />
    Usuario
    </a>
    </header>

    )
}


