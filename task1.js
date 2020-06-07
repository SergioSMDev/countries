let previousRegion;
const allCountriesUrl = 'https://restcountries.eu/rest/v2/all';
const regionUrl = 'https://restcountries.eu/rest/v2/region/';
const getRegionUrl = (regionName) => regionUrl + regionName;
const getLastWord = (url) => url.split('/').pop();

class Card{
    constructor(country){
        const card = {
                imgUrl: country.flag,
                name: country.name,
                capital: country.capital,
                population: country.population,
                region: country.region,
                timezones: this.initTimezones(country.timezones),
                currencies: this.initCurrencies(country.currencies),
                nameTranslations: this.initNameTranslations(country.translations),
            };
        this.cardTemplate = this.createCardTemplate(card);
    }

    getTemplate(){
        return this.cardTemplate;
    }

    initTimezones(timezones){
        return timezones.map(timezone => {
                return  `<li>${timezone}</li>`;
            }).join('');
    }

    initCurrencies(currencies){
        return currencies.map(currency => {
                return  `<li>${currency.code}${currency.symbol}</li>`;
            }).join('');
    }

    initNameTranslations(nameTranslations){
        const namesObj = {
            'de': nameTranslations.de,
            'es': nameTranslations.es,
            'it': nameTranslations.it,
        };
        return Object.entries(namesObj).map(name => {
            return  `<li>${name.join(': ')}</li>`;
        }).join('');
    }

    createCardTemplate(cardObj){
        return `<div class="country-card">
        <img class="flag" src="${cardObj.imgUrl}" alt="${cardObj.name}">
        <div>
            <h3 class="name">Country: ${cardObj.name}</h3>
            <div class="capital">Capital: ${cardObj.capital}</div>
            <div class="region">Region: ${cardObj.region}</div>
            <div class="population">Population: ${cardObj.population}</div>
            <ul class="timezones">Timezones:${cardObj.timezones}</ul>
            <ul class="currencies">Currencies:${cardObj.currencies}</ul>
            <ul class="name-translations">Name translations:${cardObj.nameTranslations}</ul>
        </div>
    </div>`;
    }
}

const loadCountries = (url) => {
    if(previousRegion && previousRegion === getLastWord(url)){
        return;
    }
    previousRegion = getLastWord(url);
    let loaderContainer = document.querySelector('.loader-container');

    document.getElementById('countries').classList.toggle('hidden');
    loaderContainer.classList.toggle('hidden');

    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = () => {
        if (xhr.status != 200) {
            console.error( 'Ошибка: ' + xhr.status);
            return;
        }

        const data = xhr.response;
        const allCardsTemplate = data.map( country => {
                                    return new Card(country).getTemplate();
                                }).join('');

        loaderContainer.classList.toggle('hidden');
        document.getElementById('countries').classList.toggle('hidden');
        document.getElementById('countries').innerHTML = allCardsTemplate;
    };

    xhr.onerror = () => console.error('нет соединения');
    xhr.send();
};

loadCountries(allCountriesUrl);

const regionHangler = (event) => loadCountries(getRegionUrl(event.target.value));
document.forms.regions.elements.region.forEach(element => element.addEventListener('click', regionHangler));



