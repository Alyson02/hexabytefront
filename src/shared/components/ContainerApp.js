import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Api } from "services/api";
import styled from "styled-components";
import Header from "./Header/Header";

export default function ContainerApp() {
  const [itensCart, setItensCart] = useState(0);

  useEffect(() => {
    Api.get("/cart/product").then((r) => {
      if (r.data instanceof Array) setItensCart(r.data.length);
    });
  }, []);

  return (
    <>
      <Header itensCart={itensCart} />
      <DivApp>
        <Outlet context={{ itensCart, setItensCart }} />
      </DivApp>
    </>
  );
}

const DivApp = styled.div`
  padding: 25px;
  min-height: 100vh;
`;
