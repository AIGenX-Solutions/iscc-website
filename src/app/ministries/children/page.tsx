'use client'

import React from 'react'
import type { NextPage } from 'next'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Baby, Calendar, ArrowRight, Heart, Puzzle, Book, Star, ChevronDown, Play, Pause, Shield, UserCheck, HeartPulse } from 'lucide-react'
import type { ElementType } from 'react'

const colorClasses = {
  pink: 'bg-pink-100 text-pink-600',
  purple: 'bg-purple-100 text-purple-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  blue: 'bg-blue-100 text-blue-600',
} as const

type ColorClass = keyof typeof colorClasses

interface AgeGroup {
  icon: ElementType
  title: string
  description: string
  color: ColorClass
  activities?: string[]
}

interface Activity {
  title: string
  description: string
  time: string
  icon: ElementType
  preview?: {
    image: string
    video?: string
  }
}

const ageGroups: AgeGroup[] = [
  {
    icon: Baby,
    title: 'Nursery (0-2 years)',
    description: 'Loving care for our littlest ones in a safe, nurturing environment.',
    color: 'pink',
    activities: [
      'Gentle Play Time',
      'Music and Movement',
      'Story Time',
      'Nap Time',
    ],
  },
  {
    icon: Heart,
    title: 'Preschool (3-5 years)',
    description: 'Fun, age-appropriate activities introducing basic Biblical concepts.',
    color: 'purple',
    activities: [
      'Bible Stories',
      'Arts and Crafts',
      'Worship Songs',
      'Interactive Games',
    ],
  },
  {
    icon: Star,
    title: 'Elementary (6-8 years)',
    description: 'Interactive Bible lessons and activities building strong foundations.',
    color: 'yellow',
    activities: [
      'Bible Study',
      'Group Activities',
      'Memory Verses',
      'Worship Time',
    ],
  },
  {
    icon: Book,
    title: 'Tweens (9-11 years)',
    description: 'Deeper Biblical understanding through engaging discussions and activities.',
    color: 'blue',
    activities: [
      'Bible Discussion',
      'Service Projects',
      'Team Building',
      'Worship Leadership',
    ],
  },
]

const activities: Activity[] = [
  {
    title: 'Sunday School',
    description: 'Weekly Bible lessons and activities',
    time: 'Every Sunday at 9:30 AM',
    icon: Book,
    preview: {
      image: '/images/activities/sunday-school.jpg',
    },
  },
  {
    title: 'Kids Worship',
    description: 'Fun and engaging worship experience',
    time: 'Every Sunday at 11:00 AM',
    icon: Star,
    preview: {
      image: '/images/activities/kids-worship.jpg',
      video: '/videos/kids-worship-preview.mp4',
    },
  },
  {
    title: 'Bible Adventure Club',
    description: 'Midweek program with games and learning',
    time: 'Every Wednesday at 6:30 PM',
    icon: Puzzle,
    preview: {
      image: '/images/activities/bible-adventure.jpg',
    },
  },
]

const IconComponent = ({ icon: Icon }: { icon: ElementType<any> }) => {
  const Component = Icon as React.ComponentType<{ className: string }>
  return <Component className="w-6 h-6" />
}

const ChildrensMinistryPage: NextPage = () => {
  const [expandedGroup, setExpandedGroup] = React.useState<string | null>(null)
  const [playingPreview, setPlayingPreview] = React.useState<string | null>(null)

  const toggleGroup = (title: string) => {
    setExpandedGroup(expandedGroup === title ? null : title)
  }

  const togglePreview = (title: string) => {
    setPlayingPreview(playingPreview === title ? null : title)
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="gradient-bg py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <Baby className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            Children's Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Nurturing young hearts and minds in God's love.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Our Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              To create a safe, loving environment where children can discover Jesus,
              experience His love, and grow in their faith through age-appropriate
              teaching, worship, and activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Age Groups Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Age Groups</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ageGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`inline-block p-3 rounded-lg ${colorClasses[group.color]} mb-4`}>
                  <IconComponent icon={group.icon} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{group.title}</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <span className="mr-2">View Activities</span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      expandedGroup === group.title ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedGroup === group.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-2">
                        {group.activities?.map((activity) => (
                          <li
                            key={activity}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <Star className="w-4 h-4 mr-2 text-blue-600" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Weekly Activities</h2>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="bg-blue-100 p-3 rounded-lg mr-6">
                  <IconComponent icon={activity.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {activity.time}
                </div>
                <button
                  onClick={() => togglePreview(activity.title)}
                  className="ml-4 p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  {playingPreview === activity.title ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Security Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="heading-lg">Safety & Security</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your child's safety is our top priority. All our staff and volunteers undergo
              thorough background checks and training. We maintain strict check-in/check-out
              procedures and follow comprehensive safety protocols.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="inline-block p-3 rounded-lg bg-green-100 text-green-600 mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Background Checks</h3>
                <p className="text-gray-600">All staff and volunteers are thoroughly screened</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="inline-block p-3 rounded-lg bg-blue-100 text-blue-600 mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Check-in</h3>
                <p className="text-gray-600">Digital check-in/check-out system for every child</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="inline-block p-3 rounded-lg bg-purple-100 text-purple-600 mb-4">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Health & Safety</h3>
                <p className="text-gray-600">Regular sanitization and allergy-aware environment</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Join Our Children's Ministry</h2>
            <p className="max-w-2xl mx-auto">
              Whether you're a parent looking to enroll your child or feel called to serve
              in children's ministry, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Volunteer
                <Heart className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ChildrensMinistryPage 