'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowUpDown, Filter, User, Hash } from 'lucide-react'
import { BLOG_TAGS } from '@/types/blog'

// Mock blog posts - In a real app, this would come from an API or database
const blogPosts = [
  {
    id: '1',
    title: 'Walking in Faith: A Journey of Trust',
    excerpt: 'Exploring the challenges and rewards of maintaining faith in modern times.',
    author: {
      name: 'Pastor John Smith',
      image: '/images/authors/john-smith.jpg',
    },
    date: '2024-02-15',
    readTime: '5 min read',
    category: 'Faith',
    tags: ['Prayer', 'Trust', 'Spiritual Growth'],
    image: '/images/blog/faith-journey.jpg',
    slug: 'walking-in-faith',
  },
  // Add more mock posts...
]

type SortOption = 'date' | 'title' | 'readTime'
type SortDirection = 'asc' | 'desc'

export default function TagArchivePage({ params }: { params: { slug: string } }) {
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const tag = BLOG_TAGS.find(t => t.slug === params.slug)

  // Filter posts by tag and selected categories
  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => 
        post.tags.some(t => t.toLowerCase().replace(/ /g, '-') === params.slug) &&
        (selectedCategories.length === 0 || selectedCategories.includes(post.category))
      )
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortDirection === 'desc' 
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime()
        }
        if (sortBy === 'title') {
          return sortDirection === 'desc'
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title)
        }
        if (sortBy === 'readTime') {
          const getMinutes = (time: string) => parseInt(time.split(' ')[0])
          return sortDirection === 'desc'
            ? getMinutes(b.readTime) - getMinutes(a.readTime)
            : getMinutes(a.readTime) - getMinutes(b.readTime)
        }
        return 0
      })
  }, [params.slug, selectedCategories, sortBy, sortDirection])

  // Get all unique categories from the filtered posts
  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    filteredPosts.forEach(post => {
      categories.add(post.category)
    })
    return Array.from(categories)
  }, [filteredPosts])

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortDirection('desc')
    }
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  if (!tag) {
    return (
      <main className="pt-16">
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <h1 className="heading-lg text-gray-900 mb-4">Tag Not Found</h1>
          <p className="text-gray-600 mb-8">The tag you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="gradient-bg py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href="/blog"
              className="text-white/80 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span>Tag: {tag.name}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 mb-6"
          >
            <Hash className="w-5 h-5 mr-2" />
            {tag.name}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80"
          >
            {tag.count} {tag.count === 1 ? 'post' : 'posts'} with this tag
          </motion.p>
        </div>
      </section>

      {/* Filters and Sort Section */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            {/* Category Filter */}
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filter by Category</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              {[
                { value: 'date', label: 'Date' },
                { value: 'title', label: 'Title' },
                { value: 'readTime', label: 'Read Time' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleSort(option.value as SortOption)}
                  className={`inline-flex items-center text-sm font-medium transition-colors ${
                    sortBy === option.value ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {option.label}
                  {sortBy === option.value && (
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.date).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">{post.author.name}</span>
                      </div>
                      <Link
                        href={`/blog/category/${post.category.toLowerCase()}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {post.category}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found with this tag.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 