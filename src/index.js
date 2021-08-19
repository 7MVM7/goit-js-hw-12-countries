import './sass/main.scss';

import Fetch from '../src/js/fetchCountries';
import boxCountry from '../src/templates/country-card';
import countriesMarkup from '../src/templates/countriesMarkup';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import debounce from 'lodash.debounce';
import { error, notice } from '@pnotify/core';

const refs = {
  cardContainer: document.querySelector('.card-container'),
  searchForm: document.querySelector('.js-input'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value;

  refs.cardContainer.innerHTML = '';

  if (searchQuery.length < 1 && searchQuery === ' ' && searchQuery === '.') return;

  Fetch.fetchCountries(searchQuery).then(searchInfo).catch(myNotice);
}

function searchInfo(countries) {
  if (countries.length > 10) {
    error({
      text: 'Спробуй ще, і тобі повезе',
      delay: 5000,
    });
  }

  if (countries.status === 404) {
    errorMessage('О йо ОЙ ');
  }
  if (countries.length > 1 && countries.length < 10) {
    refs.cardContainer.innerHTML = countriesMarkup(countries);
  }
  if (countries.length === 1) {
    refs.cardContainer.innerHTML = boxCountry(...countries);
  }
}

function errorMessage(message) {
  error({
    title: `${message}`,
    delay: 2000,
  });
}
const myNotice = () => {
  notice({
    text: 'Та такого бути не може',
    delay: 2000,
  });
};
