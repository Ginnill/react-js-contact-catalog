import { FormCard } from "../styles";
import { Link } from "react-router-dom";

import { useState } from "react";

import Axios from "axios";

const Register = () => {
  const [values, setValues] = useState();
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
    if (values.register_password == values.register_password_2) {
      Axios.post("http://localhost:3001/register", {
        name: values.register_name,
        email: values.register_email,
        password: values.register_password,
      })
        .then((response) => {
          console.log(response);
          if (response.data.msg) alert(response.data.msg);
          else alert(response.data.error);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("As senhas precisam ser iguais!");
    }
  };

  return (
    <section className="center">
      <div className="upon-form">
        <p>
          Já possui uma conta? <Link to="/">Clique Aqui</Link>
        </p>
      </div>
      <FormCard onSubmit={handleSubmit}>
        <div className="form-head">
          <h1 className="title">Cadastro</h1>
          <p className="text">Faça um cadastro para acessar a sua conta</p>
        </div>

        <div className="form-body">
          <div className="input-box">
            <label htmlFor="register_name">Nome</label>
            <input
              onChange={handleChange}
              className="input-text"
              type="text"
              name="register_name"
              id="register_name"
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="register_email">Email</label>
            <input
              onChange={handleChange}
              className="input-text"
              type="email"
              name="register_email"
              id="register_email"
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="register_password">Senha</label>
            <input
              onChange={handleChange}
              className="input-text"
              type="password"
              min-length="8"
              name="register_password"
              id="register_password"
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="register_password">Confirme sua Senha</label>
            <input
              onChange={handleChange}
              className="input-text"
              type="password"
              min-length="8"
              name="register_password_2"
              id="register_password_2"
              required
            />
          </div>

          <div className="button-box">
            <input
              className="button"
              type="submit"
              id="register"
              name="register"
              value="Cadastrar"
            />
          </div>
        </div>
      </FormCard>
    </section>
  );
};

export default Register;
