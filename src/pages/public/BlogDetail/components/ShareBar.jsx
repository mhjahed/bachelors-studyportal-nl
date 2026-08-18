import React from 'react'
import { IconButton, useToast } from '@components/common'
import './ShareBar.scss'

function ShareBar({ url, title }) {
  const toast = useToast()

  const share = (platform) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        break
      default:
        return
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className="share-bar">
      <span className="share-bar__label">Share</span>
      <div className="share-bar__actions">
        <IconButton icon="bxl-twitter" variant="ghost" size="sm" onClick={() => share('twitter')} label="Share on Twitter" />
        <IconButton icon="bxl-linkedin" variant="ghost" size="sm" onClick={() => share('linkedin')} label="Share on LinkedIn" />
        <IconButton icon="bxl-facebook" variant="ghost" size="sm" onClick={() => share('facebook')} label="Share on Facebook" />
        <IconButton icon="bxl-whatsapp" variant="ghost" size="sm" onClick={() => share('whatsapp')} label="Share on WhatsApp" />
        <IconButton icon="bx-link" variant="ghost" size="sm" onClick={copyLink} label="Copy link" />
      </div>
    </div>
  )
}

export default ShareBar