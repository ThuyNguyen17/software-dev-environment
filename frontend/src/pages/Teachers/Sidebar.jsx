import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { BsGraphUp, 
    BsPeople, 
    BsPerson, 
    BsFileText, 
    BsBook, 
    BsGraphDown, 
    BsCalendar, 
    BsGear, 
    BsChatDots, 
    BsCalendarEvent, 
    BsQuestionSquare 
} from 'react-icons/bs';

import bg1 from '../../assets/bg1.png';

const SidebarContainer = styled.div`
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
  z-index: 1000; /* Ensure sidebar stays above content */
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  transition: opacity 0.3s ease;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
  border-bottom: 1px solid #34495e; /* Darker border */
  transition: background-color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #34495e; /* Darker background on hover */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
  white-space: nowrap;
  display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.3s ease;
`;

const SidebarIcon = styled.div`
  min-width: 25px;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

const Logo = styled.img`
  width: ${({ isOpen }) => (isOpen ? '50px' : '30px')};
  height: auto;
  transition: width 0.3s ease;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #34495e;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(50%);
  z-index: 1001;
`;

const ToggleIcon = styled.span`
  color: white;
  font-size: 16px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Sidebar = ({ isOpen, onToggle }) => {
    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        }
    };
    
    return (
        <SidebarContainer isOpen={isOpen}>
            <SidebarHeader>
                <Logo src={bg1} alt="Logo" isOpen={isOpen} />
            </SidebarHeader>
            <SidebarNav>
                <SidebarNavItem>
                    <SidebarIcon title="Dashboard"><BsGraphUp /></SidebarIcon>
                    <StyledLink to="/teacher/dashboard" isOpen={isOpen}>Dashboard</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Classes"><BsPeople /></SidebarIcon>
                    <StyledLink to="/teacher/classes" isOpen={isOpen}>Classes</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Students"><BsPeople /></SidebarIcon>
                    <StyledLink to="/teacher/students" isOpen={isOpen}>Students</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Teachers"><BsPerson /></SidebarIcon>
                    <StyledLink to="/teacher/teachers" isOpen={isOpen}>Teachers</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Assignments"><BsFileText /></SidebarIcon>
                    <StyledLink to="/teacher/assignments" isOpen={isOpen}>Assignments</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Exams"><BsBook /></SidebarIcon>
                    <StyledLink to="/teacher/exams" isOpen={isOpen}>Exams</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Performance"><BsGraphDown /></SidebarIcon>
                    <StyledLink to="/teacher/performance" isOpen={isOpen}>Performance</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Attendance"><BsCalendar /></SidebarIcon>
                    <StyledLink to="/teacher/attendance" isOpen={isOpen}>Attendance</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Announcement"><BsChatDots /></SidebarIcon>
                    <StyledLink to="/teacher/communication" isOpen={isOpen}>Announcement</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Events"><BsCalendarEvent /></SidebarIcon>
                    <StyledLink to="/teacher/events" isOpen={isOpen}>Events & Calendar</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon title="Settings"><BsGear /></SidebarIcon>
                    <StyledLink to="/teacher/settings" isOpen={isOpen}>Settings & Profile</StyledLink>
                </SidebarNavItem>
            </SidebarNav>
            <ToggleButton onClick={handleToggle}>
                <ToggleIcon isOpen={isOpen}>▶</ToggleIcon>
            </ToggleButton>
        </SidebarContainer>
    );
};

export default Sidebar;