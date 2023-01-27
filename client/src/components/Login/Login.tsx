import React, { SyntheticEvent, useState } from 'react';
import './styles.loginModule.css'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // const handleSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();

    //Początek pobierania danych i logowania

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
          console.log(data);
          setSuccessMessage('Zalogowano pomyślnie.');
          //tutaj możesz zaimplementować zmianę stanu aplikacji np. przekierowanie do innej strony po zalogowaniu
        } else {
          const error = await response.json();
          //błąd logowania
          setError(error.message);
        }
      }
  };
  //};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logowanie</h2>
      <label>
        Adres e-mail:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Hasło:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {successMessage && <div>{successMessage}</div>}
      {error && <p>{error}</p>}
      <button type="submit">Zaloguj się</button>
    </form>
  );
}

export default LoginForm;
