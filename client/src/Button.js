import styled from "styled-components";
const Button = styled.button`
  margin: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 15px 20px 10px 10px;
  height: 50px;
  width: 165px;
  background: white;
  border: none;
  border-radius: 3px;
  color: black;
  @media (min-width: 2000px) {
    margin: 5px;
    font-weight: bold;
    font-size: .5rem;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 15px 20px 10px 10px;
    height: 110px;
    width: 165px;
    background: white;
    border: none;
    border-radius: 3px;
    color: black;
    ${props => (props.type === "primary" ? `border: 3px solid #2196F3` : null)}
    ${props => (props.type === "success" ? `border: 3px solid #4CAF50` : null)}
    ${props => (props.type === "danger" ? `border: 3px solid #F44336` : null)}
    ${props => (props.type === "warning" ? `border: 3px solid #502394` : null)}
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 60px;
    margin: 1px;
    margin-left: 2px;
    border-radius: 0px;
    margin-top: 0px;
    font-size: .5rem;
    padding: 0px;
    ${props => (props.type === "primary" ? `border: 1px solid #2196F3` : null)}
    ${props => (props.type === "success" ? `border: 1px solid #4CAF50` : null)}
    ${props => (props.type === "danger" ? `border: 1px solid #F44336` : null)}
    ${props => (props.type === "warning" ? `border: 1px solid #502394` : null)}
  }
  ${props => (props.type === "primary" ? `border: 3px solid #2196F3` : null)}
  ${props => (props.type === "success" ? `border: 3px solid #4CAF50` : null)}
  ${props => (props.type === "danger" ? `border: 3px solid #F44336` : null)}
  ${props => (props.type === "warning" ? `border: 3px solid #502394` : null)}
`;
export default Button;
