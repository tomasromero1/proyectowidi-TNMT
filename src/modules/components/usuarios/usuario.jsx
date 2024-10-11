import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase/Firebase.config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import './Usuario.css';

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal

  // Función para iniciar sesión
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser); 
      console.log("Usuario logueado: ", loggedInUser);
    } catch (error) {
      console.error("Error al iniciar sesión con Google: ", error);
    }
  };

  // Función para mostrar el modal de confirmación de cierre de sesión
  const handleShowLogoutModal = () => {
    setShowLogoutModal(true); // Mostrar el modal
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); 
      setShowLogoutModal(false); // Cerrar el modal después de cerrar sesión
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  // Función para cancelar el cierre de sesión
  const handleCancelLogout = () => {
    setShowLogoutModal(false); // Ocultar el modal sin cerrar sesión
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
      {user ? (
        <div>
          <p>Usuario: {user.email}</p> {/* Mostrar el correo del usuario */}
          <button onClick={handleShowLogoutModal}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión con Google</button>
      )}

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Salir de tu cuenta?</p>
            <button onClick={handleCancelLogout}>Cancelar</button>
            <button onClick={handleLogout}>Salir</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;
