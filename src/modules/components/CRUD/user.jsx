import './user.css';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/Firebase.config.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  const [editUserId, setEditUserId] = useState(null);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  const addUser = async () => {
    if (!newEmail || !newPassword || !newRole) {
      alert('Por favor, completa todos los campos');
      return;
    }
    await addDoc(collection(db, "users"), {
      email: newEmail,
      password: newPassword,
      role: newRole,
    });
    setNewEmail('');
    setNewPassword('');
    setNewRole('');
    fetchUsers(); 
  };

  const startEdit = (user) => {
    setEditUserId(user.id);
    setNewEmail(user.email);
    setNewPassword('');
    setNewRole(user.role);
  };

  const updateUser = async () => {
    const userRef = doc(db, "users", editUserId);
    await updateDoc(userRef, {
      email: newEmail,
      role: newRole,
    });
    setEditUserId(null);
    setNewEmail('');
    setNewPassword('');
    setNewRole('');
    fetchUsers();
  };

  const deleteUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    fetchUsers(); 
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

      <div className="form-container">
        <h3>Ingresar Usuario</h3>
        <input
          type="email"
          className="email-input"
          placeholder="Email del usuario"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          className="password-input"
          placeholder="Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
