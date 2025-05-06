import { useEffect, useState } from "react";
//API base URL: https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api

//Users
//Register a new account: POST /users/register
//Login: POST /users/login
//Get account details: GET /users/me

//Books
//Get all books: GET /books

export function GetBooks() {
  return fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

//Get a book's details: GET /books/{id}

//Reservations
//Get all reservations: GET /reservations
//Reserve a book: POST /reservations
//Return a book: DELETE /reservations/{id}
