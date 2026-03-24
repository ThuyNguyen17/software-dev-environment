import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    ProfileContainer,
    Content,
    ProfileContent,
    ProfileHeader,
    ProfileInfo,
    ProfileDetail,
    Label,
    Value
} from "../../styles/SettingsProfileStyles";

const ProfileSection = () => {
    const [isOpen, setIsOpen] = useState(true);

    const studentProfile = {
        name: "John Doe",
        age: 20,
        grade: "A",
        school: "XYZ High School",
        email: "john.doe@example.com"
    };

    return (
        <ProfileContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <ProfileContent>
                    <ProfileHeader>Student Profile</ProfileHeader>
                    <ProfileInfo>
                        <ProfileDetail>
                            <Label>Name:</Label>
                            <Value>{studentProfile.name}</Value>
                        </ProfileDetail>
                        <ProfileDetail>
                            <Label>Age:</Label>
                            <Value>{studentProfile.age}</Value>
                        </ProfileDetail>
                        <ProfileDetail>
                            <Label>Grade:</Label>
                            <Value>{studentProfile.grade}</Value>
                        </ProfileDetail>
                        <ProfileDetail>
                            <Label>School:</Label>
                            <Value>{studentProfile.school}</Value>
                        </ProfileDetail>
                        <ProfileDetail>
                            <Label>Email:</Label>
                            <Value>{studentProfile.email}</Value>
                        </ProfileDetail>
                    </ProfileInfo>
                </ProfileContent>
            </Content>
        </ProfileContainer>
    );
};

export default ProfileSection