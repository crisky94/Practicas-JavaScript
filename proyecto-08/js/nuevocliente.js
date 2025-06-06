
(function () {
    let DB;

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarCliente)
    })
    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);
    
        abrirConexion.onerror = function () {
            imprimirAlerta('Hubo un error al crear el cliente', 'error')
        }
    
        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
        }
    }

    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios.', 'error');
            return;
        }
        // console.log('Validando...')

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()

        }

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error al insertar el cliente.', 'error')
        }

        transaction.oncomplete = function() {
            imprimirAlerta('Cliente Agregado correctamente.');

            setTimeout(() => {
                window.location.href = 'index.html'
            }, 3000)
        }
    }
})()