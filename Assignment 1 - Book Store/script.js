let users = [];
const books = {
    fiction: [
        { 
            title: 'The Great Gatsby', 
            author: 'F. Scott Fitzgerald',
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg'
        },
        { 
            title: '1984', 
            author: 'George Orwell',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg'
        }
    ],
    'non-fiction': [
        { 
            title: 'Sapiens', 
            author: 'Yuval Noah Harari',
            image: 'https://upload.wikimedia.org/wikipedia/en/0/06/%E1%B8%B2itsur_toldot_ha-enoshut.jpg'
        },
        { 
            title: 'The Power of Habit', 
            author: 'Charles Duhigg',
            image: 'https://upload.wikimedia.org/wikipedia/en/7/7f/The_Power_of_Habit.jpg'
        }
    ],
    novels: [
        { 
            title: 'Pride and Prejudice', 
            author: 'Jane Austen',
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/PrideAndPrejudiceTitlePage.jpg'
        },
        { 
            title: 'To Kill a Mockingbird', 
            author: 'Harper Lee',
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'
        }
    ],
    kids: [
        { 
            title: 'Charlie and the Chocolate Factory', 
            author: 'Roald Dahl',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charlie_and_the_Chocolate_Factory_%281964%29_front_cover%2C_first_US_edition.jpg/440px-Charlie_and_the_Chocolate_Factory_%281964%29_front_cover%2C_first_US_edition.jpg'
        },
        { 
            title: 'The Cat in the Hat', 
            author: 'Dr. Seuss',
            image: 'https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png'
        }
    ],
    science: [
        { 
            title: 'A Brief History of Time', 
            author: 'Stephen Hawking',
            image: 'https://upload.wikimedia.org/wikipedia/en/a/a3/BriefHistoryTime.jpg'
        },
        { 
            title: 'The Origin of Species', 
            author: 'Charles Darwin',
            image: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Origin_of_Species_title_page.jpg'
        }
    ],
    technology: [
        { 
            title: 'The Pragmatic Programmer', 
            author: 'Andy Hunt',
            image: 'https://m.media-amazon.com/images/I/41HXiIojloL._SX396_BO1,204,203,200_.jpg'
        }
    ],
    magazines: [
        { 
            title: 'National Geographic', 
            author: 'Various',
            image: 'https://upload.wikimedia.org/wikipedia/en/a/ad/National_Geographic_Magazine_March_2017_Cover.jpg'
        },
        { 
            title: 'Scientific American', 
            author: 'Various',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Scientific_American_LCCN2015645750.jpg/400px-Scientific_American_LCCN2015645750.jpg'
        }
    ]
};

const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const registrationSection = document.getElementById('registrationSection');
const loginSection = document.getElementById('loginSection');
const booksSection = document.getElementById('booksSection');
const booksList = document.getElementById('booksList');
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const email = document.getElementById('email').value;
    if (age < 10 || age > 90) {
        alert('Age must be between 10 and 90 years');
        return;
    }

    const categories = [];
    document.querySelectorAll('.form-check-input:checked').forEach(checkbox => {
        categories.push(checkbox.value);
    });

    if (categories.length === 0) {
        alert('Please select at least one book category');
        return;
    }

    if (users.find(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    users.push({
        name,
        age,
        email,
        categories
    });

    alert('Registration successful! Please login.');
    registrationForm.reset();
});
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const user = users.find(u => u.email === email);

    if (!user) {
        alert('User not found');
        return;
    }
    registrationSection.style.display = 'none';
    loginSection.style.display = 'none';
    booksSection.style.display = 'block';
    displayBooks(user.categories);
});

function displayBooks(userCategories) {
    booksList.innerHTML = '';

    userCategories.forEach(category => {
        const categoryBooks = books[category];
        if (categoryBooks) {
            categoryBooks.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'col-md-4 mb-4';
                bookCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${book.image}" 
                             class="card-img-top" 
                             alt="${book.title}"
                             style="height: 300px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">By ${book.author}</p>
                            <p class="card-text"><small class="text-muted">Category: ${category}</small></p>
                        </div>
                    </div>
                `;
                booksList.appendChild(bookCard);
            });
        }
    });
} 