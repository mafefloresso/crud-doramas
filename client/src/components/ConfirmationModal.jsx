import React from 'react'

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
        <h3 className="text-lg font-semibold">¿Estás seguro?</h3>
        <p>{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn btn-ghost">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn btn-error">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal