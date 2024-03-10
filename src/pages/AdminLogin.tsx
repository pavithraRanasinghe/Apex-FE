import { Button, FloatingLabel, Form } from "react-bootstrap";
import "./css/Login.css";
import { FC, useEffect, useState } from "react";
import { request } from "../common/APIManager";
import * as Constants from "../common/Constants";
import { IUser } from "../interfaces/User";
import { getUserStorage, removeUser, setUserStorage } from "../common/PersistanceManager";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("" as string);
  const [password, setPassword] = useState("" as string);

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [user, setUser] = useState({} as IUser);

  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  
  useEffect(()=>{
    const user: IUser = getUserStorage();
    if(user){
      removeUser(user)
    }
    const queryParam = new URLSearchParams(location.search);
    const expire = queryParam.get("expire");
    if (expire) {
      toast.error("Session Expired");
    }
  }, []);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (email.trim() === "") {
      setIsUsernameValid(false);
      return;
    } else {
      setIsUsernameValid(true);
    }
    if (password.trim() === "") {
      setIsPasswordValid(false);
      return;
    } else {
      setIsPasswordValid(true);
    }
    login();
  };

  const login = () => {
    const url = "/api/auth/admin/login";
    const body = JSON.stringify({
      email: email,
      password: password,
      role: 'ADMIN'
    });
    request(url, Constants.POST, body)
      .then((response: any) => {
        setUser(response.data.user)
        if (user.email !== null && user.id !== 0) {
          setUserStorage(response.data.user as IUser);
          clearField();
          navigate("/admindashboard", { replace: true });
        } else {
          console.log("Doesn't match Credential")
        }
      })
      .catch((error) => {
        toast.error("Login Failed");
      })
  };

  const clearField = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="login-container">

        <h2 className="welcome">WELCOME BACK ADMIN</h2>
        <Form className="m-3">
          <FloatingLabel
            controlId="email"
            label="Email"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {!isUsernameValid && (
              <p className="invalidText">Email cann't be empty</p>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label="Password"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {!isPasswordValid && (
              <p className="invalidText">Password cann't be empty</p>
            )}
          </FloatingLabel>

          <div className="btn-wrapper">
            <Button
              type="button"
              className="mt-3 login-button"
              onClick={handleLogin}
            >
              LOG IN
            </Button>
          </div>
          <p className="registerLink">
            Didn't have an account?
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              {" "}
              Register
            </Link>
          </p>
        </Form>
      </div>
      <ToastContainer />
      {/* {isLoading && <Loader />} */}
    </div>
  );
};

export default AdminLogin;
