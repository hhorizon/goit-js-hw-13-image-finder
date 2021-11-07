import './sass/main.scss';
import PhotoApiService from './js/apiService.js';
import { refs } from './js/refs.js';
import photoCardTpl from './templates/photo-card.hbs';
const debounce = require('lodash.debounce');

const photoApiService = new PhotoApiService();

refs.searchForm.addEventListener(
    'input',
    debounce((e) => {
        onSearch(e.target.value);
    }, 1000),
);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.setAttribute('style', 'display: none');

async function onSearch(searchQuery) {
    if (!searchQuery.trim()) {
        clearGalleryMarkup();
        refs.loadMoreBtn.setAttribute('style', 'display: none')
        return;
    }

    photoApiService.resetPage();
    photoApiService.countTotalResults();
    photoApiService.query = searchQuery;
    const photos = await photoApiService.fetchPhotos();

    clearGalleryMarkup();
    appendGalleryMarkup(photos);
    
    if (photoApiService.totalResults > photos.totalHits) {
        refs.loadMoreBtn.setAttribute('style', 'display: none')
    } else {
        refs.loadMoreBtn.setAttribute('style', 'display: block')
    }
}

async function onLoadMore() {
    photoApiService.countTotalResults();
    const photos = await photoApiService.fetchPhotos();
    appendGalleryMarkup(photos);

    if (photoApiService.totalResults > photos.totalHits) {
        refs.loadMoreBtn.setAttribute('style', 'display: none')
    } else {
        refs.loadMoreBtn.setAttribute('style', 'display: block')
    }
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
