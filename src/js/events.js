import { refs } from './refs.js';
import { appendGalleryMarkup, clearGalleryMarkup } from './markupService.js'
import PhotoApiService from './apiService.js';
const API = new PhotoApiService();
const { notice, error } = require('@pnotify/core');

export async function onSearch(e) {
    try {
        e.preventDefault();
        const searchQuery = e.target.query.value;

        if (!searchQuery.trim()) {
            clearGalleryMarkup();
            refs.loadMoreBtn.setAttribute('style', 'display: none')
            notice({
                text: 'Please enter a search query'
            });
            return;
        }

        API.resetPage();
        API.countTotalResults();
        API.query = searchQuery;
        const photos = await API.fetchPhotos();

        clearGalleryMarkup();
        appendGalleryMarkup(photos);
        
        if (API.totalResults > photos.totalHits) {
            refs.loadMoreBtn.setAttribute('style', 'display: none')
        } else {
            refs.loadMoreBtn.setAttribute('style', 'display: block')
        }
    } catch (err) {
        notice({
            text: 'We have a problem! Please try again later'
        });
    }
}

export async function onLoadMore() {
    try {
        const photos = await API.fetchPhotos();
        appendGalleryMarkup(photos);
        API.countTotalResults();

        if (API.totalResults > photos.totalHits) {
            refs.loadMoreBtn.setAttribute('style', 'display: none')
        } else {
            refs.loadMoreBtn.setAttribute('style', 'display: block')
        }
    } catch (err) {
        notice({
            text: 'We have a problem! Please try again later'
        });
    }
}
