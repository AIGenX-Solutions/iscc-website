'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Music, Calendar, ArrowRight, Mic, Guitar, Users, Heart, ChevronDown, Play, Pause } from 'lucide-react'

const teams = [
  {
    icon: Mic,
    title: 'Vocal Team',
    description: 'Lead vocals and harmonies bringing worship to life through song.',
    schedule: 'Practice: Thursday 7:00 PM',
    color: 'purple',
  },
  {
    icon: Guitar,
    title: 'Instrumental Team',
    description: 'Skilled musicians creating beautiful melodies for worship.',
    schedule: 'Practice: Wednesday 7:00 PM',
    color: 'blue',
  },
  {
    icon: Music,
    title: 'Audio/Visual Team',
    description: 'Technical support ensuring seamless worship experiences.',
    schedule: 'Setup: Sunday 8:00 AM',
    color: 'green',
  },
  {
    icon: Heart,
    title: 'Prayer Team',
    description: 'Spiritual support through prayer during worship services.',
    schedule: 'Meeting: Sunday 9:00 AM',
    color: 'red',
  },
]

const worshipSchedule = [
  {
    day: 'Sunday',
    services: [
      { time: '9:00 AM', type: 'Traditional Service' },
      { time: '11:00 AM', type: 'Contemporary Service' },
      { time: '6:00 PM', type: 'Evening Worship' },
    ],
  },
  {
    day: 'Wednesday',
    services: [
      { time: '7:00 PM', type: 'Midweek Worship' },
    ],
  },
]

const featuredSongs = [
  {
    title: 'Amazing Grace (My Chains Are Gone)',
    artist: 'Chris Tomlin',
    duration: '4:23',
    preview: '/audio/amazing-grace-preview.mp3',
  },
  {
    title: 'How Great Is Our God',
    artist: 'Chris Tomlin',
    duration: '4:15',
    preview: '/audio/how-great-preview.mp3',
  },
  {
    title: 'In Christ Alone',
    artist: 'Keith & Kristyn Getty',
    duration: '4:36',
    preview: '/audio/in-christ-alone-preview.mp3',
  },
]

const colorClasses = {
  purple: 'bg-purple-100 text-purple-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
}

export default function WorshipMinistryPage() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null)
  const [expandedDay, setExpandedDay] = useState<string | null>('Sunday')
  const [playingPreview, setPlayingPreview] = useState<string | null>(null)

  const toggleTeam = (title: string) => {
    setExpandedTeam(expandedTeam === title ? null : title)
  }

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day)
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
            <Music className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            Worship Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Leading the congregation in worship through music and praise.
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
              To create an atmosphere of worship where people can encounter God's presence
              through music and praise, fostering spiritual growth and transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Teams Grid with Expandable Details */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Our Teams</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div
                  onClick={() => toggleTeam(team.title)}
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${colorClasses[team.color]}`}>
                        <team.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{team.title}</h3>
                        <p className="text-gray-600">{team.description}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedTeam === team.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedTeam === team.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t"
                    >
                      <div className="p-6 bg-gray-50">
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {team.schedule}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Link
                              href="/contact"
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Join Team
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Worship Schedule */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Worship Schedule</h2>
          <div className="space-y-4">
            {worshipSchedule.map((schedule) => (
              <motion.div
                key={schedule.day}
                className="border rounded-lg overflow-hidden"
              >
                <div
                  onClick={() => toggleDay(schedule.day)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold">{schedule.day}</h3>
                  <motion.div
                    animate={{ rotate: expandedDay === schedule.day ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {expandedDay === schedule.day && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="border-t p-4 space-y-4">
                        {schedule.services.map((service) => (
                          <div
                            key={service.time}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <span className="font-medium">{service.time}</span>
                              <span className="text-gray-600 ml-2">
                                {service.type}
                              </span>
                            </div>
                            <Link
                              href="/events"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              View Details
                            </Link>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Songs */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Featured Songs</h2>
          <div className="grid gap-4">
            {featuredSongs.map((song) => (
              <motion.div
                key={song.title}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{song.title}</h3>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{song.duration}</span>
                    <button
                      onClick={() => togglePreview(song.title)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {playingPreview === song.title ? (
                        <Pause className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Play className="w-5 h-5 text-blue-600" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Join the Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Requirements</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <Heart className="w-5 h-5 text-red-500 mr-2 mt-1" />
                  <span>A heart for worship and serving God</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-blue-500 mr-2 mt-1" />
                  <span>Commitment to team rehearsals and services</span>
                </li>
                <li className="flex items-start">
                  <Music className="w-5 h-5 text-purple-500 mr-2 mt-1" />
                  <span>Musical ability (for music team members)</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-green-500 mr-2 mt-1" />
                  <span>Fill out an application form</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-green-500 mr-2 mt-1" />
                  <span>Meet with the worship leader</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-green-500 mr-2 mt-1" />
                  <span>Attend a training session</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Use Your Gifts</h2>
            <p className="max-w-2xl mx-auto">
              If you have a passion for worship and want to use your musical or technical
              gifts to serve God, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Join the Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
              >
                View Schedule
                <Calendar className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 