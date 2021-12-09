import { refs } from './refs.js'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';    
const { notice, error } = require('@pnotify/core');




export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalResults = 12;
    }

    async fetchPhotos() {
        try {
            const data = await fetch(`${refs.API_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${refs.API_KEY}`);
            const photoCollection = data.json();
            this.incrementPage();
            return photoCollection;
        } catch(err) {
            notice({
                text: 'We have a problem! Please try again later'
            });
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    countTotalResults() {
        this.totalResults = this.page * 12;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}