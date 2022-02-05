import styled from "styled-components";

export const SignupSection = styled("div")`
  margin: 0 auto;
  max-width: 400px;
  padding: 40px 40px;
  background: #fff;
  display: grid;
  place-items: center;

  .error {
    border: 2px solid #ff6565;
  }
  .error-message {
    color: #ff6565;
    font-size: 0.8em;
  }
`;
