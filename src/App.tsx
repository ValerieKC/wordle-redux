import React from "react";
import { useSelector } from "react-redux";
import {createGlobalStyle} from "styled-components";
import {Reset} from "styled-reset";
import { ThemeProvider } from "styled-components";
import { Game } from "./features/game/Game";
import {themeState} from "./features/theme/themeSlice"
import { darkTheme, lightTheme } from "./features/theme/theme"

 

const GlobalStyled = createGlobalStyle`
*{
  box-sizing:border-box;
};

html,body{
  margin:0;
  padding:0;
  background-color: ${(props) => props.theme.BODY_BACKGROUND_COLOR};
  font-family: 'Roboto', sans-serif;;
}

#root{
  min-height: 100vh;
}

`;

function App() {
  const themeMode=useSelector(themeState)
  return (
    <>
      <Reset />
      <ThemeProvider theme={themeMode ? darkTheme : lightTheme}>
        <GlobalStyled />
        <Game />
      </ThemeProvider>
    </>
  );
}

export default App;
