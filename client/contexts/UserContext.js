import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUserInfo] = useState({
    userID: null,
    name: null,
    isLoggedIn: false,
    phone: null,
    car: {
      car_color: '',
      car_model: '',
      car_brand: '',
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