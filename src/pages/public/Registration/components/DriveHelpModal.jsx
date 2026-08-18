import React from 'react'
import { Modal, Button } from '@components/common'
import './DriveHelpModal.scss'

const STEPS = [
  {
    number: '01',
    title: 'Upload to Google Drive',
    text: 'Open drive.google.com and upload your profile photo.',
  },
  {
    number: '02',
    title: 'Right-click and share',
    text: 'Right-click the uploaded photo and select "Share".',
  },
  {
    number: '03',
    title: 'Change access to "Anyone with the link"',
    text: 'Under "General access", change it from "Restricted" to "Anyone with the link".',
  },
  {
    number: '04',
    title: 'Copy the link',
    text: 'Click "Copy link" and paste it into the URL field.',
  },
]

function DriveHelpModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="How to Get a Google Drive Image URL"
      size="md"
      footer={
        <Button variant="primary" onClick={onClose}>Got it</Button>
      }
    >
      <div className="drive-help">
        <p className="drive-help__intro">
          Follow these four steps to share your profile picture so it can be displayed on your profile.
        </p>

        <ol className="drive-help__list">
          {STEPS.map((step) => (
            <li key={step.number} className="drive-help__item">
              <span className="drive-help__number">{step.number}</span>
              <div className="drive-help__content">
                <h4 className="drive-help__title">{step.title}</h4>
                <p className="drive-help__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="drive-help__example">
          <span className="drive-help__example-label">Example URL</span>
          <code className="drive-help__example-code">
            https://drive.google.com/file/d/1a2B3c4D5e6F7g8H9i0J/view?usp=sharing
          </code>
        </div>

        <div className="drive-help__note">
          <i className="bx bx-info-circle"></i>
          <span>The URL must be publicly viewable. If sharing is set to "Restricted", the image will not load.</span>
        </div>
      </div>
    </Modal>
  )
}

export default DriveHelpModal