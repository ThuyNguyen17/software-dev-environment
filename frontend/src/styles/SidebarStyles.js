<<<<<<< HEAD
=======
// SidebarStyles.js
>>>>>>> fix-final
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
<<<<<<< HEAD
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  background-color: #2c3e50;
  color: #fff;
  height: 100vh;
  padding-top: 20px;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
=======
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  height: 100%;
  background-color: #2c3e50; /* Dark blue background */
  color: white;
  overflow-y: auto; /* Enable vertical scrolling */
  padding-top: 60px;
  transition: width 0.3s ease; /* Smooth width transition */
  z-index: 100; /* Ensure sidebar stays above content */
>>>>>>> fix-final
`;

export const SidebarHeader = styled.div`
  padding: 20px;
<<<<<<< HEAD
=======
  font-size: 24px;
  font-weight: bold;
>>>>>>> fix-final
  text-align: center;
`;

export const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
<<<<<<< HEAD
  color: #bdc3c7;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
    color: #fff;
=======
  border-bottom: 1px solid #34495e; /* Darker border */
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #34495e; /* Darker background on hover */
>>>>>>> fix-final
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
<<<<<<< HEAD
  color: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SidebarIcon = styled.div`
  font-size: 20px;
`;

export const SidebarToggle = styled.div`
  position: absolute;
  top: 20px;
  right: ${({ isOpen }) => (isOpen ? '20px' : '50%')};
  transform: ${({ isOpen }) => (isOpen ? 'none' : 'translateX(50%)')};
  cursor: pointer;
  font-size: 24px;
=======
  color: white;
  margin-left: 10px;
`;

export const SidebarIcon = styled.div`
  margin-right: 10px;
`;

export const Logo = styled.img`
  width: 50px;
  height: auto;
`;

export const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #34495e; /* Darker background */
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleIcon = styled.span`
  color: white;
  font-size: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
>>>>>>> fix-final
`;