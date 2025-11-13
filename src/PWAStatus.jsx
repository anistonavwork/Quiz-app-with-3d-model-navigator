import { useRegisterSW } from 'virtual:pwa-register/react'

export default function PWAStatus() {
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker
  } = useRegisterSW()

  if (!offlineReady && !needRefresh) return null

  return (
    <div style={{
      position:'fixed', right: 12, bottom: 12, background: '#fff',
      border: '1px solid #ddd', padding: 8, borderRadius: 6
    }}>
      {offlineReady && <span>Ready to work offline.</span>}
      {needRefresh && (
        <>
          <span> New content available. </span>
          <button onClick={() => updateServiceWorker(true)}>Reload</button>
        </>
      )}
    </div>
  )
}
