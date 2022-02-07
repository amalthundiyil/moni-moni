import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({
  type = "button",
  color,
  fixedWidth,
  children,
  onClick,
}: ButtonProps) => (
  <StyledButton
    type={type}
    color={color}
    fixedWidth={fixedWidth}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);
