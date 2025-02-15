'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Link2, Check, Share2 } from 'lucide-react'

interface SocialShareProps {
  title: string
  url: string
  description: string
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#0d6efd]',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'bg-[#0A66C2] hover:bg-[#084d93]',
    },
  ]

  const handleShare = (platform: string) => {
    const shareUrl = shareLinks.find(link => link.name === platform)?.url
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleMobileShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
      }
    } else {
      setShowTooltip(true)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Desktop Share Buttons */}
      <div className="hidden sm:flex items-center gap-2">
        {shareLinks.map(({ name, icon: Icon, color }) => (
          <button
            key={name}
            onClick={() => handleShare(name)}
            className={`p-2 rounded-full text-white transition-colors ${color}`}
            title={`Share on ${name}`}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Copy link"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Link2 className="w-5 h-5" />
            )}
          </button>
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap"
              >
                Link copied!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Share Button */}
      <div className="sm:hidden relative">
        <button
          onClick={handleMobileShare}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10"
            >
              <div className="text-sm text-gray-600">
                Share using:
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {shareLinks.map(({ name, icon: Icon, color }) => (
                  <button
                    key={name}
                    onClick={() => handleShare(name)}
                    className={`p-2 rounded-full text-white transition-colors ${color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Link2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 