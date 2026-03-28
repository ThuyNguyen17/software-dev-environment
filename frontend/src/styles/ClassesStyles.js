<<<<<<< HEAD
=======
// ClassesStyles.js
>>>>>>> fix-final
import styled from 'styled-components';

export const ClassesContainer = styled.div`
  display: flex;
<<<<<<< HEAD
`;

export const SidebarContainer = styled.div`
  /* Thêm vào để tránh lỗi thiếu export SidebarContainer */
  width: 250px;
=======

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
>>>>>>> fix-final
`;

export const Content = styled.div`
  flex: 1;
<<<<<<< HEAD
  padding: 20px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
`;

export const ClassesContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
`;

export const ClassHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const ClassList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

export const ClassItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
=======
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

export const ClassesContent = styled.div`
  padding: 20px;
`;

export const ClassesHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ClassList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ClassItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
>>>>>>> fix-final
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AddClassForm = styled.form`
<<<<<<< HEAD
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: end;
  margin-bottom: 24px;

  select,
  input {
    width: 100%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const AddClassInput = styled.input`
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #fafbff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4b83b5;
    box-shadow: 0 0 0 4px rgba(75, 131, 181, 0.12);
  }
=======
  margin-bottom: 20px;
`;

export const AddClassInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
>>>>>>> fix-final
`;

export const AddClassButton = styled.button`
  padding: 8px 16px;
<<<<<<< HEAD
  background-color: #4b83b5; /* Dark Blue */
=======
  background-color: #007bff;
>>>>>>> fix-final
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
<<<<<<< HEAD

  &:hover {
    background-color: #7da1cb; /* Medium Blue hover */
  }
`;

// Backward-compatible export
export const ClassContainer = ClassesContainer;
=======
`;


export const ClassContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
`;

export const ClassHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const GradeHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;
>>>>>>> fix-final
