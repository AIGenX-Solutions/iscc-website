'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader2, CheckCircle2, XCircle } from 'lucide-react'

interface SubscriptionState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

export function NewsletterSubscription() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubscriptionState>({
    status: 'idle',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setState({
        status: 'error',
        message: 'Please enter your email address.',
      })
      return
    }

    setState({
      status: 'submitting',
      message: 'Subscribing...',
    })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Here you would typically make an API call to your newsletter service
      console.log('Newsletter subscription:', email)

      setState({
        status: 'success',
        message: 'Thank you for subscribing! Please check your email to confirm.',
      })
      setEmail('')

      // Reset success message after 5 seconds
      setTimeout(() => {
        setState({
          status: 'idle',
          message: '',
        })
      }, 5000)
    } catch (error) {
      setState({
        status: 'error',
        message: 'An error occurred. Please try again.',
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 rounded-2xl"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Mail className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Stay connected with our community. Receive weekly updates, devotionals,
          and news about upcoming events.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                disabled={state.status === 'submitting'}
              />
            </div>
            <button
              type="submit"
              disabled={state.status === 'submitting'}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {state.status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Subscribing
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>

          {state.status !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 flex items-center justify-center text-sm ${
                state.status === 'error' ? 'text-red-200' : 'text-green-200'
              }`}
            >
              {state.status === 'error' ? (
                <XCircle className="w-4 h-4 mr-2" />
              ) : state.status === 'success' ? (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              ) : null}
              {state.message}
            </motion.div>
          )}
        </form>

        <p className="text-sm text-white/60 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </motion.div>
  )
} 