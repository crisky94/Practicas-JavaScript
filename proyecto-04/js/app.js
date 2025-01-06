const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

eventListeners()

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHtml()
    })
}


function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;

    if(tweet == ''){
        mostrarError('El tweet no puede estar vacío.');
        // throw new Error('El tweet no puede estar vacío.');
        return
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];

    crearHtml();

    formulario.reset()

}


function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError); 

    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}

function crearHtml(){
    limpiarHtml()

    if (tweets.length > 0) {

        tweets.forEach( tweet => {

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
    
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            li.appendChild(btnEliminar)

            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

function limpiarHtml() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function  sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id)

    crearHtml();
}