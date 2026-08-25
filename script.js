const library = new Library();
const renderer = new Renderer();
const dom = new DOM();
library.addBookToLibrary("Ars Obscura : Sorcier d'Empire", "François Barranger", 496, true);
library.addBookToLibrary("La Quête d'Ewilan : D'un Monde à l'Autre", "Pierre Bottero", 281, true);
dom.setup(library, renderer);
renderer.displayBooks(library);

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor.");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    return {
        id: this.id,
        title: this.title,
        author: this.author,
        pages: this.pages,
        read: this.read,
        toggleRead() {
            this.read = !this.read;
        }
    }
}

function Library() {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor.")
    }

    this.books = [];

    return {
        books: [...this.books],
        addBookToLibrary(title, author, pages, read) {
            const book = new Book(title, author, pages, read);
            this.books.push(book);
        }
    }
}

function Renderer() {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor.");
    }

    return {
        displayBooks(library) {
            const libraryEl = document.querySelector("#library");
            libraryEl.textContent = null;

            for (const book of library.books.toReversed()) {
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
    }
}

function DOM() {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call the constructor.");
    }

    function setupModalOpen() {
        const newBookButton = document.querySelector("#new-book-button");
        const dialog = document.querySelector("dialog");

        newBookButton.addEventListener("click", () => dialog.showModal());
    }

    function setupModalClose() {
        const closeDialogButton = document.querySelector("#dialog-close-button");
        const dialog = document.querySelector("dialog");

        closeDialogButton.addEventListener("click", () => dialog.close());
    }

    function setupForm(library, renderer) {
        const dialog = document.querySelector("dialog");
        const form = document.querySelector("#new-book-form");

        form.addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(form);
            const entries = Object.fromEntries(formData);
            console.log(entries);

            library.addBookToLibrary(entries.title, entries.author, entries.pages, entries.read === undefined ? false : true)
            renderer.displayBooks(library);
            dialog.close();
        });
    }

    return {
        setup(library, renderer) {
            setupModalOpen();
            setupModalClose();
            setupForm(library, renderer);
        }
    }
}