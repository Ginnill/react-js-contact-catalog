import { ModalContainer, ModalCard, ModalClose } from "../../styles";
import { FormCard } from "../../styles";

import Axios from "axios";

import { useState } from "react";

const ModalCreate = () => {
  // input mask
  function mascaraFone(e) {
    var valor =
      document.getElementById("create_phone").attributes[0].ownerElement[
        "value"
      ];
    var retorno = valor.replace(/\D/g, "");
    retorno = retorno.replace(/^0/, "");
    if (retorno.length > 10) {
      retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (retorno.length > 5) {
      if (retorno.length == 6 && e.code == "Backspace") {
        // necessário pois senão o "-" fica sempre voltando ao dar backspace
        return;
      }
      retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (retorno.length > 2) {
      retorno = retorno.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      if (retorno.length != 0) {
        retorno = retorno.replace(/^(\d*)/, "($1");
      }
    }
    document.getElementById("create_phone").attributes[0].ownerElement[
      "value"
    ] = retorno;
  }
  // end input mask
  //
  const hideModal = () => {
    let modal = document.querySelector("#create.modal");
    if (modal.classList.contains("show")) {
      modal.classList.add("hidden");
      modal.classList.remove("show");
      updateGrid();
    }
  };

  const hideModalClickOut = (e) => {
    if (e.target.classList.contains("modal")) {
      e.currentTarget.classList.add("hidden");
      e.currentTarget.classList.remove("show");
      updateGrid();
    }
  };
  //

  // get input values
  const [create, setCreate] = useState();

  const handleChange = (value) => {
    setCreate((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  // get file value
  const [image, setImage] = useState();

  const getFileValue = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };
  const uploadFile = (event) => {
    const data = new FormData();
    data.append("file", image);
    Axios.post("http://localhost:3001/upload", data).then((res) => {
      // then print response status
      console.log(res.statusText);
    });
  };

  // create contact

  //
  const showModal = (e) => {
    let modal = document.querySelectorAll(`.modal`);
    modal.forEach((SetModal) => {
      if (
        SetModal.classList.contains("hidden") &&
        e.currentTarget.getAttribute("data-modal") == SetModal.id
      ) {
        SetModal.classList.add("show");
        SetModal.classList.remove("hidden");
      }
    });
  };
  //
  const updateGrid = () => {
    if (localStorage.getItem("update")) {
      localStorage.setItem("update", "");
      location.reload();
    }
  };

  const createContact = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create", {
      name: create.create_name,
      email: create.create_email,
      phone: create.create_phone,
      image: image.name,
    }).then((response) => {
      if (response.data.msg) {
        uploadFile();
        alert(response.data.msg);
        localStorage.setItem("update", "update");
      }
      if (response.data.error) {
        alert(response.data.error);
      }
    });
  };
  return (
    <ModalContainer
      onClick={hideModalClickOut}
      id="create"
      className="modal hidden"
    >
      <ModalCard className="modal-card">
        <ModalClose onClick={hideModal}>X</ModalClose>

        <FormCard
          method="post"
          encType="multipart/form-data"
          onSubmit={createContact}
        >
          <div className="form-head">
            <h1 className="title">Criar Contato</h1>
          </div>

          <div className="form-body">
            <div className="input-box">
              <label htmlFor="create_file">Imagem</label>
              <input
                onChange={getFileValue}
                className="input-text"
                type="file"
                accept=".png, .jpg, .webp, .jpeg"
                name="create_file"
                id="create_file"
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="create_name">Nome</label>
              <input
                onChange={handleChange}
                className="input-text"
                type="text"
                name="create_name"
                id="create_name"
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="create_email">Email</label>
              <input
                onChange={handleChange}
                className="input-text"
                type="email"
                name="create_email"
                id="create_email"
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="create_phone">Telefone</label>
              <input
                onChange={handleChange}
                onKeyUp={mascaraFone}
                className="input-text"
                type="text"
                name="create_phone"
                id="create_phone"
                required
              />
            </div>

            <div className="button-box">
              <input
                className="button"
                type="submit"
                id="create"
                name="create"
                value="Salvar"
              />
              <input
                className="reset"
                type="reset"
                id="reset"
                name="reset"
                value="Limpar"
              />
            </div>
          </div>
        </FormCard>
      </ModalCard>
    </ModalContainer>
  );
};

export default ModalCreate;
