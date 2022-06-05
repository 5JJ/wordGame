import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GloablStyle = createGlobalStyle`
  ${reset}
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    box-sizing: border-box;
    font-family: "Notosans KR", sans-serif;
  }

  h1, h2, h3, h4, h5, p {
    margin: 0;
  }
`;

export default GloablStyle;
