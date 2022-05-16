import { GridHeader, GridContainer, Card } from "../../styles";
import { useState, useEffect } from "react";

import Axios from "axios";

const Contact = () => {
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

  const [contact, setContact] = useState();

  
  useEffect(() => {
    Axios.get("http://localhost:3001/contacts").then((response) => {
      setContact(response.data);
    });
  }, []);

  return (
    <>
      <GridHeader>
        <h3>Lista de Contatos</h3>
        <button data-modal="create" onClick={showModal}>
          + Contato
        </button>
      </GridHeader>
      <GridContainer className="grid-container">
        {Array.isArray(contact)
          ? contact.map((values) => {
              return (
                <Card className="card-contato" key={values.id} id={values.id}>
                  <img
                    src={
                      !values.image
                        ? "https://via.placeholder.com/150"
                        : values.image
                    }
                    alt="Nome"
                  />
                  <div className="body">
                    <h3 className="title">{values.name}</h3>
                    <p className="email">{values.email}</p>
                    <p className="phone">{values.phone}</p>
                  </div>
                  <div className="footer">
                    <button data-modal="edit" onClick={showModal}>
                      Editar
                    </button>
                  </div>
                </Card>
              );
            })
          : null}
      </GridContainer>
    </>
  );
};

export default Contact;
