import { AuthProvider } from "context/AuthProvider/index.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "shared/components/GlobalStyle";
import { ProtectedLayout } from "shared/components/ProtectedLayout";
import routes from "./routes";
import Cadastro from "./pages/Signup";
import Login from "./pages/Login";
import ContainerApp from "shared/components/ContainerApp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<ContainerApp />}>
            {routes.map((route, i) => {
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={<ProtectedLayout>{route.component}</ProtectedLayout>}
                />
              );
            })}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
