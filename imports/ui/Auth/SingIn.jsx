import React, { useState, Fragment } from 'react';

import { Meteor } from 'meteor/meteor';

import {
  useNavigate,
  useLocation,
  Link
} from "react-router-dom";


export const SingIn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [ username, setUsername ] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, () => {
      navigate(state?.path || "/");
    });

  };

  return (
    <Fragment>
      <h1>Bem vindo ao To Do List!</h1>

      <form onSubmit={submit} className="login-form">
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <Link to="/singup"> Cadastrar </Link>
    </Fragment>
  );
};