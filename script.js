var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Book = /** @class */ (function () {
    function Book(title, author, isbn, availability) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availability = availability;
    }
    Book.prototype.getBookDetails = function () {
        return "".concat(this.title, " by ").concat(this.author, " ISBN: ").concat(this.isbn);
    };
    Book.prototype.getAvailability = function () {
        return this.availability;
    };
    Book.prototype.changeAvailability = function (status) {
        this.availability = status;
    };
    return Book;
}());
var Member = /** @class */ (function () {
    function Member(name, membershipId) {
        this.name = name;
        this.membershipId = membershipId;
        this.borrowedBooks = [];
    }
    Member.prototype.borrowBook = function (book) {
        if (book.getAvailability()) {
            if (this.borrowedBooks.length < 1) {
                book.changeAvailability(false);
                this.borrowedBooks.push(book);
            }
            else {
                console.log('You can borrow only 1 book');
            }
        }
        else {
            console.log('Book is borrowed by someone else');
        }
    };
    Member.prototype.returnBook = function (book) {
        var bookIndex = this.borrowedBooks.indexOf(book);
        if (bookIndex !== -1) {
            book.changeAvailability(true);
            this.borrowedBooks.splice(bookIndex, 1);
        }
    };
    Member.prototype.showBorrowedBooks = function () {
        this.borrowedBooks.forEach(function (book) { return console.log(book.getBookDetails()); });
    };
    return Member;
}());
var Library = /** @class */ (function () {
    function Library(name) {
        this.name = name;
        this.books = [];
        this.members = [];
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.removeBook = function (book) {
        var bookIndex = this.books.indexOf(book);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
        }
    };
    Library.prototype.addMember = function (member) {
        this.members.push(member);
    };
    Library.prototype.removeMember = function (member) {
        var memberIndex = this.members.indexOf(member);
        if (memberIndex !== -1) {
            this.members.splice(memberIndex, 1);
        }
    };
    Library.prototype.showAllBooks = function () {
        this.books.forEach(function (book) { return console.log(book.getBookDetails()); });
    };
    Library.prototype.showAllMembers = function () {
        this.members.forEach(function (member) { return console.log(member.name); });
    };
    Library.prototype.getAvailableBooks = function () {
        this.books.forEach(function (book) {
            if (book.getAvailability()) {
                console.log(book.getBookDetails());
            }
        });
    };
    Library.prototype.listBorrowedBooks = function () {
        this.members.forEach(function (member) {
            if (member.borrowedBooks.length > 0) {
                console.log("Member: ".concat(member.name));
                member.borrowedBooks.forEach(function (book) { return console.log(book.getBookDetails()); });
            }
        });
    };
    return Library;
}());
var PremiumMember = /** @class */ (function (_super) {
    __extends(PremiumMember, _super);
    function PremiumMember(name, membershipId) {
        return _super.call(this, name, membershipId) || this;
    }
    PremiumMember.prototype.borrowBook = function (book) {
        if (book.getAvailability()) {
            if (this.borrowedBooks.length < 5) {
                book.changeAvailability(false);
                this.borrowedBooks.push(book);
            }
            else {
                console.log('You can borrow only 5 books');
            }
        }
        else {
            console.log('Book is borrowed by someone else');
        }
    };
    return PremiumMember;
}(Member));
// Example usage
var library = new Library('Public Library');
var book1 = new Book('The Alchemist', 'Paulo Coelho', '978-0061122415', true);
var book2 = new Book('The Power of Habit', 'Charles Duhigg', '978-0812981605', true);
var member1 = new Member('Emma', 'MEM001');
var premiumMember = new PremiumMember('Olivia', 'PREM001');
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
