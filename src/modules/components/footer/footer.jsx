import './footer.css'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from '../../../home';
import Info from '../../../informacion';
import Play from '../../../play';

import homeIcon from '../../../logo.svg';  
import infoIcon from '../../../logo.svg';  
import playIcon from '../../../logo.svg';


export function Footer () {
    return(
        <Router>
      <div>
        <footer className="footer">
        <div className="footer-button">
          <Link to="/home"><img src={homeIcon} alt="Inicio" className="button-icon"/>
          Inicio</Link>
        </div>
        <div className="footer-button">
          <Link to="/informacion"><img src={infoIcon} alt="Información" className="button-icon"/>
          Información</Link>
        </div>
        <div className="footer-button">
          <Link to="/play"><img src={playIcon} alt="Jugar" className="button-icon"/>
          Jugar</Link>
        </div>
      </footer>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/informacion" element={<Info />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
    )
}