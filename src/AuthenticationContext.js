import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticaticationContext = createContext({
  user: null,
  profile: null,
  profileNotify: null,
  token: null,
  message: '',
  reset: () => {},
  register: () => {},
  login: () => {},
  logout: () => {},
  requestPasswordReset: () => {},
  resetPassword: () => {},
  newPassword: () => {},
  changeNotifications: () => {},
});

function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [profileNotify, setProfileNotify] = useState({
    fda: false,
    usda: false,
  });
  const [ message, setMessage] = useState('')
  const [ errorMsg, setErrorMsg ] = useState(false)
  const [ successMsg, setSuccessMsg ] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          "http://localhost:8000/api/users/me",
          config
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          const { firstName, lastName, email, notifications } = data;
          setProfile({ firstName, lastName, email });
          setProfileNotify(notifications);
        } else {
          console.log(data.msg)
        }
      } catch (error) {
        console.log(error);
      }
    };

    !!token && getProfile();

    return () => {
      //second
    };
  }, [token]);

  const register = async (firstName, lastName, email, password1, password2) => {
    const formData = { firstName, lastName, email, password1, password2 };
    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        const { email, token } = data;
        setUser({ email, token });
        setToken(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify({ email, token }));
        navigate("/");
      } else {
        if (response.status === 400) {
          setMessage(data.msg)
          setErrorMsg(true)
          throw new Error(data.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    const formData = { email, password };
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        const { email, token } = data;
        setUser({ email, token });
        setToken(token);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify({ email, token }));
        navigate("/");
      } else {
        if (response.status === 400) {          
          setMessage(data.msg)
          setErrorMsg(true)
          throw new Error(data.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    //navigate('/')
  };

  const requestPasswordReset = async (email) => {
    const formData = { email };
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/requestResetPassword`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
      } else {
        if (response.status === 400) throw new Error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (userId, token, password) => {
    const formData = { userId, token, password };
    try {
      const response = await fetch("http://localhost:8000/api/users/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
          console.log(data);
          navigate("/");
      } else {
        if (response.status === 400) throw new Error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newPassword = async (oldPass, newPass, confirmPass) => {
    try {
      const formData = {
        oldPassword: oldPass,
        newPassword: newPass,
        confirmPassword: confirmPass,
      };

      const response = await fetch("http://localhost:8000/api/users/newPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      if(response.ok) {
        console.log(data)
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeNotifications = async (fda, usda) => {
    const formData = { notifications: { fda, usda } };
    setProfileNotify((prevState) => ({
      ...prevState,
      fda,
      usda,
    }));
    try {

      const response = await fetch("http://localhost:8000/api/users/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      if(response.ok) {
        console.log(data)
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDetails = async (firstName, lastName) => {
    const formData = { firstName, lastName };
    setProfile((prevState) => ({
      ...prevState,
      firstName,
      lastName,
    }));

    try {
      const response = await fetch("http://localhost:8000/api/users/updateDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      if(response.ok) {
        console.log(data)
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setMessage('')
    setErrorMsg(false)
    setSuccessMsg(false)
  }

  const contextValue = {
    user: user,
    profile: profile,
    profileNotify,
    token: token,
    message: message,
    register,
    login,
    reset,
    logout,
    requestPasswordReset,
    resetPassword,
    newPassword,
    changeNotifications,
    updateDetails,
  };

  return (
    <AuthenticaticationContext.Provider value={contextValue}>
      {children}
    </AuthenticaticationContext.Provider>
  );
}

export default AuthenticationProvider;

export const useAuth = () => {
  return useContext(AuthenticaticationContext);
};
