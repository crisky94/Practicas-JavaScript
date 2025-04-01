const pacienteInput = document.querySelector('#paciente');
const porpietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');
const contenedorCitas = document.querySelector('#id');

const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
}

class Notificacion {

    constructor({ texto, tipo }) {
        this.texto = texto
        this.tipo = tipo
        this.mostrar()
    }

    mostrar() {

        const alerta = document.createElement('div');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        this.tipo == 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        const alertaPrevia = document.querySelector('.alert');

        alertaPrevia?.remove()

        alerta.textContent = this.texto

        formulario.parentElement.insertBefore(alerta, formulario)

        setTimeout(() => {
            alerta.remove()
        }, 3000)
    }
}

class AdminCitas {
    constructor(){
        this.citas  = []
    }

    agregar(cita){
        this.citas = [...this.citas, cita]
    }

    mostrar(){
        while(contenedorCitas.firstChild()){
            contenedorCitas.remove(contenedorCitas.firstChild())
        }
        
    }
}


pacienteInput.addEventListener('change', datosCita);

porpietarioInput.addEventListener('change', datosCita);

emailInput.addEventListener('change', datosCita);

fechaInput.addEventListener('change', datosCita);

sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', validarFormulario)



function datosCita(e) {
    citaObj[e.target.name] = e.target.value
}
const citas = new AdminCitas()
function validarFormulario(e) {
    e.preventDefault();

    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return
    } else {
        console.log(citaObj);
    }
    citas.agregar(citaObj)

}

