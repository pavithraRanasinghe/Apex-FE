import { Button, FloatingLabel, Form } from "react-bootstrap";
import "./css/Login.css";
import { useState } from "react";
import { request } from "../utils/APIManager";
import * as Constants from "../common/Constants";
import { IUser } from "../interfaces/User";
import { setUserStorage } from "../common/PersistanceManager";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("" as string);
  const [password, setPassword] = useState("" as string);

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [user, setUser] = useState({} as IUser);

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
    const url = "/api/auth/login";
    const body = JSON.stringify({
      email: email,
      password: password,
    });
    request(url, Constants.POST, body)
      .then((response: any) => {
        setUser(response.data.user);
        if (user.email !== null && user.id !== 0) {
          setUserStorage(user);
          clearField();
          navigate("/dashboard", { replace: true });
        } else {
          console.log("Doesn't match Credential")
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  };

  const clearField = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="login-container">

        <h2 className="welcome">WELCOME BACK</h2>
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
          </p>
        </Form>
      </div>
      {/* <ToastContainer />
      {isLoading && <Loader />} */}
    </div>
  );
};

export default Login;
