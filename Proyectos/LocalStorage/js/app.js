// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        // Busca los tweets, en caso de no existir crea un arreglo vacio
        tweets = JSON.parse(localStorage.getItem('tweets')) || [] ;

        // Muestro los tweets
        crearHTML();
    });
}


// Funciones
function agregarTweet(e){
    e.preventDefault();

    
    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if(tweet == ''){
        mostrarError('Un mensaje no puede ir vacio');
        return; // Evita que se ejecuten las lineas siguientes
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadiendo al arreglo
    // spread operator, hago una copia del contenido
    tweets = [...tweets, tweetObj];
    
    
    // Una vez agregado creamos el HTML
    crearHTML();
    
    // Limpio el formulario
    formulario.reset();
    
}

// Mostar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    
    // Inserto el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta luego de 3 segundos
    setTimeout(() =>{
        mensajeError.remove();
    }, 3000);
}


// Muestra listado de los tweets
function crearHTML(){
    // Limpio el HTML
    limpiarHTML()

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            
            // Crear el HTML
            const li = document.createElement('li');

            // Añadir texto
            li.innerText = tweet.tweet;

            // Asigno el boton
            li.appendChild(btnEliminar);

            // Insertando en el HTML
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

// Limpiar el HTML
function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// Agrega los tweets a LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id){
    // Array method = filter
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
    
}