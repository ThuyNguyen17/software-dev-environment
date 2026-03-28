<<<<<<< HEAD
=======
// TeachersStyles.js
>>>>>>> fix-final
import styled from 'styled-components';

export const TeachersContainer = styled.div`
  display: flex;
<<<<<<< HEAD
=======
  
>>>>>>> fix-final
`;

export const Content = styled.div`
  flex: 1;
<<<<<<< HEAD
  padding: 20px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
`;

export const TeachersContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
=======
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

export const TeachersContent = styled.div`
  padding: 20px;
>>>>>>> fix-final
`;

export const TeachersHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
<<<<<<< HEAD
  color: #333;
`;

export const TeacherList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const TeacherItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
`;

export const AddTeacherForm = styled.form`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

export const AddTeacherInput = styled.input`
  padding: 14px 16px;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #fafbff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4b83b5;
    box-shadow: 0 0 0 4px rgba(75, 131, 181, 0.12);
  }
`;

export const AddTeacherButton = styled.button`
  padding: 12px 20px;
  background-color: #4b83b5; /* Dark Blue */
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #7da1cb; /* Medium Blue hover */
  }
=======
`;

export const TeacherList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const TeacherItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AddTeacherForm = styled.form`
  margin-bottom: 20px;
`;

export const AddTeacherInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AddTeacherButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
>>>>>>> fix-final
`;