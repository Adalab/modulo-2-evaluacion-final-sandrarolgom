const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const sectionAnimes = document.querySelector('.js-section2');
const sectionAnimesFavorites = document.querySelector('.js-section1');

let arrayAnime = []; //array general que en el que vamos a meter los datos para crear otros arrays más adelante ej. array de datos de naruto/array filtrado
let animesFavorites = [] //array que hay que llenar con los animes clicados

const handleClickFav = (event)=>{
    const id = parseInt(event.currentTarget.id); //ADD PARSEINT

    const indexAnimeFavorite = animesFavorites.findIndex((item)=>item.mal_id === id); //constante que busque si el id pintado en caso de que lo haya, sea igual al id clicado, si no está, me devuelve -1
    console.log(indexAnimeFavorite); //aquí da -1 porque aun no hay nada en el array

    if (indexAnimeFavorite === -1){
        const animeClicked = arrayAnime.find((item)=>item.mal_id===id); //del array original, búscame el elemento cuyo id sea igual al id clicado
        animesFavorites.push(animeClicked) //en el array de animesfavorites, mete (push) el objeto clicado que está recogido en animeClicked
        console.log(animesFavorites);
        renderAnimes(arrayAnime); //tiene que ser el array general porque si ponemos el nuevo array te pinta solo el clicado
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
        listAnimes.setAttribute('id', eachAnime.mal_id) 
        sectionAnimes.appendChild(listAnimes);
        listAnimes.addEventListener('click', handleClickFav)
    
        const title = document.createElement('h2');
        const titleName = document.createTextNode(eachAnime.title);
        title.appendChild(titleName);
        listAnimes.appendChild(title);

        const image = document.createElement('img');
        image.setAttribute('src', eachAnime.images.jpg.image_url)
        image.setAttribute('alt', eachAnime.title);
        listAnimes.appendChild(image);

        const findAnimeFavorite = animesFavorites.find((item)=>item.mal_id === eachAnime.mal_id); //si el objeto con id es igual al id del clicado, añade la clase favorite
        if (findAnimeFavorite){
            listAnimes.setAttribute('class', 'favorite');
        }
    }
}
//renderizar la nueva función render con los favoritos
const renderAnimesFavorites = (animesFavorites)=>{
    sectionAnimesFavorites.innerHTML = ''
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
        imageFavorite.setAttribute('src', eachAnimeFavorite.images.jpg.image_url)
        imageFavorite.setAttribute('alt', eachAnimeFavorite.title);
        listAnimesFavorite.appendChild(imageFavorite);
    }
}

const getDataApi = (value)=>{
    fetch (`https://api.jikan.moe/v4/anime?q=${value}`)
    .then ((response)=> response.json())
    .then(data=>{
        // console.log(data);
        arrayAnime = data.data; //objeto.array (datos del servidor)
        renderAnimes(arrayAnime); //cuando llamo a la función renderAnimes, le estoy poniendo como parámetro el arrayAnime = a los datos del servidor
});
}
const handleClickSearch = (event)=>{
    event.preventDefault();
    const valueInput = input.value;
    getDataApi(valueInput); //le pongo como parámetro a la función getDataApi el valor del input
}
searchBtn.addEventListener('click', handleClickSearch);
getDataApi('naruto'); //una vez que tengo los datos, los pinto al iniciar la página
