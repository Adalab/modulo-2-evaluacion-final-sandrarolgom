const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const sectionAnimes = document.querySelector('.js-section2');
const sectionAnimesFavorites = document.querySelector('.js-section1');

let arrayAnime = [];
let animesFavorites = [];

const handleClickFav = (event)=>{
    const id = parseInt(event.currentTarget.id);

    const indexAnimeFavorite = animesFavorites.findIndex((item)=>item.mal_id === id);
    console.log(indexAnimeFavorite);

    if (indexAnimeFavorite === -1){
        const animeClicked = arrayAnime.find((item)=>item.mal_id===id);
        animesFavorites.push(animeClicked);
        console.log(animesFavorites);
        renderAnimes(arrayAnime);
        const saveAnimesFavorites = localStorage.setItem('animesFavorites', JSON.stringify(animesFavorites));
        renderAnimesFavorites(animesFavorites);
    }
}

const renderAnimes = (animes)=>{
    sectionAnimes.innerHTML='';
    const titleSection = document.createElement('h3');
    const textTitleSection = document.createTextNode('Lista');
    titleSection.appendChild(textTitleSection);
    sectionAnimes.appendChild(titleSection);
    for (const eachAnime of animes){
        const listAnimes = document.createElement('article');
        listAnimes.setAttribute('id', eachAnime.mal_id);
        sectionAnimes.appendChild(listAnimes);
        listAnimes.addEventListener('click', handleClickFav);
    
        const title = document.createElement('h2');
        const titleName = document.createTextNode(eachAnime.title);
        title.appendChild(titleName);
        listAnimes.appendChild(title);

        const image = document.createElement('img');
        image.setAttribute('src', eachAnime.images.jpg.image_url);
        image.setAttribute('alt', eachAnime.title);
        listAnimes.appendChild(image);

        const findAnimeFavorite = animesFavorites.find((item)=>item.mal_id === eachAnime.mal_id);
        if (findAnimeFavorite){
            listAnimes.setAttribute('class', 'favorite');
        }
    }
}

const renderAnimesFavorites = (animesFavorites)=>{
    sectionAnimesFavorites.innerHTML = '';
    const titleSectionFavorites = document.createElement('h3');
    const textTitleSectionFavorites = document.createTextNode('Favoritos');
    titleSectionFavorites.appendChild(textTitleSectionFavorites);
    sectionAnimesFavorites.appendChild(titleSectionFavorites);

    for (const eachAnimeFavorite of animesFavorites){
        const listAnimesFavorite = document.createElement('article');
        sectionAnimesFavorites.appendChild(listAnimesFavorite);
    
        const titleFavorite = document.createElement('h2');
        const titleNameFavorite = document.createTextNode(eachAnimeFavorite.title);
        titleFavorite.appendChild(titleNameFavorite);
        listAnimesFavorite.appendChild(titleFavorite);

        const imageFavorite = document.createElement('img');
        imageFavorite.setAttribute('src', eachAnimeFavorite.images.jpg.image_url);
        imageFavorite.setAttribute('alt', eachAnimeFavorite.title);
        listAnimesFavorite.appendChild(imageFavorite);
    }
}

const getDataApi = (value)=>{
    fetch (`https://api.jikan.moe/v4/anime?q=${value}`)
    .then ((response)=> response.json())
    .then(data=>{
        arrayAnime = data.data;
        renderAnimes(arrayAnime);
    });
}

const handleClickSearch = (event)=>{
    event.preventDefault();
    const valueInput = input.value;
    getDataApi(valueInput);
}
searchBtn.addEventListener('click', handleClickSearch);

getDataApi('naruto');

const getAnimeFavoriteDataSave = JSON.parse(localStorage.getItem('animesFavorites'));

if(getAnimeFavoriteDataSave){
    animesFavorites = getAnimeFavoriteDataSave;
    renderAnimesFavorites(animesFavorites);
}


