// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const fetchBtn = document.getElementById('fetchBtn');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalVideo = document.getElementById('modalVideo');
const modalVideoLink = document.getElementById('modalVideoLink');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const closeModal = document.getElementById('closeModal');
const spaceFact = document.getElementById('spaceFact');

const PROXY_URL = 'https://nasa-apod-proxy.<your-subdomain>.workers.dev';

fetchBtn.addEventListener('click', async () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  gallery.innerHTML = '<p class="loading">🚀 Loading space photos...</p>';

  try {
    const response = await fetch(`${PROXY_URL}?start_date=${startDate}&end_date=${endDate}`);

    if (!response.ok) {
      throw new Error('Failed to fetch NASA APOD data');
    }

    const data = await response.json();
    renderGallery(data);
  } catch (error) {
    gallery.innerHTML = '<p class="error">⚠️ Unable to load space photos right now.</p>';
    console.error(error);
  }
});

const spaceFacts = [
  'A day on Venus lasts longer than a year on Venus.',
  'Neutron stars are so dense that a teaspoon would weigh billions of tons.',
  'The Sun contains more than 99% of the mass in our solar system.',
  'There are more stars in the universe than grains of sand on Earth.',
  'Mars has the tallest volcano in the solar system, Olympus Mons.',
  'A black hole can warp time so strongly that time slows down near it.',
  'Jupiter has a storm larger than Earth that has lasted for centuries.'
];

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

function displayRandomFact() {
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  spaceFact.textContent = randomFact;
}

document.addEventListener('DOMContentLoaded', displayRandomFact);

function openModal(item) {
  modalImg.classList.add('hidden');
  modalVideo.classList.add('hidden');
  modalVideoLink.classList.add('hidden');
  modalVideo.src = '';

  if (item.media_type === 'video') {
    const isEmbeddable = item.url.includes('youtube.com/embed') || item.url.includes('player.vimeo.com');

    if (isEmbeddable) {
      modalVideo.classList.remove('hidden');
      modalVideo.src = item.url;
    } else {
      modalVideoLink.classList.remove('hidden');
      modalVideoLink.href = item.url;
    }
  } else {
    modalImg.classList.remove('hidden');
    modalImg.src = item.hdurl || item.url;
  }

  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;
  modal.classList.remove('hidden');
}

function renderGallery(items) {
  gallery.innerHTML = '';

  if (!items || items.length === 0) {
    gallery.innerHTML = '<p class="error">No space photos found for that date range.</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.addEventListener('click', () => openModal(item));

    let mediaContent;

    if (item.media_type === 'video') {
      mediaContent = document.createElement('div');
      mediaContent.className = 'video-badge';
      mediaContent.textContent = '🎥 Video';
    } else {
      mediaContent = document.createElement('img');
      mediaContent.src = item.url;
      mediaContent.alt = item.title;
    }

    const title = document.createElement('h3');
    title.textContent = item.title;

    const date = document.createElement('p');
    date.textContent = item.date;

    card.appendChild(mediaContent);
    card.appendChild(title);
    card.appendChild(date);
    gallery.appendChild(card);
  });
}

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
  modalVideo.src = '';
  modalVideoLink.classList.add('hidden');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
    modalVideo.src = '';
    modalVideoLink.classList.add('hidden');
  }
});

fetchBtn.addEventListener('click', async () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  gallery.innerHTML = '<p class="loading">🚀 Loading space photos...</p>';

  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`);

    if (!response.ok) {
      throw new Error('Failed to fetch NASA APOD data');
    }

    const data = await response.json();
    renderGallery(data);
  } catch (error) {
    gallery.innerHTML = '<p class="error">⚠️ Unable to load space photos right now.</p>';
    console.error(error);
  }
});
