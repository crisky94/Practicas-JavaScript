
function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function () {
        imprimirAlerta('Hubo un error al crear el cliente', 'error')
    }

    abrirConexion.onsuccess = function () {
        DB = abrirConexion.result;
    }
}


function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alerta');

    if (!alerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('px-4', 'py-3', 'rounded-md', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta');

        if (tipo == 'error') {
            divMensaje.classList.add('bg-red-100', 'border-2', 'border-red-400', 'text-red-700');
        } else {
            divMensaje.classList.add('bg-green-100', 'border-2', 'border-green-400', 'text-green-700');
        }
        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }
}