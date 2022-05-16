import { FormCard } from "../styles";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import Axios from "axios";

const Login = () => {
  const [values, setValues] = useState();
  const navigate = useNavigate();

  // reset storage
  const resetStorage = () => localStorage.setItem("login", "");
  resetStorage();
  
  // get input value
  const handleChange = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  // send values to url selected on click
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: values.login_email,
      password: values.login_password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.msg) {
          alert(response.data.msg);
          // creating cache to login
          localStorage.setItem("login", values.login_email);
          if (localStorage.getItem("login") == values.login_email) {
            // navigate to dashboard
            navigate("/dashboard");
          }
        } else alert(response.data.error);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="center">
      <div className="upon-form">
        <p>
          Cadastre-se agora! <Link to="/register">Clique Aqui</Link>
        </p>
      </div>
      <FormCard onSubmit={handleSubmit}>
        <div className="form-head">
          <h1 className="title">Login</h1>
          <p className="text">Faça o login para acessar sua conta</p>
        </div>

        <div className="form-body">
          <div className="input-box">
            <label htmlFor="login_email">Email</label>
            <input
              onChange={handleChange}
              className="input-text"
              type="email"
              name="login_email"
              id="login_email"
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="login_password">Senha</label>
            <input
              onChange={handleChange}
              className="input-text"
              type="password"
              min-length="8"
              name="login_password"
              id="login_password"
              required
            />
          </div>

          <div className="button-box">
            <input
              className="button"
              type="submit"
              id="login"
              name="login"
              value="Entrar"
            />
          </div>
        </div>
      </FormCard>
    </section>
  );
};

export default Login;
