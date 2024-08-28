const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const sectionAnimes = document.querySelector('.js-section2')

let arrayAnime = []; //array general que en el que vamos a meter los datos para crear otros arrays más adelante ej. array de datos de naruto/array filtrado

const renderAnimes = (animes)=>{
    for (const eachAnime of animes){
        sectionAnimes.innerHTML='';

        const listAnimes = document.createElement('article');
        sectionAnimes.appendChild(listAnimes);
    
        const title = document.createElement('h2');
        const titleName = document.createTextNode(eachAnime.title);
        title.appendChild(titleName);
        listAnimes.appendChild(title);

        const image = document.createElement('img');
        image.setAttribute('src', eachAnime.images.jpg.image_url)
        image.setAttribute('alt', titleName);
        listAnimes.appendChild(image);
    }
}
const getdataApi = (value)=>{
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
    getdataApi(valueInput); //le pongo como parámetro a la función getDataApi el valor del input
}
searchBtn.addEventListener('click', handleClickSearch);
getdataApi('naruto'); //una vez que tengo los datos, los pinto al iniciar la página
