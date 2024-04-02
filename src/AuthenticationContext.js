import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthenticaticationContext = createContext({
  user: null,
  profile: null,
  profileNotify: null,
  token: null,
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
    firstName: '', lastName: '', email: ''
  });
  const [profileNotify, setProfileNotify] = useState({fda: false, usda: false})
  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/api/users/me",
          config
        );
        const data = response.data;
        const { firstName, lastName, email, notifications } = data
        setProfile({firstName, lastName, email});
        setProfileNotify(notifications)
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };

    !!token && getProfile();

    return () => {
      //second
    };
  }, [token]);

  const register = async (firstName, lastName, email, password1, password2) => {
    const config = { firstName, lastName, email, password1, password2 };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users`,
        config
      );
      const data = await response.data;
      const { email, token } = data;
      setUser({ email, token });
      setToken(token);
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem(
        "user",
        JSON.stringify({ email, token })
      );
      navigate('/')
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const login = async (email, password) => {
    const formData = { email, password };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/login`,
        formData
      );
      const data = await response.data;
      const { email, token } = data;
      setUser({ email, token });
      setToken(token);
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem(
        "user",
        JSON.stringify({ email, token })
      );
      navigate('/')
    } catch (error) {
      console.log(error.response.data.msg);
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
    console.log(email);
    const formData = {email}
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/requestResetPassword`,
        formData
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (userId, token, password) => {
    const formData = {userId, token, password}
    try {
        const response = await axios.post(
            `http://localhost:8000/api/users/resetPassword`,
            formData
          );
          const data = await response.data;
          console.log(data);
          navigate('/')
    } catch (error) {
        console.log(error)
    }
  };

  const newPassword = async (oldPass, newPass, confirmPass) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = {
        oldPassword: oldPass,
        newPassword: newPass,
        confirmPassword: confirmPass,
      };
      const response = await axios.put(
        `http://localhost:8000/api/users/newPassword`,
        formData,
        config
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const changeNotifications = async (fda, usda) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = { notifications: { fda, usda } };
    setProfileNotify(prevState => ({
        ...prevState, fda, usda
    }))
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/notifications`,
        formData,
        config
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDetails = async(firstName, lastName) => {
    const formData = { firstName, lastName}
    setProfile(prevState => ({
        ...prevState, firstName, lastName
    }))
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.put(
          `http://localhost:8000/api/users/updateDetails`,
          formData,
          config
        );
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
  }

  const contextValue = {
    user: user,
    profile: profile,
    profileNotify,
    token: token,
    register,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    newPassword,
    changeNotifications,
    updateDetails
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
