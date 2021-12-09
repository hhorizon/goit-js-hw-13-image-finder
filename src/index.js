import './sass/main.scss';
import { refs } from './js/refs.js';
import { onSearch, onLoadMore } from './js/events'
const debounce = require('lodash.debounce');


refs.searchForm.addEventListener(
    'submit', (e) => {
        onSearch(e);
    }
);

refs.loadMoreBtn.setAttribute('style', 'display: none');
refs.loadMoreBtn.addEventListener('click', onLoadMore);
