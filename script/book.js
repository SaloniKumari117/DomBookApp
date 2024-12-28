const userData = JSON.parse(localStorage.getItem('loginData'));
if (!userData || userData.email !== 'user@empher.com') {
  alert('User Not Logged In');
  window.location.href = 'index.html';
}

async function fetchBooks(filter) {
  const res = await fetch(baseUrl);
  const books = await res.json();
  return books.filter(filter);
}

async function showAvailableBooks() {
  const books = await fetchBooks(book => book.isAvailable);
  document.getElementById('bookList').innerHTML = books.map(book => `
    <div>
      <h3>${book.title}</h3>
      <button onclick="borrowBook('${book.id}')">Borrow Book</button>
    </div>
  `).join('');
}

async function borrowBook(id) {
  const days = prompt('Enter borrowing duration (max 10 days):');
  if (days <= 10) {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable: false, borrowedDays: days })
    });
    alert('Book Borrowed Successfully');
    showAvailableBooks();
  }
}
