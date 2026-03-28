import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    LibraryContainer,
    Content,
    Title,
    AddBookForm,
    FormGroup,
    Label,
    Input,
    Button,
    BookList,
    BookItem,
    BookTitle,
    BookAuthor,
    ActionButton
} from "../../styles/LibraryStyles";

const Library = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/library/getall');
<<<<<<< HEAD
            setBooks(response.data.books || []);
=======
            setBooks(response.data.books);
>>>>>>> fix-final
        } catch (error) {
            console.error('Error fetching books: ', error);
        }
    };

<<<<<<< HEAD
    const addBook = async (title, author) => {
        try {
            await axios.post('http://localhost:8080/api/v1/library', {
                bookname: title,
                author: author,
            });
            fetchBooks();
=======
    const addBook = async (book) => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/library', {
                bookname: book.title,
                author: book.author,
            });
            setBooks([...books, ...response.data.books]);
>>>>>>> fix-final
        } catch (error) {
            console.error("Error adding book: ", error);
        };
    };

<<<<<<< HEAD
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/library/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book: ", error);
        }
    };

=======
    const handleBookPick = async (bookId, studentId) => {

    };

    const handleBookReturn = async (bookId, studentId) => {{

    }};

>>>>>>> fix-final
    return (
        <LibraryContainer>
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <Content isOpen={isOpen}>
                <Title>Library Management</Title>
                <AddBookForm onSubmit={(e) => {
                    e.preventDefault();
<<<<<<< HEAD
                    addBook(e.target.title.value, e.target.author.value);
=======
                    const book = {
                        id: Math.random().toString(36).substr(2, 9),
                        title: e.target.title.value,
                        author: e.target.author.value,
                    };
                    addBook(book);
>>>>>>> fix-final
                    e.target.reset();
                }}>
                    <h2>Add New Book</h2>
                    <FormGroup>
                        <Label htmlFor="title">Title</Label>
<<<<<<< HEAD
                        <Input type="text" id="title" name="title" required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="author">Author</Label>
                        <Input type="text" id="author" name="author" required />
=======
                        <Input type="text" id="title" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="author">Author</Label>
                        <Input type="text" id="author" />
>>>>>>> fix-final
                    </FormGroup>
                    <Button type="submit">Add Book</Button>
                </AddBookForm>

<<<<<<< HEAD
                <h2>Books List</h2>
                <BookList>
                    { Array.isArray(books) && books.map((book) => (
                        <BookItem key={book.id}>
                            <BookTitle>{book.bookname}</BookTitle>
                            <BookAuthor>{book.author}</BookAuthor>
                            <ActionButton onClick={() => handleDelete(book.id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</ActionButton>
=======
                <h2>Books</h2>
                <BookList>
                    { books.map((book) => (
                        <BookItem key={book._id}>
                            <BookTitle>{book.bookname}</BookTitle>
                            <BookAuthor>{book.author}</BookAuthor>
                            <ActionButton onClick={() => handleBookPick(book._id, 'student123')}>Pick</ActionButton>
                            <ActionButton onClick={() => handleBookReturn(book._id, 'student123')}>Return</ActionButton>
>>>>>>> fix-final
                        </BookItem>
                    ))}
                </BookList>
            </Content>
        </LibraryContainer>
    )
}

export default Library