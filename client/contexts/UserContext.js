import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUserInfo] = useState({
    id: null,
    isLoggedIn: false,
    name: null,
    phone: null,
    car: {
      car_make: '',
      car_model: '',
      car_color: '',
    }
  });

  //custom update function
  const updateUser = (newUser) => {
    setUserInfo({
      ...user,
      ...newUser
    });
  }

  return (
    <UserContext.Provider value={{
      user, updateUser
    }}
    >
      {props.children}
    </UserContext.Provider>
  );
}