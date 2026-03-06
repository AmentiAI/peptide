'use client'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isDatabaseError = error.message.includes('DATABASE_URL')
  const isAdminSecretError = error.message.includes('ADMIN_SECRET')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 p-8 max-w-2xl w-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Admin Panel Configuration Required
            </h1>
            
            {isDatabaseError ? (
              <>
                <p className="text-gray-700 mb-4">
                  The database connection is not configured. Please set the following environment variable in Vercel:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm">
                  <div className="text-red-600 font-semibold mb-2">Missing:</div>
                  <div>DATABASE_URL=postgresql://username:password@host/database</div>
                </div>
              </>
            ) : isAdminSecretError ? (
              <>
                <p className="text-gray-700 mb-4">
                  The admin secret key is not configured. Please set the following environment variable in Vercel:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm">
                  <div className="text-red-600 font-semibold mb-2">Missing:</div>
                  <div>ADMIN_SECRET=your-secret-key-here</div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Generate a secret: <code className="bg-gray-100 px-2 py-1 rounded">node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"</code>
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-4">
                  An error occurred while loading the admin panel:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm text-red-600">
                  {error.message}
                </div>
              </>
            )}
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Go to Vercel dashboard → Settings → Environment Variables</li>
                <li>Add required variables (see ADMIN_SETUP.md)</li>
                <li>Redeploy or wait for automatic deployment</li>
                <li>Refresh this page</li>
              </ol>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <a
                href="/admin/login"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            📖 For detailed setup instructions, see <code className="bg-gray-100 px-2 py-0.5 rounded">ADMIN_SETUP.md</code> in the repository.
          </p>
        </div>
      </div>
    </div>
  )
}
