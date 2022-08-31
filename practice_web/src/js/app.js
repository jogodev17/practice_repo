const form = document.querySelector("#book-form");
var list = document.querySelector("#book-list");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const isbnInput = document.querySelector("#isbn");
console.log(tr);

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    // show books
    static showBooks() {
        var books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    // add books
    static addBookToList(book) {
        list.innerHTML += `
            <td class="myTitle">${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" id="delete" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    }

    // remove books
    static removeBooks(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }

    // showAlert

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.classList = `alert alert-${className}`;
        div.innerHTML = `${message}`;
        document.body.appendChild(div);
        setTimeout(() => document.querySelector(".alert").remove(), 2500);
    }

    // reset fields
    static resetFields() {
        titleInput.value = "";
        authorInput.value = "";
        isbnInput.value = "";
    }
}

class Store {
    // getBooks
    static getBooks() {
        let books;
        if (localStorage.getItem("books") == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    // addBooks
    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    // removeBooks
    static removeBooks(isbn) {
        const books = Store.getBooks();

        for (let i = 0; i < books.length; i++) {
            if (books[i].isbn === isbn) {
                books.splice(i, 1);
            }
        }
        localStorage.setItem("books", JSON.stringify(books));
    }
}

// fetch all books on load
window.addEventListener("load", UI.showBooks);

// Add book
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const isbn = isbnInput.value;

    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please input the fields!", "danger");
    } else {
        const book = new Book(title, author, isbn);
        Store.addBooks(book);
        UI.addBookToList(book);
        UI.showAlert("Added Books", "success");
        UI.resetFields();
    }
});

// Remove book
list.addEventListener("click", function (e) {
    Store.removeBooks(
        e.target.parentElement.previousElementSibling.textContent
    );
    UI.removeBooks(e.target);
    UI.showAlert("You remove a Book!", "danger");
});
