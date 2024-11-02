import './Usuario.css';
import React, { useState, useEffect } from 'react';
import { auth, provider, db } from '../firebase/Firebase.config.js'; 
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);
      setMessage("¡Inicio de sesión exitoso!");

      const userDocRef = doc(db, "users", loggedInUser.uid);

      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, { role: "user", email: loggedInUser.email });
      } else {
        setRole(userDoc.data().role);
      }

      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Error al iniciar sesión con Google: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); 
      setRole(null);
      setShowLogoutModal(false);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
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

          {role === "admin" && (
            <div>
              <h3>Panel de administración</h3>
              <button onClick={() => navigate('/User')}>Gestionar Usuarios</button>
              <p>Acceso al CRUD de preguntas</p>
            </div>
          )}
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
