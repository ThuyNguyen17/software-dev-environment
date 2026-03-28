<<<<<<< HEAD
=======
// AssignmentsStyles.js
>>>>>>> fix-final
import styled from 'styled-components';

export const AssignmentsContainer = styled.div`
  display: flex;
<<<<<<< HEAD
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

export const AssignmentsContent = styled.div`
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

export const AssignmentsContent = styled.div`
  padding: 20px;
>>>>>>> fix-final
`;

export const AssignmentsHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
<<<<<<< HEAD
  color: #333;
=======
>>>>>>> fix-final
`;

export const AssignmentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AssignmentItem = styled.li`
  background-color: #f9f9f9;
<<<<<<< HEAD
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 12px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
`;

export const AssignmentTitle = styled.h3`
  margin-bottom: 5px;
`;

export const AddAssignmentForm = styled.form`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

export const AddAssignmentInput = styled.input`
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

export const AddAssignmentTextArea = styled.textarea`
  padding: 14px 16px;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #fafbff;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4b83b5;
    box-shadow: 0 0 0 4px rgba(75, 131, 181, 0.12);
  }
`;

export const AddAssignmentButton = styled.button`
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

// Backward-compatible exports used by Student Assignments page
export const SidebarContainer = styled.div`
  flex-shrink: 0;
`;
export const AssignmentButton = AddAssignmentButton;
export const AssignmentCard = AssignmentItem;
export const AssignmentDescription = styled.p`
  margin: 8px 0;
  color: #444;
`;
export const AssignmentDoneMessage = styled.p`
  margin-top: 10px;
  color: #28a745;
  font-weight: 600;
=======
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AddAssignmentForm = styled.form`
  margin-bottom: 20px;
`;

export const AddAssignmentInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const AddAssignmentTextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  resize: vertical;
`;

export const AddAssignmentButton = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;



export const AssignmentCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

export const AssignmentTitle = styled.h3`
  margin-bottom: 10px;
`;

export const AssignmentDescription = styled.p`
  color: #555;
  margin-bottom: 15px;
`;

export const AssignmentButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export const AssignmentDoneMessage = styled.p`
  color: #28a745;
  font-weight: bold;
>>>>>>> fix-final
`;