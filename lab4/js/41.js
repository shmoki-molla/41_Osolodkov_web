// Переключение темы
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    setCookie('theme', isDark ? 'dark' : 'light', 365);
});

// Загрузка темы из куки
const savedTheme = getCookie('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

// Лента отзывов
let reviews = [
    { name: "Иван", text: "Я взял кредит и теперь могу переворачивать коров целый день! Я счастливый человек", rating: 5, date: new Date(), image: null },
    { name: "Таджик", text: "أنا أوزبكي وأحب الله.", rating: 4, date: new Date(), image: null },
    { name: "Отзыв снизу", text: "меня напрягает отзыв сверху", rating: 3, date: new Date(), image: null }
];

const reviewsList = document.getElementById('reviewsList');
const reviewForm = document.getElementById('reviewForm');
const sortReviews = document.getElementById('sortReviews');
const filterReviews = document.getElementById('filterReviews');

function renderReviews() {
    reviewsList.innerHTML = '';
    const filteredReviews = reviews.filter(review => {
        const ratingFilter = filterReviews.value;
        return ratingFilter === 'all' || review.rating == ratingFilter;
    });

    const sortedReviews = filteredReviews.sort((a, b) => {
        if (sortReviews.value === 'date') {
            return b.date - a.date;
        } else {
            return b.rating - a.rating;
        }
    });

    sortedReviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <strong>${review.name}</strong> (Оценка: ${review.rating})<br>
            <p>${review.text}</p>
            ${review.image ? `<img src="${review.image}" alt="Изображение отзыва">` : ''}
            <small>${review.date.toLocaleString()}</small>
        `;
        reviewsList.appendChild(reviewItem);
    });
}

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const text = document.getElementById('reviewText').value;
    const rating = parseInt(document.getElementById('reviewRating').value);
    const imageFile = document.getElementById('reviewImage').files[0];

    if (name && text && rating >= 1 && rating <= 5) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newReview = {
                name,
                text,
                rating,
                date: new Date(),
                image: e.target.result
            };
            reviews.push(newReview);
            setCookie('reviews', JSON.stringify(reviews), 365);
            renderReviews();
            reviewForm.reset();
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            const newReview = {
                name,
                text,
                rating,
                date: new Date(),
                image: null
            };
            reviews.push(newReview);
            setCookie('reviews', JSON.stringify(reviews), 365);
            renderReviews();
            reviewForm.reset();
        }
    }
});

sortReviews.addEventListener('change', renderReviews);
filterReviews.addEventListener('change', renderReviews);

// Загрузка отзывов из куки
const savedReviews = getCookie('reviews');
if (savedReviews) {
    reviews = JSON.parse(savedReviews);
}

renderReviews();