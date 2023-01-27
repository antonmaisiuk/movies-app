import React, { useState } from 'react';
import './styles.registerModule.css'

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(formData);
    // tutaj można dodać kod, który przesyła dane formularza do serwera
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rejestracja</h2>
      <label>
        Nazwa użytkownika:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Adres e-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Hasło:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Potwierdź hasło:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <br />
      <input type="submit" value="Zarejestruj" />
    </form>
  );
}

export default RegisterForm;