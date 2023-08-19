document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

//En esta función incluiremos las dem´sa tareas que creemos para así tenerlas y aligerar la carga de tareas
function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

// function navegacionFija(){
//     const header = document.querySelector('.header')
//     const video = document.querySelector('.video');

//     window.addEventListener('scroll', function() {
//         if(video.getBoundingClientRect().top < 0) {
//             header.classList.add('fijo');

//         }else {
//             header.classList.remove('fijo');
//         };
//     })
// }

//Crear el scroll smooth
function scrollNav() {
    //Se toman los datos de el nav y los enlances "a"
    const enlaces = document.querySelectorAll('.navegacion a');
    //Iteramos en cada uno de ellos
    enlaces.forEach(enlace => {
        //Agregamos una función de escucha de click
       enlace.addEventListener('click', function(e) {
        //Evitamos que se ejecute en los valores predeterminados
        e.preventDefault();
        //Creamos una variable con los atributos que extraeremos del evento click
        const seccionScroll = e.target.attributes.href.value;
        //Pasamos a otra variable los atributos extraidos anteriormente
        const seccion = document.querySelector(seccionScroll);
        //Creamos y aplicamos la nueva configuración del scroll
        seccion.scrollIntoView({ behavior: "smooth"});
       }); 
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria__imagenes');

    //Iterar en los elementos consecutivos en el orden
   for(let i = 1; i <=12; i++) {

    //Creamos y cargamos las imagenes pequeñas
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galería">`;

    //Detectar cuando se le da click a una imagen
    imagen.onclick = function() {
        mostrarImagen(i);
    }
    
    //Mostramos las imagenes en el HTML
    galeria.appendChild(imagen);
   }
}

//Mostras las imágenes grandes
function mostrarImagen(id){

    //Creamos la estructura HTML con el tag <picture>
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galería">`;

    //Creamos un overlay que se guardará en un <div>
    const overlay = document.createElement('DIV');
    //Agregamos el overlay a la imagen
    overlay.appendChild(imagen);
    //Creamos y agregamos la clase .overlay
    overlay.classList.add('overlay');
    //Cerrar las imagenes dando click en cualquier espaccio de la pantalla
    overlay.onclick = function() {
        const body = document.querySelector('body');
        //Remover clase fijar scroll del body
        body.classList.remove('fijar-body');
        //Remover el overlay al cerrar la imagen
        overlay.remove();
    }

    //boton para el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        //Remover clase fijar scroll del body
        body.classList.remove('fijar-body');
        //Remover el overlay al cerrar la imagen
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    //Mostramos las imagenes al dar click en el <body>
    const body = document.querySelector('body');
    body.appendChild(overlay);
    //Agregar clase para fijar el scroll en el body
    body.classList.add('fijar-body');
}

/*==================== Cambiar el background HEADER ====================*/
function navegacionFija() {
    const header = document.querySelector(".header");
    // Cuando el desplazamiento es mayor que 80 del viewport, agregua el scroll-header a la etiqueta header
    if (this.scrollY >= 80) header.classList.add("fijo");
    else header.classList.remove("fijo");
  }
  
  window.addEventListener("scroll", navegacionFija);




//*===== Link Active Work. Aplica la clase active-link cuando damos click a algún enlace de la navegación, de lo contrario lo elimina =====*/
const linkActive = document.querySelectorAll(".nav__link");

function activeLink() {
  linkActive.forEach((l) => l.classList.remove("active-link"));
  this.classList.add("active-link");
}

linkActive.forEach((l) => l.addEventListener("click", activeLink));


//*===== Escucha el escroll para aplicar el active-link a cada sección por la que pase y tenga un id =====*/
// Obtener todas las secciones que tienen una ID definida

const sections = document.querySelectorAll("section[id]");

// Agregue un detector de eventos escuchando el desplazamiento

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    // Obtener la posición del scroll actual en pantalla
    let scrollY = window.pageYOffset;
    // Ahora recorremos las secciones para obtener los valores de altura, top e ID de cada una
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");

        // Si nuestra posición de desplazamiento actual ingresa al espacio donde está la sección actual en la pantalla, agregue la clase .active al enlace de navegación correspondiente, de lo contrario, elimínelo
        // - Para saber qué enlace necesita una clase activa, usamos la variable sectionId que obtenemos mientras recorremos las secciones como un selector

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.navegacion a[href*=' + sectionId + ']').classList.add("active-link")
        }
        else 
        {
            document.querySelector('.navegacion a[href*=' + sectionId + ']').classList.remove("active-link")
        }

    })
}