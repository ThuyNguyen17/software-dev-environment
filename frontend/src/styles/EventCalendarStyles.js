<<<<<<< HEAD
=======
// EventCalendarStyles.js
>>>>>>> fix-final
import styled from 'styled-components';

export const EventCalendarContainer = styled.div`
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

export const CalendarContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CalendarHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const CalendarList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CalendarItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AddEventForm = styled.form`
  margin-bottom: 20px;
`;

export const AddEventInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AddEventButton = styled.button`
  padding: 8px 16px;
  background-color: #4b83b5; /* Dark Blue */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #7da1cb; /* Medium Blue hover */
  }
`;

// Backward-compatible exports used by Event pages
export const CalendarContainer = CalendarContent;
export const Events = CalendarList;
export const Event = CalendarItem;
export const EventInput = AddEventInput;
export const ErrorText = styled.p`
  margin-top: 8px;
  color: #dc3545;
=======
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  transition: margin-left 0.3s ease;
  padding: 20px;
`;

export const CalendarContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
`;

export const Events = styled.div`
  margin-top: 20px;
`;

export const Event = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

export const AddEventForm = styled.form`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export const EventInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

export const AddEventButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
>>>>>>> fix-final
`;