<<<<<<< HEAD
import styled from 'styled-components';
=======
// StudentSignInStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';
>>>>>>> fix-final

export const StudentSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
=======
  background: linear-gradient(45deg, #FF69B4, #FFA07A, #90EE90); /* Gradient background */
  min-height: 100vh; /* Full height of the viewport */
>>>>>>> fix-final
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
<<<<<<< HEAD
  max-width: 300px;
=======
  max-width: 300px; /* Limit form width */
>>>>>>> fix-final
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

<<<<<<< HEAD
export const SubmitButton = styled.button`
=======
export const SubmitButton = styled(Link)`
>>>>>>> fix-final
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
<<<<<<< HEAD
  background-color: #4b83b5; /* Dark Blue */
  color: white;
  font-size: 18px;
=======
  background-color: #FF4500;
  color: white;
  font-size: 18px;
  text-decoration: none;
>>>>>>> fix-final
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
<<<<<<< HEAD
    background-color: #7da1cb; /* Medium Blue hover */
=======
    background-color: #FF6347;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
>>>>>>> fix-final
  }
`;