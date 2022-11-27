import { useEffect, useState } from "react";
import { Api } from "services/api";
import Button from "shared/components/Button";
import H1 from "shared/components/H1";
import Loader from "shared/components/Loader";
import styled from "styled-components";
import Produto from "./components/Produto";

export default function Cart() {
  const [produtos, setProdutos] = useState(null);
  const [cleanup, setCleanup] = useState(false);

  useEffect(() => {
    Api.get("cart/product").then((r) => setProdutos(r.data));
  }, [cleanup]);

  function getTotal() {
    let total = 0;
    produtos.forEach((p) => (total += Number(p.valor)));
    return total;
  }

  async function remove(id) {
    const produtosRemovido = produtos.filter((p) => p._id != id);
    setProdutos(produtosRemovido);
    await Api.delete(`/cart/remove/${id}`);
    setCleanup(true);
  }

  return (
    <>
      {produtos === null ? (
        <Loader />
      ) : produtos.length === 0 ? (
        <H1>Nenhum item no carrinho</H1>
      ) : (
        <Container>
          <ContainerTotal>
            <H1>
              Total <ValorTotal>R$ {getTotal().toFixed(2)}</ValorTotal>
            </H1>
            <ButtonTotal w="300px">Finalizar Compra</ButtonTotal>
          </ContainerTotal>
          <ProdutoContainer>
            {produtos.map((p) => (
              <Produto produto={p} remove={remove} />
            ))}
          </ProdutoContainer>
        </Container>
      )}
    </>
  );
}

const ProdutoContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContainerTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 425px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ValorTotal = styled.span`
  color: green;
  font-family: Arial;
`;

const ButtonTotal = styled(Button)`
  @media (max-width: 425px) {
    width: 100%;
    font-size: 1rem;
  }
`;

const Container = styled.div`
  padding: 20px;
`;
