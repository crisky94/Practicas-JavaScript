import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Formulario({ crearCita }) {
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  const [error, actualizarError] = useState(false);

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const submitCita = e => {
    e.preventDefault();

    if (
      Object.values(cita).some(valor => valor.trim() === '')
    ) {
      actualizarError(true);
      return;
    }

    actualizarError(false);

    cita.id = uuidv4();
    crearCita(cita);

    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',
    });
  };

  return (
    <div>
      {error && (
        <p className=" text-red-800 p-4 text-xl uppercase text-center font-bold">
          ⚠️ Todos los campos son obligatorios
        </p>
      )}

      <form onSubmit={submitCita} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <label className="block text-black text-sm font-bold mb-2">Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-4"
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label className="block text-black text-sm font-bold mb-2">Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-4"
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label className="block text-black text-sm font-bold mb-2">Fecha</label>
        <input
          type="date"
          name="fecha"
          className="w-full h-[38px] px-2.5 py-1.5 border border-gray-300 rounded mb-4"
          onChange={actualizarState}
          value={cita.fecha}
        />

        <label className="block text-black text-sm font-bold mb-2">Hora</label>
        <input
          type="time"
          name="hora"
          className="w-full h-[38px] px-2.5 py-1.5 border border-gray-300 rounded mb-4"
          onChange={actualizarState}
          value={cita.hora}
        />

        <label className="block text-black text-sm font-bold mb-2">Síntomas</label>
        <textarea
          name="sintomas"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-4"
          onChange={actualizarState}
          value={cita.sintomas}
        ></textarea>

        <button
          type="submit"
          className="bg-cyan-500 shadow-lg shadow-cyan-500/50 cursor-pointer text-black font-bold py-2 px-4 rounded w-full"
        >
          Agregar Cita
        </button>
      </form>
    </div>
  );
}

export default Formulario;
