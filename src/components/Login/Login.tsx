import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // tutaj powinien znajdować się kod wysyłający dane logowania do serwera
    // i obsługujący odpowiedź

    if (!email || !password) {
      setError('Podaj adres e-mail i hasło.');
    } else {
      setError('');
      // Tutaj powinien znajdować się kod logujący użytkownika
    }
  };

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
      {error && <p>{error}</p>}
      <button type="submit">Zaloguj się</button>
    </form>
  );
}

export default LoginForm;