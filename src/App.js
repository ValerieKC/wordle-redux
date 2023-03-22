import {createGlobalStyle} from "styled-components";
import {Reset} from "styled-reset";
import { Game } from "./features/game/Game";

const GlobalStyled = createGlobalStyle`
*{
  box-sizing:border-box;
};

html,body{
  margin:0;
  padding:0;
  background-color: black;
  font-family: 'Roboto', sans-serif;;
}

#root{
  min-height: 100vh;
}

`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyled />
      <Game />
    </>
  );
}

export default App;
