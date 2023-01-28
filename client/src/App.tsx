import React from "react";

// Routing
// @ts-ignore
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Styles
import { GlobalStyle } from "./styles/global/GlobalStyle";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Account from "./components/Account/Account";
import {useHomeFetch} from "./hooks/useHomeFetch";

const App: React.FC = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();

  const userId = localStorage.getItem('userId') || '';
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:movieId" element={<Movie />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account movies={state.results} userId={userId} />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <GlobalStyle />
      </Router>
    </React.Fragment>
  );
};

export default App;
