<<<<<<< HEAD
=======
// LibraryStyles.js
>>>>>>> fix-final
import styled from 'styled-components';

export const LibraryContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
<<<<<<< HEAD
  padding: 20px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
`;

export const LibraryContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
`;

export const LibraryHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
=======
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const AddBookForm = styled.form`
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
>>>>>>> fix-final
`;

export const BookList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const BookItem = styled.li`
<<<<<<< HEAD
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 12px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
`;

export const AddBookForm = styled.form`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

export const AddBookInput = styled.input`
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

export const AddBookButton = styled.button`
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
`;

// Backward-compatible exports used by Admin Library page
export const Title = LibraryHeader;
export const FormGroup = styled.div`
  margin-bottom: 12px;
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: #555;
`;
export const Input = AddBookInput;
export const Button = AddBookButton;
export const BookTitle = styled.h4`
  margin: 0 0 6px 0;
  color: #222;
`;
export const BookAuthor = styled.p`
  margin: 0 0 8px 0;
  color: #444;
`;
export const ActionButton = AddBookButton;
export const SidebarContainer = styled.div`
  flex-shrink: 0;
`;
export const BorrowButton = AddBookButton;
=======
  margin-bottom: 10px;
`;

export const BookTitle = styled.span`
  font-weight: bold;
`;

export const BookAuthor = styled.span`
  margin-left: 10px;
`;

export const ActionButton = styled.button`
  margin-left: 10px;
  padding: 4px 8px;
  font-size: 14px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
`;

export const LibraryHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const BorrowButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
>>>>>>> fix-final
