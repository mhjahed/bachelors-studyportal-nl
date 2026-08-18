import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import IconButton from '../IconButton/IconButton.jsx'
import './Modal.scss'

/**
 * Modal — Overlay dialog
 *
 * @param {boolean} open
 * @param {function} onClose
 * @param {string} title
 * @param {string} size          - 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} closeOnOverlay
 * @param {ReactNode} footer
 */
function Modal({
  open,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
  footer,
  children,
  className = ''
}) {
  useEffect(() => {
    if (!open) return

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="modal-portal" role="dialog" aria-modal="true">
      <div
        className="modal-portal__overlay"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      <div className={`modal-portal__container modal-portal__container--${size} ${className}`}>
        {(title || onClose) && (
          <div className="modal-portal__header">
            {title && <h3 className="modal-portal__title">{title}</h3>}
            {onClose && (
              <IconButton
                icon="bx-x"
                variant="ghost"
                size="sm"
                onClick={onClose}
                label="Close"
              />
            )}
          </div>
        )}
        <div className="modal-portal__body">{children}</div>
        {footer && <div className="modal-portal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

export default Modal