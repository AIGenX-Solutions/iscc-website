'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Bookmark, Trash2, Search, X, Calendar, Clock, Tag } from 'lucide-react'

interface BookmarkedArticle {
  url: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  image?: string
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    // In a real app, you would fetch the full article data from an API
    // For now, we'll use mock data
    const mockArticleData: { [key: string]: BookmarkedArticle } = {
      '/blog/faith-journey': {
        url: '/blog/faith-journey',
        title: 'My Faith Journey: A Personal Story',
        excerpt: 'A personal testimony of growth and transformation through faith...',
        date: '2024-02-14',
        readTime: '5 min read',
        tags: ['testimony', 'faith', 'personal'],
        image: '/images/blog/faith-journey.jpg',
      },
      '/blog/prayer-guide': {
        url: '/blog/prayer-guide',
        title: 'A Beginner\'s Guide to Prayer',
        excerpt: 'Learn the fundamentals of developing a strong prayer life...',
        date: '2024-02-10',
        readTime: '8 min read',
        tags: ['prayer', 'guide', 'beginners'],
        image: '/images/blog/prayer-guide.jpg',
      },
      // Add more mock articles as needed
    }

    // Get bookmarked URLs from localStorage
    const bookmarkedUrls = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    
    // Get full article data for each bookmarked URL
    const bookmarkedArticles = bookmarkedUrls
      .map((url: string) => mockArticleData[url])
      .filter(Boolean)

    setBookmarks(bookmarkedArticles)

    // Collect all unique tags
    const tags = Array.from(new Set(
      bookmarkedArticles.flatMap(article => article.tags)
    ))
    setAllTags(tags)
  }, [])

  const removeBookmark = (url: string) => {
    const bookmarkedUrls = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    const newBookmarkedUrls = bookmarkedUrls.filter((bookmark: string) => bookmark !== url)
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarkedUrls))
    setBookmarks(prev => prev.filter(bookmark => bookmark.url !== url))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => bookmark.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="heading-xl mb-4">My Bookmarks</h1>
        <p className="text-gray-600">
          {bookmarks.length} saved articles
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Tag className="w-3 h-3 inline-block mr-1" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredBookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {bookmark.image && (
                <img
                  src={bookmark.image}
                  alt={bookmark.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={bookmark.url} className="hover:text-blue-600 transition-colors">
                    {bookmark.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {bookmark.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(bookmark.date).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  {bookmark.readTime}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {bookmark.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => removeBookmark(bookmark.url)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          {bookmarks.length === 0 ? (
            <>
              <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-gray-600">
                Start bookmarking articles you want to read later!
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-2">No matching bookmarks</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </>
          )}
        </div>
      )}
    </main>
  )
} 