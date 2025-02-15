'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, Calendar, Clock, Search, Filter } from 'lucide-react'

const sermons = [
  {
    id: 1,
    title: 'Walking in Faith',
    speaker: 'Pastor John Smith',
    date: '2024-02-11',
    duration: '45 minutes',
    description: 'Exploring the importance of faith in our daily walk with God.',
    category: 'Faith',
    audioUrl: '/sermons/walking-in-faith.mp3',
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Johnson',
    date: '2024-02-04',
    duration: '38 minutes',
    description: 'Understanding the transformative power of prayer in our lives.',
    category: 'Prayer',
    audioUrl: '/sermons/power-of-prayer.mp3',
  },
  {
    id: 3,
    title: 'Living with Purpose',
    speaker: 'Pastor Michael Brown',
    date: '2024-01-28',
    duration: '42 minutes',
    description: `Discovering God's purpose for your life and walking in it.`,
    category: 'Purpose',
    audioUrl: '/sermons/living-with-purpose.mp3',
  },
]

const categories = ['All', 'Faith', 'Prayer', 'Purpose', 'Leadership', 'Community']

export default function SermonsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
            Sermons & Teachings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Explore our collection of inspiring messages and biblical teachings.
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {filteredSermons.map((sermon) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{sermon.title}</h3>
                    <p className="text-gray-600 mb-4">{sermon.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(sermon.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {sermon.duration}
                      </div>
                      <div className="text-blue-600 font-medium">
                        {sermon.speaker}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                      <Play className="w-5 h-5 mr-2" />
                      Play
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-700">
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 