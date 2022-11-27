import { AuthProvider } from "context/AuthProvider/index.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "shared/components/GlobalStyle";
import { ProtectedLayout } from "shared/components/ProtectedLayout";
import HomeRoute from "./routes";
import Cadastro from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ContainerApp from "shared/components/ContainerApp";
import { siteContext } from "context/HomeContext/siteContext";
import {useState} from "react";


function App() {
  const [categoria, setCategoria] = useState("")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [id, setId] = useState("")
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <siteContext.Provider value = {{ categoria, setCategoria , page, setPage, search, setSearch, id, setId} }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        </siteContext.Provider>

      </Router>
    </AuthProvider>
  );
}

export default App;
