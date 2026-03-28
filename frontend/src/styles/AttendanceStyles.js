<<<<<<< HEAD
=======
// AttendanceStyles.js
>>>>>>> fix-final
import styled from 'styled-components';

export const AttendanceContainer = styled.div`
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

export const AttendanceContent = styled.div`
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

export const AttendanceContent = styled.div`
  padding: 20px;
>>>>>>> fix-final
`;

export const AttendanceHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
<<<<<<< HEAD
  color: #333;
=======
>>>>>>> fix-final
`;

export const AttendanceList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AttendanceItem = styled.li`
  display: flex;
  align-items: center;
<<<<<<< HEAD
  margin-bottom: 12px;
  padding: 14px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
=======
  margin-bottom: 20px;
>>>>>>> fix-final
`;

export const StudentName = styled.span`
  flex: 1;
`;

export const CheckboxLabel = styled.label`
<<<<<<< HEAD
  margin-left: 10px;
=======
  margin-right: 10px;
>>>>>>> fix-final
`;

export const Divider = styled.hr`
  margin-top: 5px;
  border: 0;
  border-top: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
<<<<<<< HEAD
  padding: 12px 22px;
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

// Backward-compatible exports used by Student Attendance page
export const SidebarContainer = styled.div`
  flex-shrink: 0;
`;
export const AttendanceDate = styled.span`
  color: #333;
`;
export const AttendanceStatus = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ present }) => (present ? "#155724" : "#721c24")};
  background-color: ${({ present }) => (present ? "#d4edda" : "#f8d7da")};
=======
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
`;

export const AttendanceDate = styled.span`
  font-weight: bold;
`;

export const AttendanceStatus = styled.span`
  margin-left: 10px;
  color: ${({ present }) => (present ? 'green' : 'red')};
>>>>>>> fix-final
`;