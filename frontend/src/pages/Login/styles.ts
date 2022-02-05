import styled from "styled-components";

export const LoginSection = styled("div")`
  margin: 0 auto;
  max-width: 400px;
  padding: 40px 40px;
  background: #fff;
  display: grid;
  grid-gap: 1em;
  place-items: center;

  .error {
    border: 2px solid #ff6565;
  }
  .error-message {
    color: #ff6565;
    font-size: 0.8em;
  }
`;
