// src/components/common/Toast/Toast.jsx
import React, { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './Toast.scss'

const ToastContext = createContext(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      message,
      variant: options.variant || 'info',
      duration: options.duration ?? 4000,
      title: options.title,
    }
    setToasts((prev) => [...prev, toast])

    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration)
    }

    return id
  }, [remove])

  const toast = {
    show,
    success: (msg, opts) => show(msg, { ...opts, variant: 'success' }),
    error: (msg, opts) => show(msg, { ...opts, variant: 'error' }),
    warning: (msg, opts) => show(msg, { ...opts, variant: 'warning' }),
    info: (msg, opts) => show(msg, { ...opts, variant: 'info' }),
    dismiss: remove,
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {createPortal(
        <div className="toast-container">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }) {
  const iconMap = {
    success: 'bx-check-circle',
    error: 'bx-x-circle',
    warning: 'bx-error-circle',
    info: 'bx-info-circle',
  }

  return (
    <div className={`toast toast--${toast.variant}`}>
      <i className={`bx ${iconMap[toast.variant]} toast__icon`}></i>
      <div className="toast__content">
        {toast.title && <span className="toast__title">{toast.title}</span>}
        <span className="toast__message">{toast.message}</span>
      </div>
      <button
        className="toast__close"
        onClick={onClose}
        aria-label="Close"
      >
        <i className="bx bx-x"></i>
      </button>
    </div>
  )
}