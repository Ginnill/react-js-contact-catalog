import D_Header from "../components/dashboard/header";
import Contact from "../components/dashboard/contact";
import ModalEdit from "../components/dashboard/modalEdit";
import ModalCreate from "../components/dashboard/modalCreate";

const Dashboard = () => {
  return (
    <>
      <D_Header />
      <section>
        <Contact />
      </section> 
      <ModalEdit />
      <ModalCreate />
    </>
  );
};

export default Dashboard;
