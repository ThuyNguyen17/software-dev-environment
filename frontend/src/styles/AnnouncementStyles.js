<<<<<<< HEAD
=======
// AnnouncementStyles.js
>>>>>>> fix-final
import styled from 'styled-components';

export const AnnouncementContainer = styled.div`
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

export const AnnouncementContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
`;

export const AnnouncementHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const AnnouncementForm = styled.form`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
=======
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const AnnouncementForm = styled.form`
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
>>>>>>> fix-final
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
<<<<<<< HEAD
  color: #666;
=======
>>>>>>> fix-final
`;

export const TextArea = styled.textarea`
  width: 100%;
<<<<<<< HEAD
  padding: 14px 16px;
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

export const Button = styled.button`
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

export const AnnouncementList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AnnouncementItem = styled.li`
<<<<<<< HEAD
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 12px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
`;

// Backward-compatible export
export const Title = AnnouncementHeader;
export const SidebarContainer = styled.div`
  flex-shrink: 0;
`;
export const AnnouncementTitle = styled.h4`
  margin: 0;
  color: #222;
=======
  margin-bottom: 10px;
`;

export const AnnouncementContent = styled.p`
  font-size: 16px;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
`;


export const AnnouncementHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;


export const AnnouncementTitle = styled.h3`
  margin-bottom: 10px;
>>>>>>> fix-final
`;
