let myLibrary = [];

addBookToLibrary({ title: 'The Lord Of The Rings', author: 'J.R.R Tolkien', pages: 1000, read: true })
setupAddBookDialog();
setupAddBookDialogClose();
setupAddBookDialogAdd();
displayBooks();

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

function displayBooks() {
    const libraryElement = document.querySelector('.library');
    libraryElement.textContent = '';

    for (const book of myLibrary) {
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

        const bookReadElement = document.createElement('button');
        bookReadElement.textContent = book.read ? 'Mark not read' : 'Mark read';
        bookReadElement.addEventListener('click', _ => {
            book.read = !book.read;
            displayBooks();
        });
        bookElement.appendChild(bookReadElement);

        const bookDeleteElement = document.createElement('button');
        bookDeleteElement.textContent = 'Delete';
        bookDeleteElement.classList.add('delete-button');
        bookDeleteElement.addEventListener('click', _ => {
            myLibrary = myLibrary.filter(b => b.id !== book.id);
            displayBooks();
        });
        bookElement.appendChild(bookDeleteElement);

        libraryElement.appendChild(bookElement);
    }
}

function setupAddBookDialog() {
    const addBookButtonElement = document.querySelector('.add-book-button');
    const dialogElement = document.querySelector('.add-book-dialog');
    addBookButtonElement.addEventListener('click', _ => dialogElement.showModal());
}

function setupAddBookDialogClose() {
    const closeDialogButtonElement = document.querySelector('.dialog-close-button');
    const dialogElement = document.querySelector('.add-book-dialog');
    closeDialogButtonElement.addEventListener('click', _ => {
        dialogElement.close();
        resetDialogForm();
    });
}

function setupAddBookDialogAdd() {
    const dialogElement = document.querySelector('.add-book-dialog');
    const bookFormElement = document.querySelector('#book-form');
    const titleElement = document.querySelector('#title');
    const authorElement = document.querySelector('#author');
    const pagesElement = document.querySelector('#pages');
    const readElement = document.querySelector('#read');
    bookFormElement.addEventListener('submit', event => { 
        event.preventDefault();
        dialogElement.close();
        addBookToLibrary({
            title: titleElement.value,
            author: authorElement.value,
            pages: pagesElement.value,
            read: readElement.checked
        });
        resetDialogForm();
        displayBooks();
    });
}

function resetDialogForm() {
    const titleElement = document.querySelector('#title');
    const authorElement = document.querySelector('#author');
    const pagesElement = document.querySelector('#pages');
    const readElement = document.querySelector('#read');
    titleElement.value = '';
    authorElement.value = '';
    pagesElement.value = '';
    readElement.checked = false;
}