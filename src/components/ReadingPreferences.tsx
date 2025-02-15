import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Moon, Sun, Type, Minus, Plus } from 'lucide-react'

interface ReadingPreferencesProps {
  onThemeChange: (theme: 'light' | 'dark') => void
  onFontSizeChange: (size: number) => void
}

export function ReadingPreferences({ onThemeChange, onFontSizeChange }: ReadingPreferencesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem('reading-theme') as 'light' | 'dark'
    const savedFontSize = Number(localStorage.getItem('reading-font-size'))

    if (savedTheme) {
      setTheme(savedTheme)
      onThemeChange(savedTheme)
    }

    if (savedFontSize) {
      setFontSize(savedFontSize)
      onFontSizeChange(savedFontSize)
    }
  }, [onThemeChange, onFontSizeChange])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('reading-theme', newTheme)
    onThemeChange(newTheme)
  }

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(Math.max(12, fontSize + delta), 24)
    setFontSize(newSize)
    localStorage.setItem('reading-font-size', String(newSize))
    onFontSizeChange(newSize)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Settings className="w-6 h-6 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl p-4 min-w-[200px]"
          >
            {/* Theme Toggle */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
              >
                <span className="flex items-center">
                  {theme === 'light' ? (
                    <Sun className="w-4 h-4 mr-2" />
                  ) : (
                    <Moon className="w-4 h-4 mr-2" />
                  )}
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>

            {/* Font Size Controls */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Font Size</h3>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => adjustFontSize(-1)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  disabled={fontSize <= 12}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex items-center">
                  <Type className="w-4 h-4 mr-1" />
                  {fontSize}px
                </span>
                <button
                  onClick={() => adjustFontSize(1)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  disabled={fontSize >= 24}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 