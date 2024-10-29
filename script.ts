class Book {
    title: string;
    author: string;
    isbn: string;
    availability: boolean;

    constructor(title: string, author: string, isbn: string, availability: boolean) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availability = availability;
    }

    getBookDetails(): string {
        return `${this.title} by ${this.author} ISBN: ${this.isbn}`;
    }

    getAvailability(): boolean {
        return this.availability;
    }

    changeAvailability(status: boolean): void {
        this.availability = status;
    }
}

class Member {
    name: string;
    membershipId: string;
    borrowedBooks: Book[];

    constructor(name: string, membershipId: string) {
        this.name = name;
        this.membershipId = membershipId;
        this.borrowedBooks = [];
    }

    borrowBook(book: Book): void {
        if (book.getAvailability()) {
            if (this.borrowedBooks.length < 1) {
                book.changeAvailability(false);
                this.borrowedBooks.push(book);
            } else {
                console.log('You can borrow only 1 book');
            }
        } else {
            console.log('Book is borrowed by someone else');
        }
    }

    returnBook(book: Book): void {
        const bookIndex = this.borrowedBooks.indexOf(book);
        if (bookIndex !== -1) {
            book.changeAvailability(true);
            this.borrowedBooks.splice(bookIndex, 1);
        }
    }

    showBorrowedBooks(): void {
        this.borrowedBooks.forEach(book => console.log(book.getBookDetails()));
    }
}

class Library {
    name: string;
    books: Book[];
    members: Member[];

    constructor(name: string) {
        this.name = name;
        this.books = [];
        this.members = [];
    }

    addBook(book: Book): void {
        this.books.push(book);
    }

    removeBook(book: Book): void {
        const bookIndex = this.books.indexOf(book);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
        }
    }

    addMember(member: Member): void {
        this.members.push(member);
    }

    removeMember(member: Member): void {
        const memberIndex = this.members.indexOf(member);
        if (memberIndex !== -1) {
            this.members.splice(memberIndex, 1);
        }
    }

    showAllBooks(): void {
        this.books.forEach(book => console.log(book.getBookDetails()));
    }

    showAllMembers(): void {
        this.members.forEach(member => console.log(member.name));
    }

    getAvailableBooks(): void {
        this.books.forEach(book => {
            if (book.getAvailability()) {
                console.log(book.getBookDetails());
            }
        });
    }

    listBorrowedBooks(): void {
        this.members.forEach(member => {
            if (member.borrowedBooks.length > 0) {
                console.log(`Member: ${member.name}`);
                member.borrowedBooks.forEach(book => console.log(book.getBookDetails()));
            }
        });
    }
}

class PremiumMember extends Member {
    constructor(name: string, membershipId: string) {
        super(name, membershipId);
    }

    borrowBook(book: Book): void {
        if (book.getAvailability()) {
            if (this.borrowedBooks.length < 5) {
                book.changeAvailability(false);
                this.borrowedBooks.push(book);
            } else {
                console.log('You can borrow only 5 books');
            }
        } else {
            console.log('Book is borrowed by someone else');
        }
    }
}

// Example usage
const library = new Library('Public Library');

const book1 = new Book('The Alchemist', 'Paulo Coelho', '978-0061122415', true);
const book2 = new Book('The Power of Habit', 'Charles Duhigg', '978-0812981605', true);
const member1 = new Member('Emma', 'MEM001');
const premiumMember = new PremiumMember('Olivia', 'PREM001');

library.addBook(book1);
library.addBook(book2);
library.addMember(member1);

console.log('All Books:');
library.showAllBooks();

console.log('All Members:');
library.showAllMembers();

console.log('Borrowing Books:');
member1.borrowBook(book1);
premiumMember.borrowBook(book2);

console.log('Available Books:');
library.getAvailableBooks();
