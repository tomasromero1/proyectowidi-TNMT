import React from 'react';
import { auth, provider } from '../firebase/firebase.config'; // Asegúrate de que la ruta sea correcta
import { signInWithPopup, signOut } from "firebase/auth";

const GoogleLogin = () => {
  // Función para iniciar sesión
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario logueado: ", user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google: ", error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default GoogleLogin;
