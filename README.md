<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"><img src="https://www.metaltoad.com/sites/default/files/styles/large_personal_photo_870x500_/public/2020-05/react-js-blog-header.png?itok=VbfDeSgJ" width="250"></p>

## 🎉 About Book Store

Book Store is an application about book management CRUD. This application was created using the base Laravel Framework as the backend service and React.js as the frontend.

Laravel is accessible, powerful, and provides tools required for large, robust applications and React is an easy, simple, and lightweight library.

## ✨ Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To run this project, yarn / npm tools and composer are needed and make sure you have imported the book_store.sql database which is already available in this project. Don't forget to setup the ENVIRONTMENT_VARIBALE or .env file.

## 🚀 Installation And Usage

-   Run this command, to clone the project.

```
git clone https://gitlab.com/budiprihhastomo/book-store.git

-- or --

git clone https://github.com/budiprihhastomo/book-store.git
```

-   Run this command, to install dependency for running the application.

```
composer install && npm install

-- or --

composer install && yarn install
```

-   Run this command, to migrate the database to your local machine.

```
:: Call Action to Migrate Database
php artisan migrate --seed

:: Create JWT Secret Key
php artisan jwt:secret

:: Create Secret Key Laravel App
php artisan key:generate
```

-   Run this command, to running the application, you can running 2 terminal / CMD.

```
:: Command To Build Frontend Service (React)
npm run dev

-- and --

:: Command To Running Backend Service (Laravel)
php artisan serve
```

## ✅ API Documentation

### Authorization API

| Path                      | Method | Description                                  | Data                                                                                             |
| ------------------------- | ------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| /api/auth/login           | POST   | used for user login / authentication.        | Body Request :<br>email: string, username: string                                                |
| /api/auth/register        | POST   | used for register new users.                 | Body Request :<br>name: string, password: email: string, role: integer                           |
| /api/auth/logout          | POST   | used for logout or destroy the user session. | Header Request :<br>Authorization: string                                                        |
| /api/auth/password/reset  | POST   | used for reset password user.                | Query Params Request :<br>token: string, email: string<br><br>Body Request :<br>password: string |
| /api/auth/password/forget | POST   | used for forgot password user.               | Body Request :<br>email: string                                                                  |

### Books API

| Path          | Method | Description                                 | Data                                                                                                                                                                                                                        |
| ------------- | ------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api/book     | GET    | used for show list of books from database.  | -                                                                                                                                                                                                                           |
| /api/book/:id | GET    | used for show detail of book from database. | Params Request :<br>id: integer                                                                                                                                                                                             |
| /api/book     | POST   | used for create new book into database.     | Header Request :<br>Authorization: string<br><br>Body Request :<br>title: string, total_pages: integer, rating: integer, isbn: integer, published_date: string, authors: string[]                                           |
| /api/book/:id | PATCH  | used for update book from database.         | Header Request : <br>Authorization: string <br><br>Params Request :<br>id: integer<br><br>Body Request : <br>title: string, total_pages: integer, rating: integer, isbn: integer, published_date: string, authors: string[] |
| /api/book/:id | DELETE | used for delete book from database.         | Header Request : <br>Authorization: string <br><br>Params Request :<br>id: integer |

### Author API

| Path             | Method | Description                                   | Data                                                                                                                                                                                                                        |
| ---------------- | ------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api/author      | GET    | used for show list of authors from database.  | -                                                                                                                                                                                                                           |
| /api/author/:id  | GET    | used for show detail of author from database. | Params Request :<br>id: integer                                                                                                                                                                                             |
| /api/author/find | GET    | used for show detail of author from database. | Query Params Request :<br>name: integer                                                                                                                                                                                     |
| /api/author      | POST   | used for create new author into database.     | Header Request :<br>Authorization: string<br><br>Body Request :<br>title: string, total_pages: integer, rating: integer, isbn: integer, published_date: string, authors: string[]                                           |
| /api/author/:id  | PATCH  | used for update author from database.         | Header Request : <br>Authorization: string <br><br>Params Request :<br>id: integer<br><br>Body Request : <br>title: string, total_pages: integer, rating: integer, isbn: integer, published_date: string, authors: string[] |
| /api/author/:id  | DELETE | used for delete author from database.         | Header Request : <br>Authorization: string <br><br>Params Request :<br>id: integer |

## 📷 Screenshoot

-   Dashboard (Non-Auth User)
    ![alt text](https://gitlab.com/budiprihhastomo/book-store/-/raw/master/docs/images/Dashboard.PNG)
-   Books Page
    ![alt text](https://gitlab.com/budiprihhastomo/book-store/-/raw/master/docs/images/Books.PNG)
-   Authors Page
    ![alt text](https://gitlab.com/budiprihhastomo/book-store/-/raw/master/docs/images/Authors.PNG)
-   Modal Create And Update Book
    ![alt text](https://gitlab.com/budiprihhastomo/book-store/-/raw/master/docs/images/BooksModal.PNG)
-   Modal Create And Update Author
    ![alt text](https://gitlab.com/budiprihhastomo/book-store/-/raw/master/docs/images/AuthorsModal.PNG)

## 👤 Author

-   Budi Prih Hastomo

## 📝 License

Copyright © 2020 Budi Prih Hastomo.
This project is MIT licensed.
