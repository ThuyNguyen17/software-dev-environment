import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    ClassContainer,
<<<<<<< HEAD
=======
    SidebarContainer,
>>>>>>> fix-final
    Content,
    ClassesContent,
    ClassHeader,
    AddClassForm,
    AddClassButton,
    AddClassInput,
    ClassList,
    ClassItem
} from "../../styles/ClassesStyles";

<<<<<<< HEAD
const ClassesSection = () => {
=======
const ClassesSection = () =>{
>>>>>>> fix-final
    const [isOpen, setIsOpen] = useState(true);
    const [newClass, setNewClass] = useState({ gradeLevel: '', className: '' });
    const [classes, setClasses] = useState([]);
    const [editingClass, setEditingClass] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
<<<<<<< HEAD
        try {
            const response = await axios.get('http://localhost:8080/api/v1/class/getall');
            // Kiểm tra cấu trúc data từ backend của bạn
            if (response.data && Array.isArray(response.data.classes)) {
                setClasses(response.data.classes);
            } else if (Array.isArray(response.data)) {
                setClasses(response.data);
            }
        } catch (error) {
=======
        try{
            const response = await axios.get('http://localhost:8080/api/v1/class/getall');
            if(response.data && Array.isArray(response.data.classes)){
                setClasses(response.data.classes);
            }else{
                console.log("Error while fetching classes: Invalid data format", response.data)
            }
        }catch (error){
>>>>>>> fix-final
            console.error('Error fetching classes: ', error);
        }
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if (newClass.className.trim() !== '' && newClass.gradeLevel !== '') {
            try {
                await axios.post('http://localhost:8080/api/v1/class', newClass);
                fetchClasses();
                setNewClass({ gradeLevel: '', className: '' });
            } catch (error) {
=======
        if(newClass.className.trim() !== '' && newClass.gradeLevel !== ''){
            try{
                await axios.post('http://localhost:8080/api/v1/class', newClass);
                fetchClasses();
                setNewClass({ gradeLevel: '', className: '' });
            }catch (error){
>>>>>>> fix-final
                console.error("Error adding class: ", error);
            }
        }
    };

    const handleDeleteClass = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/class/${id}`);
                fetchClasses();
            } catch (error) {
                console.error('Error deleting class: ', error);
            }
        }
    };

    const handleUpdateClass = async (e) => {
        e.preventDefault();
        try {
<<<<<<< HEAD
            // Lưu ý: MongoDB dùng _id, nếu backend trả về _id thì sửa thành editingClass._id
            const id = editingClass.id || editingClass._id;
            await axios.put(`http://localhost:8080/api/v1/class/${id}`, editingClass);
=======
            await axios.put(`http://localhost:8080/api/v1/class/${editingClass.id}`, editingClass);
>>>>>>> fix-final
            setEditingClass(null);
            fetchClasses();
        } catch (error) {
            console.error('Error updating class: ', error);
        }
    };

<<<<<<< HEAD
    return (
=======
    return(
>>>>>>> fix-final
        <ClassContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <ClassesContent>
                    <ClassHeader>Classes Management</ClassHeader>
<<<<<<< HEAD

                    {editingClass ? (
                        <AddClassForm onSubmit={handleUpdateClass}>
                            <h3>Edit Class</h3>
                            <AddClassInput
=======
                    
                    {editingClass ? (
                        <AddClassForm onSubmit={handleUpdateClass}>
                            <h3>Edit Class</h3>
                            <AddClassInput 
>>>>>>> fix-final
                                type="number"
                                value={editingClass.gradeLevel}
                                onChange={(e) => setEditingClass({ ...editingClass, gradeLevel: e.target.value })}
                            />
<<<<<<< HEAD
                            <AddClassInput
=======
                            <AddClassInput 
>>>>>>> fix-final
                                type="text"
                                value={editingClass.className}
                                onChange={(e) => setEditingClass({ ...editingClass, className: e.target.value })}
                            />
                            <AddClassButton type="submit">Update</AddClassButton>
                            <AddClassButton type="button" onClick={() => setEditingClass(null)} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Cancel</AddClassButton>
                        </AddClassForm>
                    ) : (
                        <AddClassForm onSubmit={handleAddClass}>
<<<<<<< HEAD
                            <AddClassInput
=======
                            <AddClassInput 
>>>>>>> fix-final
                                type="number"
                                placeholder="Grade Level (e.g. 10)"
                                value={newClass.gradeLevel}
                                onChange={(e) => setNewClass({ ...newClass, gradeLevel: e.target.value })}
                            />
<<<<<<< HEAD
                            <AddClassInput
=======
                            <AddClassInput 
>>>>>>> fix-final
                                type="text"
                                placeholder="Class Name (e.g. A1)"
                                value={newClass.className}
                                onChange={(e) => setNewClass({ ...newClass, className: e.target.value })}
                            />
                            <AddClassButton type="submit">Add Class</AddClassButton>
                        </AddClassForm>
                    )}

                    <ClassList>
                        {Array.isArray(classes) && classes.map((item, index) => (
<<<<<<< HEAD
                            <ClassItem key={item.id || item._id || index}>
=======
                            <ClassItem key={item.id || index}>
>>>>>>> fix-final
                                <div>
                                    Grade: {item.gradeLevel} - Class: {item.className}
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <button onClick={() => setEditingClass(item)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
<<<<<<< HEAD
                                    <button onClick={() => handleDeleteClass(item.id || item._id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
=======
                                    <button onClick={() => handleDeleteClass(item.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
>>>>>>> fix-final
                                </div>
                            </ClassItem>
                        ))}
                    </ClassList>
                </ClassesContent>
            </Content>
        </ClassContainer>
<<<<<<< HEAD
    );
}

export default ClassesSection;
=======
    )
}

export default ClassesSection
>>>>>>> fix-final
