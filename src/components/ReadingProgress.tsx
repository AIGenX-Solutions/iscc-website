'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Share2 } from 'lucide-react'
import { SocialShare } from './SocialShare'
import { ReadingPreferences } from './ReadingPreferences'

interface ReadingProgressProps {
  title: string
  url: string
  description: string
}

export function ReadingProgress({ title, url, description }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showBookmarkToast, setShowBookmarkToast] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    // Check if article is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setIsBookmarked(bookmarks.some((bookmark: string) => bookmark === url))

    // Calculate reading progress
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const newProgress = (scrollTop / documentHeight) * 100
      setProgress(Math.min(newProgress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [url])

  useEffect(() => {
    // Apply theme to body
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    // Apply font size to article content
    const articleContent = document.querySelector('.article-content')
    if (articleContent instanceof HTMLElement) {
      articleContent.style.fontSize = `${fontSize}px`
    }
  }, [fontSize])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    let newBookmarks

    if (isBookmarked) {
      newBookmarks = bookmarks.filter((bookmark: string) => bookmark !== url)
    } else {
      newBookmarks = [...bookmarks, url]
    }

    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
    setIsBookmarked(!isBookmarked)
    setShowBookmarkToast(true)
    setTimeout(() => setShowBookmarkToast(false), 2000)
  }

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize)
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX: progress / 100 }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-4">
        {/* Reading Preferences */}
        <ReadingPreferences
          onThemeChange={handleThemeChange}
          onFontSizeChange={handleFontSizeChange}
        />

        {/* Share Button */}
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:text-white"
          >
            <Share2 className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          {showShareMenu && (
            <div className="absolute bottom-full right-0 mb-2">
              <SocialShare
                title={title}
                url={url}
                description={description}
              />
            </div>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={toggleBookmark}
          className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 ${
            isBookmarked ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      {/* Bookmark Toast */}
      <AnimatePresence>
        {showBookmarkToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-8 bg-gray-800 text-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-lg"
          >
            {isBookmarked ? 'Article bookmarked!' : 'Bookmark removed'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Time Indicator */}
      <div className="fixed bottom-8 left-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {progress < 100 ? (
            <>
              <span className="font-medium">{Math.round(progress)}%</span> through article
            </>
          ) : (
            'Completed reading'
          )}
        </div>
      </div>
    </>
  )
} 