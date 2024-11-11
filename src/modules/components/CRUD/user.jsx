import './user.css';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/Firebase.config.js';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // Estado para el usuario en edición
  const [newEmail, setNewEmail] = useState("");

  // Función para cargar usuarios desde Firestore
  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  // Función para iniciar la edición del correo del usuario
  const startEdit = (user) => {
    setEditUserId(user.id);
    setNewEmail(user.email); // Cargar el correo existente en el campo de entrada
  };

  // Función para actualizar el correo del usuario
  const updateUserEmail = async () => {
    if (!newEmail) return; // Validación básica

    const userRef = doc(db, "users", editUserId);
    await updateDoc(userRef, { email: newEmail });
    setEditUserId(null); // Terminar edición
    fetchUsers(); // Refrescar lista de usuarios
  };

  // Función para cambiar el rol de un usuario
  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: newRole });
    fetchUsers(); // Refrescar lista de usuarios
  };

  // Función para eliminar un usuario
  const deleteUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    fetchUsers(); // Refrescar lista de usuarios
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editUserId === user.id ? (
                <>
                  <td>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={updateUserEmail}>Guardar</button>
                    <button onClick={() => setEditUserId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => startEdit(user)}>Editar</button>
                    <button onClick={() => toggleRole(user.id, user.role)}>
                      Cambiar a {user.role === 'admin' ? 'User' : 'Admin'}
                    </button>
                    <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
