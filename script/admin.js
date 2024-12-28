const baseUrl = 'https://your-glitch-json-server.com/books';

const loginData = JSON.parse(localStorage.getItem('loginData'));
if (!loginData || loginData.email !== 'admin@empher.com') {
  alert('Admin Not Logged In');
  window.location.href = 'index.html';
}

document.getElementById('bookForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const book = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    category: document.getElementById('category').value,
    isAvailable: true,
    isVerified: false,
    borrowedDays: null,
    imageUrl: "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg"
  };

  await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  alert('Book Added Successfully');
  loadBooks();
});

async function loadBooks() {
  const res = await fetch(baseUrl);
  const books = await res.json();
  const container = document.getElementById('bookList');
  container.innerHTML = books.map(book => `
    <div>
      <img src="${book.imageUrl}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <button onclick="verifyBook('${book.id}')">Verify Book</button>
      <button onclick="deleteBook('${book.id}')">Delete Book</button>
    </div>
  `).join('');
}

async function verifyBook(id) {
  if (confirm('Are you sure to Verify?')) {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVerified: true })
    });
    loadBooks();
  }
}

async function deleteBook(id) {
  if (confirm('Are you sure to Delete?')) {
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    loadBooks();
  }
}

loadBooks();
