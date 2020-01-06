import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const [userEmail, SetUserEmail] = useState('');
  const [userName, SetUserName] = useState('');
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [carColor, SetCarColor] = useState('');
  const [carMake, SetCarMake] = useState('');
  const [carModel, SetCarModel] = useState('');

  return (
    <UserContext.Provider value={{
      userEmail, SetUserEmail,
      userName, SetUserName,
      isLoggedIn, SetIsLoggedIn,
      carColor, SetCarColor,
      carMake, SetCarMake,
      carModel, SetCarModel,
    }}
    >
      {props.children}
    </UserContext.Provider>
  );
}