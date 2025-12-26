let myLibrary = [];
const libraryElement = document.querySelector('.library');
const addBookElement = document.querySelector('.add-book');
const addBookModalElement = document.querySelector('.add-book-modal');

addBookElement.addEventListener('click', _ => {
    addBookModalElement.showModal();
});

addBookModalElement.addEventListener('submit', e => {
    e.preventDefault();
    const form = document.querySelector('form');
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const titleField = document.querySelector('#title');
    titleField.value = '';
    const authorField = document.querySelector('#author');
    authorField.value = '';
    addBookModalElement.close();
    addBookToLibrary(values.title, values.author);
    displayBooks();
})

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
    libraryElement.textContent = null;
    for (const book of myLibrary) {
        const cardElement = document.createElement('div');
        cardElement.setAttribute('data-id', book.id);
        const titleElement = document.createElement('h2');
        const authorElement = document.createElement('p');
        titleElement.textContent = book.title;
        authorElement.textContent = book.author;
        cardElement.appendChild(titleElement);
        cardElement.appendChild(authorElement);
        libraryElement.appendChild(cardElement);
    }
}

addBookToLibrary('The Lord of The Rings', 'J.R.R Tolkien');
addBookToLibrary('Ars Obscura', 'François Barranger');
displayBooks();