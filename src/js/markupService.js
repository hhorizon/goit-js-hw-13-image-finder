import { refs } from './refs';
import photoCardTpl from '../templates/photo-card.hbs';

export function appendGalleryMarkup(photos) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(photos));
    scrollToNextPage(photos.hits);
}

export function clearGalleryMarkup() {
    refs.gallery.innerHTML = '';
}

function scrollToNextPage(hits) {
    document.querySelector(`[data-id="${hits[0].id}"]`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}