import './Usuario.css';
import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase/Firebase.config.js'; 
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [message, setMessage] = useState(""); 

  // Función para iniciar sesión
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setMessage("¡Inicio de sesión exitoso!");
      setUser(loggedInUser);
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Error al iniciar sesión con Google: ", error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); 
      setShowLogoutModal(false);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  // Mantener la sesión activa al cambiar de pantallas
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {message && <p className="message">{message}</p>}

      {user ? (
        <div>
          <p>Usuario: {user.email}</p>
          <button onClick={() => setShowLogoutModal(true)}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Iniciar sesión con Google</button>
        </div>
      )}

      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Salir de tu cuenta?</p>
            <button onClick={() => setShowLogoutModal(false)} className='botones'>Cancelar</button>
            <button onClick={handleLogout} className='botones'>Salir</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;

