import React, {SyntheticEvent, useState} from 'react';
import './styles.registerModule.css'
import {useNavigate} from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.confirmPassword || !formData.password) {
      setError('Prosze wypełnić wszystkie pola!');
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Hasła nie są takie same');
      } else {
        setError('');
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username,
          }),
        });
        if (response.ok) {
          setSuccessMessage('Rejestracja przebiegła pomyślnie.');
          setTimeout(()=> navigate('/login'), 1000 );
        } else {
          const error = await response.json();
          setError(error.message);
        }
      }
    }
  };

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
      <label>
        Adres e-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Hasło:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Potwierdź hasło:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      {successMessage && <div>{successMessage}</div>}
      {error && <p className="error-message">{error}</p>}
      <input type="submit" value="Zarejestruj"/>
    </form>

  );
}

export default RegisterForm;
