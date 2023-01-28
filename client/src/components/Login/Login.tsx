import React, {SyntheticEvent, useState} from 'react';
import './styles.loginModule.css'
import {useNavigate} from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Podaj adres e-mail i hasło.');
    } else {
      setError('');
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwt', data.access_token);
        localStorage.setItem('userId', data.userId);
        setSuccessMessage('Zalogowano pomyślnie.');
        setTimeout(()=> navigate('/'), 1000 );
      } else {
        const error = await response.json();
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logowanie</h2>
      <label>
        Adres e-mail:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </label>
      <label>
        Hasło:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Zaloguj się</button>
      <p className={'new_account'}>Nie masz konta? <a className={'register_href'} onClick={() => navigate('/registration')}>Zarejestruj się</a></p>
    </form>
  );
}

export default LoginForm;
