package com.example.project_management_class.presentation.controller;

import com.example.project_management_class.application.service.BookService;
import com.example.project_management_class.domain.model.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/library")
@RequiredArgsConstructor
<<<<<<< HEAD
@CrossOrigin(origins = "*")
=======
>>>>>>> fix-final
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addBook(@RequestBody Book book) {
        bookService.addBook(book);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Book Created!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("books", books);
        return ResponseEntity.ok(response);
    }
}
