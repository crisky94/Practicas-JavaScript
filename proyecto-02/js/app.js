document.addEventListener('DOMContentLoaded', function () {

  const email = {
    email: '',
    cc: '',
    asunto: '',
    mensaje: '',
  };

  //console.log(email);

  //seleccionar los inputs
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const inputCC = document.querySelector('#cc');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');
  //Asignar eventos

  inputEmail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);
  inputCC.addEventListener('input', validar);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function (e) {
    e.preventDefault();

    resetFormulario();

  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      resetFormulario();

      const alertaExito = document.createElement('P');
      alertaExito.textContent = 'Mensaje enviado correctamente';
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'uppercase')

      formulario.appendChild(alertaExito);
      
      setTimeout(() => {
        alertaExito.remove();
      }, 3000)

    }, 3000);

  }

  function validar(e) {
  
    if (e.target.name !== 'cc' && e.target.value.trim() === '') {
      const referencia = e.target.parentElement;
      const input = e.target.name;
      mostrarAlerta(`El campo ${input} es obligatorio`, referencia);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }

    if (e.target.type === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta('El email no es valido', e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(email);

    //comprobar el objeto email

    comprobarEmail();

  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    const error = document.createElement('p');
    error.innerText = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'alerta');
    referencia.appendChild(error);

  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector('.alerta');
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;

  }

  function resetFormulario() {
    email.email = '';
    email.cc = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();
    comprobarEmail();
  }
});