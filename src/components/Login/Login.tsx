import React, { SyntheticEvent, useState } from 'react';

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
        const response = await fetch('http://localhost:3000/login', {
          method: 'Post',
          // headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          //pomyślne logowanie
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