import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Constants from "../common/Constants";
import "./css/Register.css";
import { request } from "../utils/APIManager";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  //Validation
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPassworValid] = useState(true);
  const [isPasswordLengthValid, setIsPassworLengthValid] = useState(true);
  const [isRePasswordValid, setIsRePassworValid] = useState(true);

  const handleFirstNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    if (password.length < 7) {
      setIsPassworLengthValid(false);
    } else {
      setIsPassworLengthValid(true);
    }
  };

  const handleRepasswordChange = (event: any) => {
    setRepassword(event.target.value);
  };

  const handleRegister = () => {
    if (name.trim() === "") {
      setIsNameValid(false);
      return;
    } else {
      setIsNameValid(true);
    }
    if (address.trim() === "") {
      setIsAddressValid(false);
      return;
    } else {
      setIsAddressValid(true);
    }
    if (email.trim() === "" || !Constants.EMAIL_REGEX.test(email)) {
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }
    if (password.trim() === "") {
      setIsPassworValid(false);
      return;
    } else {
      setIsPassworValid(true);
    }
    if (repassword.trim() === "") {
      setIsRePassworValid(false);
      return;
    } else {
      setIsRePassworValid(true);
    }
    if (password !== repassword) {
      toast.error("Password doesn't match");
      return;
    }
    register();
  };

  const register = () => {
    const url = "/api/user";
    const body = JSON.stringify({
      name: name,
      address: address,
      email: email,
      password: password,
      passwordConfirm: repassword,
    });
    setLoading(true);
    console.log(body);
    request(url, Constants.POST, body)
      .then((response) => {
        clearField();
        navigate("/login", { state: response });
      })
      .catch((error) => {
        console.log("ERROR : ", error);
        toast.error("Registration not complete");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearField = () => {
    setName("");
    setAddress("");
    setEmail("");
    setPassword("");
    setRepassword("");
  };

  return (
    <div>
      <div className="register-container">
        <h2 className="welcome">Register New Account</h2>

        <Form className="m-3">
          <FloatingLabel
            controlId="name"
            label="Name"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleFirstNameChange}
            />
            {!isNameValid && (
              <p className="invalidText">Name cann't be empty</p>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId="address"
            label="Address"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={handleAddressChange}
            />
            {!isAddressValid && (
              <p className="invalidText">Last Name cann't be empty</p>
            )}
          </FloatingLabel>
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
            {!isEmailValid && (
              <p className="invalidText">Please enter valid email</p>
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
            {!isPasswordLengthValid && (
              <p className="invalidText">
                Password must has least 8 characters
              </p>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId="rePassword"
            label="Re-Enter Password"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="password"
              placeholder="Re-Enter Password"
              value={repassword}
              onChange={handleRepasswordChange}
            />
            {!isRePasswordValid && (
              <p className="invalidText">Password should be verified</p>
            )}
          </FloatingLabel>

          <div className="wrapper">
            <Button className="register-button" onClick={handleRegister}>
              REGISTER
            </Button>
          </div>
          <p className="registerLink">
            Did you have an account?
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              {" "}
              Log In
            </Link>
          </p>
        </Form>
      </div>
      <ToastContainer />
      {/*{isLoading && <Loader />} */}
    </div>
  );
};

export default Register;
