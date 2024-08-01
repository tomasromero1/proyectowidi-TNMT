import './header.css'

import GoogleIcon from '../../logo.svg';

export function Header () {
    return(
        <header className="header">
  <h1 className="header-title">APP ESI</h1>
  <a href="" className="header-button">
    <img src={GoogleIcon} alt="Inicio" className="button-icon" />
    Usuario
  </a>
</header>

    )
}


