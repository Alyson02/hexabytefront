import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

export default function Produto({ produto, remove }) {
  return (
    <Container>
      <ItemLeft>
        <Image src={produto.imagem} />
        <h1>{produto.titulo}</h1>
      </ItemLeft>
      <ItemRight>
        <h1>R$ {produto.valor}</h1>
        <FaTrash
          onClick={() => remove(produto._id)}
          size={"1.2rem"}
          color={"red"}
        />
      </ItemRight>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: gray solid 2px;
  gap: 20px;
  padding-bottom: 20px;
  justify-content: space-between;

  @media (max-width: 425px) {
    flex-direction: column;
    height: auto;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100%;
  object-fit: cover;
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 100%;
`;

const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
