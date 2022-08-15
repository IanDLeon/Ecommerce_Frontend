import React, { createContext, useEffect, useState } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user.isLoggedIn) {
      setUser({
        isLoggedIn: true,
        ...JSON.parse(localStorage.getItem("user")),
      }); 
    }
  }, [user.isLoggedIn])

  const logout = () => {
    localStorage.clear();
    setUser({
      isLoggedIn: false,
    })
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
