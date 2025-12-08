import { useRef, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase/firebase.init'
import CloudinaryUploadTest from './components/CloudinaryUploadTest'
import './App.css'

function App() {
  const modalRef = useRef(null)
  const googleProviderRef = useRef(new GoogleAuthProvider())
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleAvatarError = () =>
    setUser((prev) => (prev ? { ...prev, photoURL: '' } : prev))

  const openModal = () => {
    modalRef.current?.showModal()
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithPopup(auth, googleProviderRef.current)
      const signedInUser = result.user
      setUser({
        displayName: signedInUser.displayName ?? '',
        email: signedInUser.email ?? '',
        photoURL: signedInUser.photoURL ?? '',
      })
    } catch (err) {
      setError(err?.message ?? 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    setError(null)
    try {
      await signOut(auth)
      setUser(null)
    } catch (err) {
      setError(err?.message ?? 'Sign-out failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center p-4">
      <div className="max-w-3xl w-full flex flex-col gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="card-title text-xl">Google Login Check</h2>
              <div className={`badge ${user ? 'badge-success badge-outline' : 'badge-ghost'}`}>
                {user ? 'Signed in' : 'Signed out'}
              </div>
            </div>

            {error ? (
              <div className="alert alert-error flex items-center gap-3">
                <span className="font-semibold">Error</span>
                <span className="text-sm">{error}</span>
              </div>
            ) : null}

            {user ? (
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User avatar'}
                        referrerPolicy="no-referrer"
                        onError={handleAvatarError}
                      />
                    ) : (
                      <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full">
                        {user.displayName?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">{user.displayName || 'No display name'}</p>
                  <p className="text-sm text-base-content/70">{user.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-base-content/70">
                Click the button below to sign in with Google and verify Firebase auth is wired up.
              </p>
            )}

            <div className="card-actions justify-end">
              {user ? (
                <button className="btn btn-outline" onClick={handleLogout} disabled={loading}>
                  {loading ? 'Signing out...' : 'Sign out'}
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleGoogleLogin} disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in with Google'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-6">
            <h1 className="card-title text-2xl">DaisyUI Modal Check</h1>
            <p className="text-sm text-base-content/70">
              Click the button to open a modal. If the modal looks styled with DaisyUI and Tailwind classes, everything is wired correctly.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={openModal}>
                Open Modal
              </button>
            </div>
          </div>
        </div>

        {/* Cloudinary Upload Test */}
        <CloudinaryUploadTest />
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">DaisyUI is hooked up</h3>
          <p className="py-2">
            You are seeing the DaisyUI modal component styled via Tailwind. The backdrop and button styles also come from DaisyUI.
          </p>
          <div className="flex gap-2 pt-2">
            <div className="badge badge-primary">DaisyUI</div>
            <div className="badge badge-outline">Tailwind</div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default App
