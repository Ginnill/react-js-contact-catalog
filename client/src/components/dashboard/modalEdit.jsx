import { ModalContainer, ModalCard, ModalClose } from "../../styles";
import { FormCard } from "../../styles";

import Axios from "axios";

import { useState, useEffect } from "react";

const ModalEdit = () => {
  const [edit, setEdit] = useState();

  //
  const hideModal = () => {
    let modal = document.querySelector("#edit.modal");
    if (modal.classList.contains("show")) {
      modal.classList.add("hidden");
      modal.classList.remove("show");
      updateGrid();
    }
  };

  const updateGrid = () => {
    if (localStorage.getItem("update")) {
      localStorage.setItem("update", "");
      location.reload();
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

  // get contact values
  const [values, setValues] = useState();
  const [image, setImage] = useState({ name: "" });

  useEffect(() => {
    Axios.get("http://localhost:3001/contacts").then((response) => {
      setValues(response.data);
    });
  }, []);

  const blockInputs = () => {
    document.querySelectorAll("#edit.modal .input-text").forEach((el) => {
      if (el.getAttribute("type") !== "file") {
        el.setAttribute("readonly", "readonly");
        el.style.cssText = `
          background: #c9c9c9;
          cursor: pointer;
        `;

        el.ondblclick = (e) => {
          e.target.removeAttribute("readonly");
          e.target.style.cssText = `
          background: white;
          cursor: text;
        `;
        };
      }
    });
  };

  const setEditModal = () => {
    document.onclick = (el) => {
      if (el.target.getAttribute("data-modal") == "edit") {
        let card = el.target.parentNode.parentNode;
        let id = card.id;
        let { 0: image } = card.childNodes;
        let { 0: title, 1: email, 2: phone } = card.childNodes[1].childNodes;
        let modal = document.querySelector("#edit.modal");
        if (modal.classList.contains("show")) {
          values.map((value) => {
            if (
              value.name == title.innerText &&
              value.email == email.innerText &&
              value.phone == phone.innerText
            ) {
              let {
                1: name,
                2: email,
                3: phone,
              } = modal.querySelectorAll(".input-text");

              name.value = value.name;
              email.value = value.email;
              phone.value = value.phone;

              setEdit({
                edit_name: value.name,
                edit_email: value.email,
                edit_phone: value.phone,
                id: id,
              });
              setImage({
                name: value.image,
              });
            }
          });
          blockInputs();
        }
      }
    };
  };
  setEditModal();

  // input mask

  function mascaraFone(e) {
    var valor =
      document.getElementById("edit_phone").attributes[0].ownerElement["value"];
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
    document.getElementById("edit_phone").attributes[0].ownerElement["value"] =
      retorno;
  }
  // end input mask

  // get input values

  const handleChange = (value) => {
    setEdit((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  // get file value

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

  // edit Contact

  const editContact = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/edit", {
      name: edit.edit_name,
      email: edit.edit_email,
      phone: edit.edit_phone,
      image: image.name.includes("src/uploads/")
        ? image.name
        : "src/uploads/" + image.name,
      id: edit.id,
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

  const deleteUser = () => {
    if (confirm("Deseja deletar este contato?") == true) {
      Axios.post("http://localhost:3001/delete", {
        id: edit.id,
      }).then((response) => {
        if (response.data.msg) {
          alert(response.data.msg);
          location.reload();
        }
      });
    }
  };
  return (
    <ModalContainer
      onClick={hideModalClickOut}
      id="edit"
      className="modal hidden"
    >
      <ModalCard className="modal-card">
        <ModalClose onClick={hideModal}>X</ModalClose>

        <FormCard method="post" onSubmit={editContact}>
          <div className="form-head">
            <h1 className="title">Editar Contato</h1>
          </div>

          <div className="form-body">
            <div className="input-box">
              <label htmlFor="edit_file">Imagem</label>
              <input
                onChange={getFileValue}
                className="input-text"
                type="file"
                name="edit_file"
                id="edit_file"
              />
            </div>

            <p style={{ marginBottom: "50px" }} className="text">
              Clique duas vezes para editar
            </p>

            <div className="input-box">
              <label htmlFor="edit_name">Nome</label>
              <input
                onChange={handleChange}
                className="input-text"
                type="text"
                name="edit_name"
                id="edit_name"
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="edit_email">Email</label>
              <input
                onChange={handleChange}
                className="input-text"
                type="email"
                name="edit_email"
                id="edit_email"
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="edit_phone">Telefone</label>
              <input
                onChange={handleChange}
                className="input-text"
                onKeyUp={mascaraFone}
                type="text"
                name="edit_phone"
                id="edit_phone"
                required
              />
            </div>

            <div className="button-box">
              <input
                className="button"
                type="submit"
                id="edit"
                name="edit"
                value="Salvar"
              />
              <input
                onClick={deleteUser}
                className="delete"
                type="button"
                id="delete"
                name="delete"
                value="Excluir"
              />
            </div>
          </div>
        </FormCard>
      </ModalCard>
    </ModalContainer>
  );
};

export default ModalEdit;
