'use client'
import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  const [citas, guardarCitas] = useState([]);

  // Obtener citas desde localStorage cuando el componente monte
  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas') || '[]');
    guardarCitas(citasGuardadas);
  }, []);

  // Guardar citas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas]);

  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  };

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <div className='flex flex-col h-200'>
      <h1 className="text-black py-12 text-center uppercase font-staatliches tracking-wide text-4xl">
        Administrador de pacientes
      </h1>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-slate-700 py-12 text-center uppercase font-staatliches tracking-wide text-2xl">
              {titulo}
            </h2>
            {citas.map(cita => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
