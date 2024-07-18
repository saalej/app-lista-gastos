import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/configFirebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthStore = React.createContext();

const useAuth = () => {
  return useContext(AuthStore);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  // Creamos un state para saber cuando termina de
  // cargar la comprobación de onAuthStateChanged
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Comprobamos si hay un usuario
    const calcelSubscription = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return calcelSubscription;
  }, []);

  return (
    <AuthStore.Provider value={{ user: user }}>
      {/* Solamente se retornan los elementos hijos cuando no este cargando
          Así, puedo asegurarme que no se cargue el resto de la app hasta
          que el usuario haya sido establecido.
          
          Si no se hace esto al refrescar la página, el contenido children
          intenta cargar de manera inmediata, antes de comprobar que existe
          el usuario. */}
      {!loading && children}
    </AuthStore.Provider>
  );
};

export { AuthProvider, AuthStore, useAuth };
