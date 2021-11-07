const API_KEY = '24205372-949bb2d0c3f30747cb1e355dc';

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalResults = 12;
    }

    async fetchPhotos() {
        const photos = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
        const response = photos.json();
        this.incrementPage();

        return response;
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