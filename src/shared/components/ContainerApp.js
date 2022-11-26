import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header/Header";

export default function ContainerApp() {
  return (
    <>
      <Header />
      <DivApp>
        <Outlet />
      </DivApp>
    </>
  );
}

const DivApp = styled.div`
  padding: 25px;
  min-height: 100vh;
`;
