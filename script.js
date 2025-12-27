const myLibrary = [];

addBookToLibrary({ title: 'Test', author: 'Test', pages: 250, read: true })

displayBooks(myLibrary);

function Book({ title, author, pages, read = false }) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary({ title, author, pages, read }) {
    myLibrary.push(new Book({ title, author, pages, read }));
}

function displayBooks(library) {
    const libraryElement = document.querySelector('.library');

    for (const book of library) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const bookTitleElement = document.createElement('h2');
        bookTitleElement.textContent = book.title;
        bookElement.appendChild(bookTitleElement);

        const bookAuthorElement = document.createElement('p');
        bookAuthorElement.textContent = book.author;
        bookElement.appendChild(bookAuthorElement);

        const bookPagesElement = document.createElement('p');
        bookPagesElement.textContent = `${book.pages} pages`;
        bookElement.appendChild(bookPagesElement);

        const bookReadElement = document.createElement('p');
        bookReadElement.textContent = book.read ? 'Read' : 'To read';
        bookElement.appendChild(bookReadElement);

        libraryElement.appendChild(bookElement);
    }
}