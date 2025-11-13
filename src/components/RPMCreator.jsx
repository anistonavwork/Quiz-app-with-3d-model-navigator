import { AvatarCreator } from '@readyplayerme/react-avatar-creator'

export default function RPMCreator({ open, onClose, onAvatar }) {
  if (!open) return null

  const subdomain = import.meta.env.VITE_RPM_SUBDOMAIN || 'demo'
  const config = {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: true,
    language: 'en'
  }

  const style = { width: '100%', height: '100vh', border: 'none' }

  const handleExport = async (evt) => {
    const url = evt?.data?.url
    if (url) {
      try {
        await navigator.clipboard.writeText(url)
        alert('Avatar URL copied to clipboard:\n\n' + url + '\n\nPaste this into .env as VITE_RPM_AVATAR_URL')
      } catch {
        alert('Avatar URL:\n\n' + url + '\n\nCopy it and paste into .env as VITE_RPM_AVATAR_URL')
      }
      onAvatar?.(url)
    }
    onClose?.()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 50
    }}>
      <AvatarCreator
        subdomain={subdomain}
        config={config}
        style={style}
        onAvatarExported={handleExport}
      />
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 12, right: 12, padding: '8px 12px' }}
      >
        Close
      </button>
    </div>
  )
}
