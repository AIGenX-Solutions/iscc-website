'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowUpDown, Filter, User, Search, X, SlidersHorizontal, ChevronDown, ArrowDown, Loader2, ArrowRight } from 'lucide-react'
import { BLOG_CATEGORIES, BLOG_TAGS } from '@/types/blog'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'

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
    featured: true,
  },
  // Add more mock posts...
]

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    image: string
  }
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  slug: string
  featured?: boolean
}

type SortOption = 'date' | 'title' | 'readTime' | 'popular'
type SortDirection = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'

interface Filters {
  categories: string[]
  tags: string[]
  dateRange: 'all' | 'week' | 'month' | 'year'
  author?: string
  search: string
}

interface BlogCategory {
  name: string
  slug: string
  count: number
}

interface BlogTag {
  name: string
  slug: string
}

const POSTS_PER_PAGE = 9

interface FetchPostsParams {
  pageParam?: number
  filters: Filters
  sortBy: SortOption
  sortDirection: SortDirection
}

interface PostsResponse {
  posts: BlogPost[]
  nextPage: number | undefined
  total: number
}

interface InfiniteQueryData {
  pages: PostsResponse[]
  pageParams: number[]
}

async function fetchPosts({ pageParam = 1, filters, sortBy, sortDirection }: FetchPostsParams): Promise<PostsResponse> {
  // Simulate API call with pagination
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const start = (pageParam - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE
  
  // Apply filters and sorting
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = filters.search
        ? post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(filters.search.toLowerCase())
        : true

      const matchesCategories = filters.categories.length === 0 ||
        filters.categories.includes(post.category)

      const matchesTags = filters.tags.length === 0 ||
        post.tags.some(tag => filters.tags.includes(tag))

      const matchesAuthor = !filters.author ||
        post.author.name === filters.author

      const matchesDate = (() => {
        if (filters.dateRange === 'all') return true
        const date = new Date(post.date)
        const now = new Date()
        switch (filters.dateRange) {
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

      return matchesSearch && matchesCategories && matchesTags && matchesAuthor && matchesDate
    })
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

  return {
    posts: filteredPosts.slice(start, end),
    nextPage: end < filteredPosts.length ? pageParam + 1 : undefined,
    total: filteredPosts.length,
  }
}

const Grid: React.FC = () => (
  <div className="w-5 h-5 grid grid-cols-2 gap-1">
    <div className="bg-current rounded" />
    <div className="bg-current rounded" />
    <div className="bg-current rounded" />
    <div className="bg-current rounded" />
  </div>
)

const List: React.FC = () => (
  <div className="w-5 h-5 flex flex-col gap-1">
    <div className="h-1 bg-current rounded" />
    <div className="h-1 bg-current rounded" />
    <div className="h-1 bg-current rounded" />
  </div>
)

export default function BlogPage() {
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    tags: [],
    dateRange: 'all',
    search: '',
  })

  // Get all unique authors
  const authors = useMemo(() => {
    const uniqueAuthors = new Set<string>()
    blogPosts.forEach(post => uniqueAuthors.add(post.author.name))
    return Array.from(uniqueAuthors)
  }, [])

  // Infinite scroll setup with proper types
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<PostsResponse, Error, InfiniteQueryData>({
    queryKey: ['posts', filters, sortBy, sortDirection],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ 
      pageParam: pageParam as number, 
      filters, 
      sortBy, 
      sortDirection 
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  // Load more posts when the load more element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  const allPosts = useMemo(() => data?.pages.flatMap(page => page.posts) ?? [], [data?.pages])
  const totalPosts = data?.pages[0]?.total ?? 0

  const toggleFilter = (type: keyof Filters, value: string) => {
    setFilters(prev => {
      if (type === 'categories' || type === 'tags') {
        const current = prev[type]
        return {
          ...prev,
          [type]: current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value],
        }
      }
      return prev
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }))
  }

  const handleDateRangeChange = (range: Filters['dateRange']) => {
    setFilters(prev => ({ ...prev, dateRange: range }))
  }

  const handleAuthorChange = (author: string | undefined) => {
    setFilters(prev => ({ ...prev, author }))
  }

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortDirection('desc')
    }
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      tags: [],
      dateRange: 'all',
      author: undefined,
      search: '',
    })
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="gradient-bg py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 mb-8"
          >
            Insights, stories, and reflections from our community
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Search className="w-6 h-6 text-white/60 absolute left-4 top-1/2 transform -translate-y-1/2" />
              {filters.search && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  type="button"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Featured Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter(post => post.featured)
              .map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                    <Link
                      href={`/blog/category/${post.category.toLowerCase()}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors mb-4"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {post.category}
                    </Link>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {post.author.image && (
                          <img
                            src={post.author.image}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        )}
                        <span className="text-sm text-gray-600">{post.author.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

      {/* Filters and Posts */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(prev => !prev)}
                className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
                {(filters.categories.length > 0 || filters.tags.length > 0 || filters.author || filters.dateRange !== 'all') && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                    {filters.categories.length + filters.tags.length + (filters.author ? 1 : 0) + (filters.dateRange !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  aria-label="Grid view"
                >
                  <Grid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  aria-label="List view"
                >
                  <List />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              {[
                { value: 'date', label: 'Date' },
                { value: 'title', label: 'Title' },
                { value: 'readTime', label: 'Read Time' },
                { value: 'popular', label: 'Popular' },
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

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Categories */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                      <div className="space-y-2">
                        {BLOG_CATEGORIES.map(category => (
                          <button
                            key={category.slug}
                            onClick={() => toggleFilter('categories', category.name)}
                            className={`flex items-center justify-between w-full p-2 rounded text-sm transition-colors ${
                              filters.categories.includes(category.name)
                                ? 'bg-blue-50 text-blue-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className="text-xs text-gray-400">
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {BLOG_TAGS.map(tag => (
                          <button
                            key={tag.slug}
                            onClick={() => toggleFilter('tags', tag.name)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
                              filters.tags.includes(tag.name)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Authors */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Authors</h4>
                      <div className="space-y-2">
                        {authors.map(author => (
                          <button
                            key={author}
                            onClick={() => handleAuthorChange(author)}
                            className={`flex items-center w-full p-2 rounded text-sm transition-colors ${
                              filters.author === author
                                ? 'bg-blue-50 text-blue-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <User className="w-4 h-4 mr-2" />
                            {author}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Range */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Date Range</h4>
                      <div className="space-y-2">
                        {[
                          { value: 'all', label: 'All Time' },
                          { value: 'week', label: 'Past Week' },
                          { value: 'month', label: 'Past Month' },
                          { value: 'year', label: 'Past Year' },
                        ].map(range => (
                          <button
                            key={range.value}
                            onClick={() => handleDateRangeChange(range.value as Filters['dateRange'])}
                            className={`flex items-center w-full p-2 rounded text-sm transition-colors ${
                              filters.dateRange === range.value
                                ? 'bg-blue-50 text-blue-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters */}
          {(filters.categories.length > 0 || filters.tags.length > 0 || filters.author || filters.dateRange !== 'all') && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {filters.categories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleFilter('categories', category)}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm"
                  >
                    {category}
                    <X className="w-4 h-4 ml-2" />
                  </button>
                ))}
                {filters.tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleFilter('tags', tag)}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm"
                  >
                    {tag}
                    <X className="w-4 h-4 ml-2" />
                  </button>
                ))}
                {filters.author && (
                  <button
                    onClick={() => handleAuthorChange(undefined)}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm"
                  >
                    {filters.author}
                    <X className="w-4 h-4 ml-2" />
                  </button>
                )}
                {filters.dateRange !== 'all' && (
                  <button
                    onClick={() => handleDateRangeChange('all')}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm"
                  >
                    {filters.dateRange === 'week' ? 'Past Week' :
                     filters.dateRange === 'month' ? 'Past Month' :
                     'Past Year'}
                    <X className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Posts Grid/List */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(POSTS_PER_PAGE)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="flex justify-between items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : allPosts.length > 0 ? (
            <>
              <div className={viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-8'
              }>
                {allPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      <>
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
                          <Link
                            href={`/blog/category/${post.category.toLowerCase()}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors mb-4"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {post.category}
                          </Link>
                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {post.author.image && (
                                <img
                                  src={post.author.image}
                                  alt={post.author.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />
                              )}
                              <span className="text-sm text-gray-600">{post.author.name}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {post.image && (
                          <div className="w-48 flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Link
                              href={`/blog/category/${post.category.toLowerCase()}`}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {post.category}
                            </Link>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {post.author.image && (
                                <img
                                  src={post.author.image}
                                  alt={post.author.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />
                              )}
                              <span className="text-sm text-gray-600">{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {post.readTime}
                              </div>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center text-blue-600 hover:text-blue-700"
                              >
                                Read More
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.article>
                ))}
              </div>

              {/* Load More */}
              {hasNextPage && (
                <div
                  ref={loadMoreRef}
                  className="flex justify-center mt-8"
                >
                  {isFetchingNextPage ? (
                    <div className="flex items-center text-gray-500">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Loading more posts...
                    </div>
                  ) : (
                    <button
                      onClick={() => fetchNextPage()}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                      <ArrowDown className="w-4 h-4 mr-2" />
                      Load More
                    </button>
                  )}
                </div>
              )}

              {/* Posts Count */}
              <div className="mt-8 text-center text-sm text-gray-500">
                Showing {allPosts.length} of {totalPosts} posts
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 