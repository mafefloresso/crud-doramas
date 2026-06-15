import React from 'react'

function TestForm() {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Formulario de Registro</h3>
        
        <form className="space-y-4">
            <label className="label">Nombre</label>
          <input type="text" placeholder="Nombre" className="input input-bordered w-full" />
          <label className="label">Imagen</label>
          <input type="text" placeholder="Imagen" className="input input-bordered w-full" />
          <label className='label'>Plot</label>
          <input type="text" placeholder="Plot" className="input input-bordered w-full" />
          <button className="btn btn-success w-full" type="submit">Registrar</button>
        </form>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </dialog>
  );
}

export default TestForm