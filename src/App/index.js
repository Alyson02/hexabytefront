import { AuthProvider } from "context/AuthProvider/index.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "shared/components/GlobalStyle";
import { ProtectedLayout } from "shared/components/ProtectedLayout";
import Cadastro from "./pages/Signup";
import Login from "./pages/Login";
import ContainerApp from "shared/components/ContainerApp";
import { siteContext } from "context/HomeContext/siteContext";
import { useState } from "react";
import routes from "./routes";

function App() {
  const [categoria, setCategoria] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  return (
    <AuthProvider>
      <siteContext.Provider
        value={{
          categoria,
          setCategoria,
          page,
          setPage,
          search,
          setSearch,
          id,
          setId,
        }}
      >
        <Router>
          <GlobalStyle />

          <Routes>
            <Route path="/" element={<ContainerApp />}>
              {routes.map((route, i) => {
                return (
                  <Route
                    key={i}
                    path={route.path}
                    element={
                      <ProtectedLayout>{route.component}</ProtectedLayout>
                    }
                  />
                );
              })}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </Router>
      </siteContext.Provider>
    </AuthProvider>
  );
}

export default App;
