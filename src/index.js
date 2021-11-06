import './sass/main.scss';
import PhotoApiService from './js/apiService.js';
import { refs } from './js/refs.js';
import photoCardTpl from './templates/photo-card.hbs';
const debounce = require('lodash.debounce');

const photoApiService = new PhotoApiService();

refs.input.addEventListener(
    'input',
    debounce((e) => {
        onSearch(e.target.value);
    }, 500),
);

refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.setAttribute('style', 'display: none')

async function onSearch(searchQuery) {
    photoApiService.query = searchQuery;
    photoApiService.resetPage();
    const photos = await photoApiService.fetchPhotos();
    clearGalleryMarkup();
    appendGalleryMarkup(photos);
    refs.loadMoreBtn.setAttribute('style', 'display: block')
}

async function onLoadMore() {
    const photos = await photoApiService.fetchPhotos();
    appendGalleryMarkup(photos);
}

function appendGalleryMarkup(photos) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(photos));
    refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function clearGalleryMarkup() {
    refs.gallery.innerHTML = '';
}
