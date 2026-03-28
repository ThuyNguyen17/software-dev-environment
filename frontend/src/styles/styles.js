<<<<<<< HEAD
=======
// styles.js
>>>>>>> fix-final
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
<<<<<<< HEAD
  background-color: #2c3e50;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
=======
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #6BD4E7;
  color: black;
  font-family: Arial, sans-serif;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
>>>>>>> fix-final
`;

export const Logo = styled.img`
  width: 50px;
  height: auto;
<<<<<<< HEAD
=======

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
>>>>>>> fix-final
`;

export const NavigationLinks = styled.div`
  display: flex;
<<<<<<< HEAD
  gap: 20px;
`;

export const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
=======
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const NavLink = styled.a`
  margin-right: 20px;
  color: black;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
>>>>>>> fix-final

  &:hover {
    text-decoration: underline;
  }
<<<<<<< HEAD
=======

  @media screen and (max-width: 768px) {
    margin: 0 10px;
    font-size: 16px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 35px;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
    margin-right: 0;
  }
`;

export const LoginButton = styled.button`
  background-color: orange;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const GuestButton = styled.button`
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid orange;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: orange;
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
>>>>>>> fix-final
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
<<<<<<< HEAD
  background-color: #f4f4f4;
  padding: 20px;
=======
  background: linear-gradient(45deg, #6BD4E7, #6FC3DF);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 80px;

  @media screen and (max-width: 768px) {
    padding-top: 60px;
  }
>>>>>>> fix-final
`;

export const SchoolInfo = styled.div`
  margin-top: 20px;
`;

export const SchoolImage = styled.img`
<<<<<<< HEAD
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-top: 20px;
=======
  width: 80%;
  max-height: 80vh;
  object-fit: cover;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
>>>>>>> fix-final
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
<<<<<<< HEAD
  color: #2c3e50;
  margin-bottom: 10px;
`;

export const LoremTextContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;

  p {
    font-size: 18px;
    color: #555;
    line-height: 1.6;
=======
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const LoremTextContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 18px;
  color: white;
  text-align: justify;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
>>>>>>> fix-final
  }
`;

export const AdminRegisterLink = styled(Link)`
<<<<<<< HEAD
  background-color: #2c3e50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 20px;
  display: inline-block;

  &:hover {
    background-color: #34495e;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

export const LoginButton = styled.button`
  background-color: #2c3e50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: #34495e;
  }
`;

export const GuestButton = styled.button`
  background-color: #95a5a6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 10px;

  &:hover {
    background-color: #7f8c8d;
=======
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
>>>>>>> fix-final
  }
`;
