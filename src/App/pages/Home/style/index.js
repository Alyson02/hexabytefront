import styled from "styled-components";

export const HistoryWrapper = styled.div`
  background-color: white;
  background: #ffffff;
  border-radius: 5px;
  padding: 18px;
  position: relative;
  height: calc(100% - (152px));
  z-index: 10000;
  padding-bottom: 45px;
`;

export const Button = styled.div`
  background: #a328d6;
  border-radius: 5px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 9px;
`;

export const ButtonWrapper = styled.div`
  padding-top: 12px;
  display: flex;
  width: 100%;
  gap: 15px;
  justify-content: space-between;
  height: 127px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 26px;
`;

export const P = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #ffffff;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TextNoRegisters = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #868686;
  width: 180px;
`;

export const TextNoRegistersWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const History = styled.ul`
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  padding-bottom: 10px;
`;

export const MovementWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-bottom: 10px;
`;

export const Movement = styled.p`
  color: ${(props) =>
    props.textColor !== undefined ? props.textColor : "#000"};
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: inline;
`;

export const DateAndDescription = styled.div`
  display: flex;
  gap: 8px;
`;

export const BalanceWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 0 0 5px 5px;
  padding: 0 18px 18px 18px;
`;

export const Balance = styled.h1`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #000000;
`;

export const Total = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: ${(props) => (props.value > 0 ? "#03AC00" : "#C70000")};
`;
