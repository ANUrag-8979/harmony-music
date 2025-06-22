'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'

const VerifyEmail = () => {
  // 1) We still keep useRouter() if you want to navigate after verification,
  //    but NOT for reading query params.
  const router = useRouter()

  // 2) Grab the “?token=…” from the URL
  const searchParams = useSearchParams()

  // 3) token will be a string | null (searchParams.get returns string or null)
  const [token, setToken] = useState()
  const [message, setMessage] = useState('')
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    // Every time the search‐params object changes, grab “token”
    const urlToken = searchParams.get('token') // string | null
    setToken(urlToken)
  }, [searchParams])

  async function verify() {
    if (!token) {
      setMessage('No token found in URL')
      return
    }
    console.log("tiken",token);
    try {
      // If your API expects a PUT with JSON body { token: "..."}:
      const res = await axios.post('/api/verifyemail', { token:token })

      console.log(res.data.message)
      setMessage(res.data.message)
      setDisableButton(true);
      // e.g. navigate somewhere after successful verify:
      // router.push('/login')
    } catch (error) {
      console.log(error);
      console.log('unable to verify…', error)
      setMessage('Verification failed!!')
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center gap-6 bg-gray-50 dark:bg-gray-900 p-4'>
  <button 
  onClick={verify}
  disabled={disableButton}
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
    Verify
  </button>
  <div className="text-lg font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm max-w-md w-full text-center">
    {message}
  </div>
</div>
  )
}

export default VerifyEmail
