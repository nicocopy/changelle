
/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras 
*/

/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minusculas
No se permite acentuación de palabras   
*/
var botonEncriptar = capturarHtml("#btn-encriptar");
var botonDesencriptar = capturarHtml("#btn-desencriptar");
var botonCopy = capturarHtml("#btn-copy");
var mensajeBox = capturarHtml("#msg");
var tituloResultado = capturarHtml("#titulo-resultado");
var error = capturarHtml("#error");

//boton encriptar. Valida entrada de datos.
botonEncriptar.addEventListener("click",function(event){
    event.preventDefault();

    var textoIngresado = capturarTexto();
    
    if (validacionTextoIngresado(textoIngresado)){
        var textoEncriptado = encriptar(textoIngresado);
        mensajeBox.value = textoEncriptado;
        error.classList.add("invisible");
        tituloResultado.textContent = "Mensaje encriptado:";
        borrarTextoIngresado();
    }else{
        mensajeBox.value = "";
        error.classList.remove("invisible");
    }
});

//boton desencriptar. Valida entrada de datos.
botonDesencriptar.addEventListener("click",function(event){
    event.preventDefault();

    var textoIngresado = capturarTexto();

    if (validacionTextoIngresado(textoIngresado)){
        var textoDesencriptado = desencriptar(textoIngresado);
        mensajeBox.value = textoDesencriptado;
        error.classList.add("invisible");
        tituloResultado.textContent = "Mensaje desencriptado:";
        borrarTextoIngresado();
    }else{
        mensajeBox.value = "";
        error.classList.remove("invisible");
        
    }

});


botonCopy.addEventListener("click",function(event){
    event.preventDefault();
    mensajeBox.select();
    document.execCommand("copy");
    
});

//captura el datos
function capturarTexto(){
    let texto = document.querySelector("#texto-ingresado").value;
    return texto;
}

//capturar objeto de html document.querysSelector
function capturarHtml(nombre){
    let objeto = document.querySelector(nombre);
    return objeto;
}

function borrarTextoIngresado(){
    document.querySelector("#texto-ingresado").value = "";
}
//Elementos HTML para trabajarlos con js
const btnCopy = document.getElementById("btn-copy");
const btnEncrypt = document.querySelector('.btn-encriptar');
const btnDecrypt = document.querySelector('.btn-decencriptar');
const input = document.getElementById('input');
const output = document.getElementById('output');
const modal = document.querySelector('.modal');
const errorText = document.querySelectorAll('.error');

//función para mostrar errores al validar los inputs
function showError(input){
    input.classList.add('show');
    setTimeout( function (){
        input.classList.remove('show');
    },4000);
}

//función para copiar el mensaje en el portapapeles
const copyMessage = () => {
    var copyText = document.querySelector('#output');
    copyText.select();
    if (copyText.value === '') {
        showError(errorText[1]);
    }else{
        document.execCommand("copy");
        modal.classList.add('animacion');
        setTimeout(function (){
            modal.classList.remove('animacion');
        },3000);
    }
}

//funcion para validar el input
function validation(string){
    for (let i = 0; i < string.length; i++) {
        if (string[i] === string[i].toUpperCase()) {
            showError(errorText[0]);
            return true;
        }
    }
    if (!/^[a-zA-Z]+$/.test(string)) {
        showError(errorText[0])
        return true;
    }
    return false;
}

// funcion para encriptar el mensaje
const encrypt = e => {
    e.preventDefault();
    if (!validation(input.value)) {
        let arrayString = input.value.split('');
        var encryptMessage = arrayString.map( l => l === 'a' ? 'ai': l === 'i' ? 'imes': l === 'e' ? 'enter' : l === 'o' ? 'ober': l === 'u' ? 'ufat': l);
        return output.value = encryptMessage.join('');
    }
    return output.value = '';
}

// funcion para descencriptar el mensaje
const decrypt = e => {
    e.preventDefault();
    let value = input.value;
    if (!validation(value)) {
        value = value.replace('ai', 'a');
        value = value.replace('enter', 'e');
        value = value.replace('imes', 'i');
        value = value.replace('ober', 'o');
        value = value.replace('ufat', 'u');
        return output.value = value;
    }
    return output.value = '';
}

// monitore de eventos para los botones
btnCopy.addEventListener('click', copyMessage);
btnEncrypt.addEventListener('click', encrypt);
btnDecrypt.addEventListener('click', decrypt);