// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables de los campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Variable para validación de formulario por expresión regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Eventos
cargarEventListeners();
function cargarEventListeners(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

}

// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
    if(e.target.value.length > 0) {
        // Elimina el mensaje de error
        const eliminarError = document.querySelector('p.error');

        if(eliminarError) {
            eliminarError.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');


    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mensajeError('Todos los campos son obligatorios');
    }

    // Validar el campo de email
    if(e.target.type === 'email') {
       
        // Validación de formilario por expresión regular
        if(er.test(e.target.value)) {
            // Elimina el mensaje de error
            const eliminarError = document.querySelector('p.error');
        
            if(eliminarError) {
                eliminarError.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mensajeError('El email no es válido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');       
    }
}

// Genera el mensaje de errorç
function mensajeError(mensaje) {
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('border', 'border-red-500', 'text-center', 'text-red-700', 'mt-5', 'p-3', 'error');

    const repiteError = document.querySelectorAll('.error');

    // Se ejecutará el código unicamente cuando tenga el valor de cero.
    if(repiteError.length === 0) {
        formulario.appendChild(error);
    }

}

function enviarEmail(e) {
    e.preventDefault();
    
    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Después de tres segundos ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

        const mensajeEnviado = document.createElement('p');
        mensajeEnviado.textContent = 'El mensaje se envió correctamente'
        mensajeEnviado.classList.add('border', 'border-green-500', 'text-center', 'text-white', 'my-10', 'p-3', 'bg-green-500', 'font-bold', 'uppercase');

        formulario.insertBefore(mensajeEnviado, spinner);

        setTimeout(() => {
            mensajeEnviado.remove();

            // Resetea el formulario
            formulario.reset();

            iniciarApp();

        }, 2000);
    }, 3000);
}

// Función que resetea el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}