
//medio
let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');

//artista
let title = document.querySelector('#title');
let artist = document.querySelector('#artist');
let pista_imagen = document.querySelector('#pista_imagen');

//lista
let present = document.querySelector('#present');
let total = document.querySelector('#total');

//volumen
let volumen_n= document.querySelector('#volumen_n');
let rango_volumen= document.querySelector('#volumen');
let iconoVolumen = document.querySelector('#volumen_icon');
//duracion
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');

let auto_play = document.querySelector('#auto');

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//crear un elemento de audio
let pista = document.createElement('audio');

//Lista de musica
let CancionesDatos = [
    {
      name: "Espera la lluvia",
      path: "music/minami.mp3",
      img: "img/minami.jpg",
      singer: "Minami"
    },
    {
      name: "Loco",
      path: "music/loco.mp3",
      img: "img/loco.jpg",
      singer: "Thiago PZK"
    },
    {
      name: "Entre Nosotros",
      path: "music/EntreNosotros.mp3",
      img: "img/EntreNosotros.jpg",
      singer: "Thiago PZK"
    },
    {
      name: "Op Erased",
      path: "music/ERASED.mp3",
      img: "img/ERASED.jpg",
      singer: "Asian Kung Fu"
    },
    {
      name: "Op Black Clover",
      path: "music/BlackClover10.mp3",
      img: "img/BlackClover10.jpg",
      singer: "Vicke Blanka"
    }
 ];


//Funcones
//función cargar la pista
function cargar_pista(index_no){
    //El clearInterval() método borra un temporizador ajustado con el setInterval() método.
    clearInterval(timer);
    reset_slider();
    pista.src = CancionesDatos[index_no].path;
    title.innerHTML = CancionesDatos[index_no].name;
    pista_imagen.src = CancionesDatos[index_no].img;
    artist.innerHTML = CancionesDatos[index_no].singer;
    //El evento load se dispara cuando un recurso y sus recursos dependientes han terminado de cargar
    pista.load();

    timer = setInterval(range_slider ,1000);
    total.innerHTML = CancionesDatos.length;
    present.innerHTML = index_no + 1;
}
cargar_pista(index_no);

//mutear sonido
function mute_sound(){
	pista.volume = 0;
  rango_volumen.value = 0;
	volumen_n.innerHTML = 0;
  iconoVolumen.classList.replace("fa-volume-up","fa-volume-mute");
}

// comprobando .. la canción se está reproduciendo o no
function justplay(){
  if(Playing_song==false){
    playsong();

  }else{
    pausesong();
  }
}
// restablecer la diapositiva de la canción
function reset_slider(){
  slider.value = 0;
}

// play song
function playsong(){
  pista.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}
//pause song
function pausesong(){
	pista.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}
// next song
function next_song(){
	if(index_no < CancionesDatos.length - 1){
		index_no += 1;
		cargar_pista(index_no);
		playsong();
    //console.log(index_no);
	}else{
		index_no = 0;
		cargar_pista(index_no);
		playsong();
	}
}
// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		cargar_pista(index_no);
		playsong();
    //console.log(index_no);
	}else{
		index_no = CancionesDatos.length-1;
		cargar_pista(index_no);
		playsong();
    //console.log(index_no);
	}
}
// Volumen cambio
function volume_change(){
	volumen_n.innerHTML = rango_volumen.value;
	pista.volume = rango_volumen.value / 100;
  iconoVolumen.classList.replace("fa-volume-mute","fa-volume-up");
}
// cambiar slider position 
function change_duration(){
	slider_position = pista.duration * (slider.value / 100);
	pista.currentTime = slider_position;
}
// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.1)";
       auto_play.style.color = "#769ffd";
	}else{
       autoplay = 1;
       auto_play.style.background = "#769ffd";
       auto_play.style.color = "#ffff";
	}
}
function range_slider(){
	let position = 0;
        
        // actualizar la posición del control deslizante
		if(!isNaN(pista.duration)){
		   position = pista.currentTime * (100 / pista.duration);
		   slider.value =  position;
	      }

       
       // la función se ejecutará cuando la canción termine
       if(pista.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       cargar_pista(index_no);
		       playsong();
           }
	    }
     }









