const IIFE = (() => {
    function mostrarTodo (url, id) {
        id.setAttribute("src", url)
    }
    return {mostrarTodo};
})()

class Multimedia{
    #url;
    constructor(url){
        this.#url = url;
    }
    get url(){return this.#url;}
    set url(url){this.#url = url;}

    setInicio(){
        return `Este metodo es para realizar un cambio en la URL`;
    }
}
class Reproductor extends Multimedia{
    #id;
    constructor(url, id){
        super(url);
        this.#id = id;
    }
    get id(){return this.#id;}
    playMultimedia(){
        IIFE.mostrarTodo(this.url, this.#id);
    }

    setInicio(segundos){
        this.#id.setAttribute("src",`${this.url}?start=${segundos}`);
    }
}

const player = [new Reproductor("https://www.youtube.com/embed/YODCM26JXOY", document.querySelector('#musica')),
                new Reproductor("https://www.youtube.com/embed/JM2AzlewVNI", document.querySelector('#peliculas')),
                new Reproductor("https://www.youtube.com/embed/jEFTyAXOJ58", document.querySelector('#series'))];
player[0].playMultimedia();
player[1].playMultimedia();
player[2].playMultimedia();

function createElement(type, className = '', id = '', textContent = '', name = '', forAtt = '', value = '', typeAtt = ''){
    element = document.querySelector('.container').appendChild(document.createElement(type));
    element.className = className;
    element.id = id;
    element.name = name;
    element.textContent = textContent;
    if(typeAtt === 'radio') {
        element.type = typeAtt;
        element.value = value
    };
    if(type === 'label') element.for = forAtt;

}

createElement('h1', 'mt-3 text-center', '', 'Personaliza tus secciones!');
createElement('p', 'mt-3 mb-2 text-center text-danger', '', 'Se aceptan URL del tipo [https://www.youtube.com/watch?v=PiOj97ajIYU] [https://www.youtube.com/embed/PiOj97ajIYU] [PiOj97ajIYU]')
createElement('input', 'mt-5 mb-5 w-50', 'input_newURL');
createElement('input', 'd-inline-block ms-3', 'rdoMusica', '', 'section', '', 'musica', 'radio');
createElement('label', 'ms-2', '','Musica');
createElement('input', 'ms-3', 'rdoPeliculas', '', 'section', '', 'peliculas', 'radio');
createElement('label', 'ms-2', '','Peliculas');
createElement('input', 'ms-3', 'rdoSeries', '', 'section', '', 'series', 'radio');
createElement('label', 'ms-2', '','Series');
createElement('button', 'btn btn-primary', 'btn', 'Customize', '', '', '', 'button');

function swapURL(element){
    let newURL = document.getElementById('input_newURL').value;
    newURL = ((newURL.includes('embed/')) ? newURL.split("embed/")[1] : ((newURL.includes('?v=')) ? newURL.split("?v=")[1] : newURL));
    player.forEach(obj => {
        if(obj.id.id === element.value){
            obj.url = `${obj.url.split('embed')[0]}embed/${newURL}`;
            obj.playMultimedia();
            document.getElementById('input_newURL').value = '';
            return;
        }
    })
}

document.getElementById('btn').onclick = () => {
    document.getElementsByName('section').forEach(element => {
        if(element.checked){
            swapURL(element);
            return;
        }
    });
    
}