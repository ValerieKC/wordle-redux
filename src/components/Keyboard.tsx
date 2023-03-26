import styled from "styled-components";

const Wrapper = styled.div`
  margin: auto auto;
  width: 100%;
  height: fit-content;
`;
const Row = styled.div`
  width: 100%;
  margin: 0 auto 8px;
  display: flex;
  column-gap: 6px;
  touch-action: manipulation;
`;
const Btn = styled.div`
width:calc((100% - 54px)/10);
  height: 58px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #818384;
  font-size: 20px;
  font-weight: bold;
  color:white;
  cursor: pointer;
`;
const Space = styled.div`
  height: 58px;
  width: calc((100% - 54px) / 10 / 2);
`;

const SpecialBtn = styled(Btn)`
  width: calc((100% - 54px) / 10 * 2);
font-size: 12px;
`;


const firstRow = ["Q", "W", "E", "R","T", "Y", "U", "I", "O", "P"];
const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const thirdRow = [ "Z", "X", "C", "V", "B", "N", "M"];

export default function Keyboard() {
  return (
    <Wrapper>
      <Row>
        {firstRow.map((item) => (
          <Btn key={item}>{item}</Btn>
        ))}
      </Row>
      <Row>
        <Space />
        {secondRow.map((item) => (
          <Btn key={item}>{item}</Btn>
        ))}
        <Space />
      </Row>
      <Row>
        <SpecialBtn>Enter</SpecialBtn>
        {thirdRow.map((item) => (
          <Btn key={item}>{item}</Btn>
        ))}
        <SpecialBtn>Delete</SpecialBtn>
      </Row>
    </Wrapper>
  );
}
