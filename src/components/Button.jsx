import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ buttonNameColor }) => buttonNameColor || "black"};
  background-color: ${({ backColor }) => backColor || "gray"};
  border: ${({ isSelected }) =>
    isSelected ? "2px solid black" : "2px solid transparent"};
  border-radius: 100px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({
  buttonName,
  buttonNameColor,
  backColor,
  isSelected,
  onClick,
}) => {
  return (
    <StyledButton
      buttonColor={buttonNameColor}
      backColor={backColor}
      isSelected={isSelected}
      onClick={onClick}
    >
      {buttonName}
    </StyledButton>
  );
};
export default Button;
