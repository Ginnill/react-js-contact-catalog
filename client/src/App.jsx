import { useState } from "react";
// routes
import Routes from "./routes";

// Header and Footer
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
