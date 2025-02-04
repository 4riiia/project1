// استرجاع البيانات من localStorage عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", loadBooks);

// إضافة كتاب جديد
function addBook() {
    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("bookAuthor").value;
    let price = document.getElementById("bookPrice").value;
    let quantity = document.getElementById("bookQuantity").value;

    if (title === "" || author === "" || price === "" || quantity === "") {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push({ title, author, price, quantity });
    localStorage.setItem("books", JSON.stringify(books));

    loadBooks(); // تحديث الجدول
}

// تحميل وعرض الكتب من localStorage
function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        let row = `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.price} $</td>
            <td>${book.quantity}</td>
            <td>
                <button onclick="sellBook(${index})">بيع</button>
                <button onclick="deleteBook(${index})">حذف</button>
            </td>
        </tr>`;
        bookList.innerHTML += row;
    });
}

// بيع كتاب
function sellBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    if (books[index].quantity > 0) {
        books[index].quantity--;
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks();
    } else {
        alert("الكمية غير متوفرة!");
    }
}

// حذف كتاب
function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}