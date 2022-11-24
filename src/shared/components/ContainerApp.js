import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function ContainerApp() {
  return (
    <DivApp>
      <Outlet />
    </DivApp>
  );
}

const DivApp = styled.div`
  padding: 25px;
  height: 100vh;
`;
