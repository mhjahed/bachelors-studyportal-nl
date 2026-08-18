import React from 'react'
import Modal from '../Modal/Modal.jsx'
import Button from '../Button/Button.jsx'
import './ConfirmationDialog.scss'

/**
 * ConfirmationDialog — Standard confirm dialog
 *
 * @param {string} variant - 'danger' | 'warning' | 'info'
 */
function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  const iconMap = {
    danger: 'bx-error',
    warning: 'bx-error-circle',
    info: 'bx-info-circle',
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={null}
    >
      <div className={`confirm-dialog confirm-dialog--${variant}`}>
        <div className="confirm-dialog__icon">
          <i className={`bx ${iconMap[variant]}`}></i>
        </div>
        <h3 className="confirm-dialog__title">{title}</h3>
        {message && <p className="confirm-dialog__message">{message}</p>}
        <div className="confirm-dialog__actions">
          <Button variant="ghost" size="md" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="md"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationDialog