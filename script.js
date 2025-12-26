const myLibrary = [];
const libraryElement = document.querySelector('.library');

addBookToLibrary('The Lord of The Rings', 'J.R.R Tolkien');
addBookToLibrary('Ars Obscura', 'François Barranger');

function Book(title, author) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.read = false;
}

function addBookToLibrary(title, author) {
    myLibrary.push(new Book(title, author));
}

function displayBooks() {
    for (const book of myLibrary) {
        const cardElement = document.createElement('div');
        const titleElement = document.createElement('h2');
        const authorElement = document.createElement('p');
        titleElement.textContent = book.title;
        authorElement.textContent = book.author;
        cardElement.appendChild(titleElement);
        cardElement.appendChild(authorElement);
        libraryElement.appendChild(cardElement);
    }
}

displayBooks();