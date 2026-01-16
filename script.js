const API_KEY = '54229235-245559b4eeb734fa629612201';
const API_URL = 'https://pixabay.com/api/';

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

const perPage = 20;
let page = Number(localStorage.getItem('page')) || 1;
let total = 0;

async function loadImages() {
    loading.style.display = 'block';
    error.textContent = '';

    try {
        const params = new URLSearchParams({
            key: API_KEY,
            editors_choice: true,
            page,
            per_page: perPage,
            safesearch: true
        });

        const res = await fetch(`${API_URL}?${params}`);
        const data = await res.json();

        total = data.totalHits;

        data.hits.forEach(img => {
            const image = document.createElement('img');
            image.src = img.webformatURL;
            image.alt = img.tags;
            gallery.appendChild(image);
        });

        if (page * perPage >= total) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'Більше немає зображень';
        }

        localStorage.setItem('page', page);
    } catch {
        error.textContent = 'Помилка завантаження';
    } finally {
        loading.style.display = 'none';
    }
}

loadMoreBtn.addEventListener('click', () => {
    page++;
    loadImages();
});

loadImages();
