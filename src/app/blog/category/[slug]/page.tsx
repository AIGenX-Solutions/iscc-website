'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowUpDown, Filter, User } from 'lucide-react'
import { BLOG_CATEGORIES } from '@/types/blog'

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

export default function CategoryArchivePage({ params }: { params: { slug: string } }) {
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const category = BLOG_CATEGORIES.find(cat => cat.slug === params.slug)

  // Filter posts by category and selected tags
  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => 
        post.category.toLowerCase() === params.slug &&
        (selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag)))
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
  }, [params.slug, selectedTags, sortBy, sortDirection])

  // Get all unique tags from the filtered posts
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    filteredPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [filteredPosts])

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortDirection('desc')
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  if (!category) {
    return (
      <main className="pt-16">
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <h1 className="heading-lg text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
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
            <span>{category.name}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            {category.description}
          </motion.p>
        </div>
      </section>

      {/* Filters and Sort Section */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            {/* Tags Filter */}
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filter by Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
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
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 