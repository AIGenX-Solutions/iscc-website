'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, ArrowUp, ArrowDown, Tag, History, Settings, Filter, Mic, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { BLOG_CATEGORIES, BLOG_TAGS } from '@/types/blog'
import { useRouter } from 'next/navigation'

interface SearchResult {
  title: string
  excerpt: string
  url: string
  type: 'page' | 'blog' | 'ministry' | 'event'
  category?: string
  tags?: string[]
  date?: string
}

interface SearchFilters {
  categories: string[]
  tags: string[]
  types: SearchResult['type'][]
  dateRange: 'all' | 'week' | 'month' | 'year'
}

interface SearchSuggestion {
  id: string
  type: 'page' | 'blog' | 'event'
  title: string
  url: string
}

const SEARCH_HISTORY_KEY = 'search_history'
const MAX_HISTORY_ITEMS = 5

// Mock suggestions - In a real app, these would come from an API
const mockSuggestions: SearchSuggestion[] = [
  {
    id: '1',
    type: 'page',
    title: 'Worship Ministry',
    url: '/ministries/worship',
  },
  {
    id: '2',
    type: 'blog',
    title: 'Walking in Faith: A Journey of Trust',
    url: '/blog/walking-in-faith',
  },
  // Add more suggestions...
]

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    tags: [],
    types: [],
    dateRange: 'all',
  })
  const [isListening, setIsListening] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const recognition = useRef<any>(null)

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  // Save search history to localStorage
  const saveToHistory = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return

    setSearchHistory(prev => {
      const newHistory = [
        searchQuery,
        ...prev.filter(q => q !== searchQuery),
      ].slice(0, MAX_HISTORY_ITEMS)
      
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
      return newHistory
    })
  }, [])

  // Mock search results - In a real app, this would be an API call
  const mockSearch = async (searchQuery: string, searchFilters: SearchFilters): Promise<SearchResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))

    if (!searchQuery) return []

    const searchResults: SearchResult[] = [
      {
        title: 'Youth Ministry',
        excerpt: 'Join our vibrant youth ministry program...',
        url: '/ministries/youth',
        type: 'ministry',
      },
      {
        title: 'Walking in Faith',
        excerpt: 'A journey of trust and spiritual growth...',
        url: '/blog/walking-in-faith',
        type: 'blog',
        category: 'Faith',
        tags: ['Prayer', 'Trust', 'Spiritual Growth'],
        date: '2024-02-15',
      },
      {
        title: 'Worship Service Times',
        excerpt: 'Sunday services and weekly gatherings...',
        url: '/worship',
        type: 'page',
      },
      {
        title: 'Community Outreach Event',
        excerpt: 'Join us for our monthly community service...',
        url: '/events/community-outreach',
        type: 'event',
        date: '2024-03-01',
      },
    ]

    return searchResults.filter(result => {
      const matchesQuery = 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = 
        searchFilters.types.length === 0 ||
        searchFilters.types.includes(result.type)

      const matchesCategory = 
        searchFilters.categories.length === 0 ||
        (result.category && searchFilters.categories.includes(result.category))

      const matchesTags = 
        searchFilters.tags.length === 0 ||
        (result.tags && result.tags.some(tag => searchFilters.tags.includes(tag)))

      const matchesDate = (() => {
        if (searchFilters.dateRange === 'all' || !result.date) return true
        const date = new Date(result.date)
        const now = new Date()
        switch (searchFilters.dateRange) {
          case 'week':
            return date >= new Date(now.setDate(now.getDate() - 7))
          case 'month':
            return date >= new Date(now.setMonth(now.getMonth() - 1))
          case 'year':
            return date >= new Date(now.setFullYear(now.getFullYear() - 1))
          default:
            return true
        }
      })()

      return matchesQuery && matchesType && matchesCategory && matchesTags && matchesDate
    })
  }

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition()
      recognition.current.continuous = false
      recognition.current.interimResults = false

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        setIsListening(false)
        fetchSuggestions(transcript)
      }

      recognition.current.onerror = () => {
        setIsListening(false)
      }

      recognition.current.onend = () => {
        setIsListening(false)
      }
    }

    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const startListening = () => {
    if (recognition.current) {
      recognition.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop()
      setIsListening(false)
    }
  }

  const fetchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Filter mock suggestions
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setSuggestions(filtered)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    fetchSuggestions(value)
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    router.push(suggestion.url)
    clearSearch()
  }

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query) {
        setIsLoading(true)
        const searchResults = await mockSearch(query, filters)
        setResults(searchResults)
        setIsLoading(false)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query, filters])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        if (selectedIndex >= 0 && results[selectedIndex]) {
          saveToHistory(query)
          window.location.href = results[selectedIndex].url
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const toggleFilter = (type: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const current = prev[type] as string[]
      return {
        ...prev,
        [type]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value],
      }
    })
  }

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'blog':
        return '📝'
      case 'ministry':
        return '🙏'
      case 'page':
        return '📄'
      case 'event':
        return '📅'
      default:
        return '🔍'
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-20 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <Search className="w-6 h-6 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          )}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-full transition-colors ${
              isListening ? 'bg-red-500 text-white' : 'hover:bg-white/20 text-white/60'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && (query.trim() || isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
              </div>
            ) : suggestions.length > 0 ? (
              <div className="divide-y">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        {suggestion.type}
                      </span>
                      <span className="text-gray-900">{suggestion.title}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 