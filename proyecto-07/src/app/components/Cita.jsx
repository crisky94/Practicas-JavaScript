import React from 'react';

function Cita({ cita, eliminarCita }) {
  return (
    <div className="p-8 bg-white border-b border-gray-300 text-black rounded-t-xl first:rounded-t-xl last:rounded-b-xl mb-4">
      <p className="font-bold mb-2">
        Mascota: <span className="font-normal">{cita.mascota}</span>
      </p>
      <p className="font-bold mb-2">
        Dueño: <span className="font-normal">{cita.propietario}</span>
      </p>
      <p className="font-bold mb-2">
        Fecha: <span className="font-normal">{cita.fecha}</span>
      </p>
      <p className="font-bold mb-2">
        Hora: <span className="font-normal">{cita.hora}</span>
      </p>
      <p className="font-bold mb-2">
        Síntomas: <span className="font-normal">{cita.sintomas}</span>
      </p>

      <button
        className="bg-pink-800 hover:bg-pink-900 text-white mt-8 px-4 py-2 rounded font-bold w-full"
        onClick={() => eliminarCita(cita.id)}
      >
        Eliminar &times;
      </button>
    </div>
  );
}

export default Cita;
