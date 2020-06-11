import React, { FC, useState, useEffect } from "react";
import UserContext, { IUser, initialUser } from "./context";

interface IProps {}

const UserContextProvider: FC<IProps> = (props) => {
  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkForUser();
  }, []);

  // NEWUSER
  const registerUser = async (newUser: Object) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newUser),
    };

    setLoading(true);
    const res = await fetch("http://localhost:3002/api/newuser", options);
    const data = await res.json();
    setLoading(false);

    if (data.status === "Authenticated") {
      setUser(data.user);
      setIsAuthenticated(true);
    } else if (data.status === "E-mail already taken") {
      alert("Account already exists");
    }
  };

  //UPDATE
  const updateUser = (key: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //LOGIN
  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3002/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.user) {
      setUser(data.user[0]);
      setIsAuthenticated(true);
    }
    //Tar med password i objectet user, behöver ses över

    return data.message;
  };

  const logout = async () => {
    fetch("http://localhost:3002/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(initialUser);
    setIsAuthenticated(false);
    window.location.reload();
  };

  const checkForUser = async () => {
    const res = await fetch("http://localhost:3002/api/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    if (data.message === "Auth successful") {
      setUser(data.user);
      setIsAuthenticated(true);
    }
  };
  return (
    <UserContext.Provider
      {...props}
      value={{
        user,
        setUser,
        isAuthenticated,
        updateUser,
        login,
        logout,
        registerUser,
      }}
    />
  );
};

export default UserContextProvider;
