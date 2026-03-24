import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
    LibraryContainer,
    SidebarContainer,
    Content,
    LibraryHeader,
    BookList,
    BookItem,
    BorrowButton
} from "../../styles/LibraryStyles";

const LibrarySection = () =>{
    const [isOpen, setIsOpen] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/library/getall');
            setBooks(response.data.books);
        } catch (error) {
            console.error('Error fetching books: ', error);
        }
    };

    const handleBorrowBook = (id) => {

    };

    return(
        <LibraryContainer>
            <SidebarContainer>
                <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            </SidebarContainer>
            <Content isOpen={isOpen}>
                <LibraryHeader>Library</LibraryHeader>
                <BookList>
                    { books.map((book) => (
                        <BookItem key={book._id}>
                            <BookTitle>{book.bookname}</BookTitle>
                            <BookAuthor>{book.author}</BookAuthor>
                            <BorrowButton onClick={() => handleBorrowBook(book._id)}>Borrow</BorrowButton>
                        </BookItem>
                    ))}
                </BookList>
            </Content>
        </LibraryContainer>
    )
}

export default LibrarySection