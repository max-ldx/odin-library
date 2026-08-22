const library = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
}

function displayBooks() {
    const libraryEl = document.querySelector("#library");

    for (const book of library) {
        const bookEl = document.createElement("div");
        const titleEl = document.createElement("h2");
        const authorEl = document.createElement("p");
        const pagesEl = document.createElement("p");
        const readEl = document.createElement("p");

        bookEl.classList.add("book");

        bookEl.appendChild(titleEl);
        bookEl.appendChild(authorEl);
        bookEl.appendChild(pagesEl);
        bookEl.appendChild(readEl);

        titleEl.textContent = book.title;
        authorEl.textContent = book.author;
        pagesEl.textContent = `${book.pages} p.`;
        readEl.textContent = book.read ? "Yes" : "No";

        libraryEl.appendChild(bookEl);
    }
}

addBookToLibrary("Ars Obscura : Sorcier d'Empire", "François Barranger", 496, true);
addBookToLibrary("La Quête d'Ewilan : D'un Monde à l'Autre", "Pierre Bottero", 281, true);
displayBooks();