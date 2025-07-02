'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'

// Wrap the main component with Suspense
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading verification...</div>}>
      <VerifyEmail />
    </Suspense>
  )
}

function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [disableButton, setDisableButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const urlToken = searchParams.get('token')
    setToken(urlToken)
  }, [searchParams])

  async function verify() {
    if (!token) {
      setMessage('No verification token found in URL')
      return
    }

    setIsLoading(true)
    setMessage('Verifying...')

    try {
      const res = await axios.post('/api/verifyemail', { token })
      setMessage(res.data.message)
      setDisableButton(true)
      // Optional: Redirect after successful verification
      // setTimeout(() => router.push('/login'), 2000)
    } catch (error) {
      console.error('Verification error:', error)
      setMessage(
        error.response?.data?.message || 
        'Verification failed. Please try again or contact support.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center gap-6 bg-gray-50 dark:bg-gray-900 p-4'>
      <button 
        onClick={verify}
        disabled={disableButton || isLoading}
        className="
          shadow-[0_0_0_3px_#000000_inset] 
          px-6 py-2 bg-transparent 
          border border-black dark:border-white 
          dark:text-white text-black 
          rounded-lg font-bold 
          transform hover:-translate-y-1 transition duration-400
          disabled:bg-gray-300 dark:disabled:bg-gray-700
          disabled:cursor-not-allowed
          disabled:opacity-50
          disabled:translate-y-0
          hover:disabled:translate-y-0
        "
      >
        {isLoading ? 'Verifying...' : 'Verify Email'}
      </button>
      <div className="text-lg font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm max-w-md w-full text-center">
        {message || (token ? 'Click verify to confirm your email' : 'Waiting for verification token...')}
      </div>
    </div>
  )
}