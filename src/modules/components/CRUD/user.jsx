import './user.css';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/Firebase.config.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  const [editUserId, setEditUserId] = useState(null);

  // Función para cargar usuarios desde Firestore
  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  // Función para agregar un nuevo usuario
  const addUser = async () => {
    if (!newEmail || !newRole) {
      alert('Por favor, completa todos los campos');
      return;
    }
    await addDoc(collection(db, "users"), {
      email: newEmail,
      role: newRole,
    });
    setNewEmail('');
    setNewRole('');
    fetchUsers(); // Refrescar lista de usuarios
  };

  // Función para editar un usuario
  const startEdit = (user) => {
    setEditUserId(user.id);
    setNewEmail(user.email);
    setNewRole(user.role);
  };

  // Función para actualizar un usuario
  const updateUser = async () => {
    const userRef = doc(db, "users", editUserId);
    await updateDoc(userRef, {
      email: newEmail,
      role: newRole,
    });
    setEditUserId(null);
    setNewEmail('');
    setNewRole('');
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
                  <td>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                    >
                      <option value="">Seleccione rol</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={updateUser}>Guardar</button>
                    <button onClick={() => setEditUserId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => startEdit(user)}>Editar</button>
                    <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar nuevo usuario */}
      <div className="form-container">
        <h3>Ingresar Usuario</h3>
        <input
          type="email"
          className="email-input"
          placeholder="Email del usuario"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <div className="role-selector">
          <select
            className="role-select"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="">Seleccione rol</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button className="add-btn" onClick={addUser}>Agregar Usuario</button>
      </div>
    </div>
  );
};

export default UserManagement;
