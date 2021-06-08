import React, { useContext, createContext, useState } from 'react';

const authUser = async ({ username, password }) => {
  const response = await fetch('../../login', {
    headers: {
      username,
      password,
    },
  });

  if (response.status === 200) {
    const userObj = await response.json();
    return userObj;
  } else {
    alert('os dados de login estão incorretos!');
    return false;
  }
};

const authService = {
  isAuthenticated() {
    const user = localStorage.getItem('user');
    return user ? user : false;
  },
  async signin({ username, password }) {
    const user = await authUser({ username, password });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return this.isAuthenticated();
    } else return false;
  },
  async signout() {
    localStorage.removeItem('user');
  },
};

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(authService.isAuthenticated() || null);

  const signin = async ({ username, password }) => {
    const authUser = await authService.signin({ username, password });
    if (authService.isAuthenticated()) setUser(authUser);
    else setUser(null);
    return authService.isAuthenticated();
  };

  const signout = async () => {
    await authService.signout();
  };

  return {
    user,
    signin,
    signout,
  };
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export { ProvideAuth, useAuth };
