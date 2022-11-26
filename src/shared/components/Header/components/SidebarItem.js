import React from "react";
import styled from "styled-components";

const SidebarItem = ({ Icon, Text }) => {
  return (
    <Container>
      <Icon />
      {Text}
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #0044c2;
  font-size: 20px;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;
  > svg {
    margin: 0 20px;
  }
`;

export default SidebarItem;
