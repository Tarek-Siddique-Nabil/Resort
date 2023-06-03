import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const ContextApi = createContext();
const auth = getAuth(app);
export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userOrder, setUserOrder] = useState([]);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (body) => {
    const { email, password } = body;

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential?.user;
        setUser(user);
        if (user?.email) {
          localStorage.setItem("email", user?.email);
        }
        toast.success("User Login Successful", {
          position: "top-center",
          duration: 1500,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    setLoading(false);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  // why are we doing this?
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // get all service
  useEffect(() => {
    setLoading(true);
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/resort`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  // user order
  useEffect(() => {
    setLoading(true);
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/order/${
      user?.email || localStorage?.getItem("email")
    }`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUserOrder(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const orderPost = async (body) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/order`;
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = response?.data;
      setLoading(false);
      if (json) {
        toast.success("Your Request Send Successfully", {
          position: "top-center",
        });
      }
      setUserOrder([...userOrder, json]);
    } catch (err) {
      toast.error(`Something error`, {
        position: "top-center",
      });
    }
  };
  return (
    <ContextApi.Provider
      value={{
        user,
        services,
        loading,
        userOrder,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        orderPost,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};
export default ContextProvider;
