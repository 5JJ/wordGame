import { GAME_LIST_IN_KR } from "constants/common";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1(() => ({
  fontSize: "28px",
  fontWeight: "bold",
}));

const Introduction = styled.p(() => ({
  margin: "20px 0",
  lineHeight: 1.2,
  fontSize: "14px",
}));

const EmailLink = styled.a(() => ({
  textDecoration: "underline !important",
}));

const EmailLinkContainer = styled.span(() => ({
  color: "grey",
}));

const GameListConatiner = styled.div(() => ({
  marginTop: 10,

  //textAlign: "center",
}));

const GameLink = styled(Link)(() => ({
  border: "1px solid #231f20",
  borderRadius: 4,
  padding: "10px",
  fontSize: 14,
  width: "100%",
  display: "inline-block",
  backgroundImage: 'url("./icons/arrow-right.png")',
  backgroundSize: "13px",
  backgroundPosition: "right",
}));

export default function Home() {
  return (
    <>
      <Title>Welcome!</Title>
      <Introduction>
        This place is my playground!
        <br />I get influenced by Kordle{" "}
        <EmailLinkContainer>
          <a href="http://kordle.kr">{">"}</a>
        </EmailLinkContainer>
        <br />
        It looks the same but I try to add more games like hangman to give
        different impression and fun to visitors~
      </Introduction>
      <Introduction>
        If you meet any bug, please report it to me. I will fix it as fast as
        possible.
        <br />
        Email:
        <EmailLinkContainer>
          <EmailLink href="mailto: wjdgml015@gmail.com">
            wjdgml015@gmail.com
          </EmailLink>
        </EmailLinkContainer>
      </Introduction>
      <GameListConatiner>
        <GameLink to="/kordle">Kordle</GameLink>
      </GameListConatiner>
    </>
  );
}
