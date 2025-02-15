'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'

const upcomingEvents = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: '2024-02-18',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly worship service with praise, prayer, and teaching.',
    category: 'Worship',
    image: '/images/events/worship.jpg',
  },
  {
    id: 2,
    title: 'Youth Bible Study',
    date: '2024-02-20',
    time: '6:30 PM',
    location: 'Youth Center',
    description: 'Weekly Bible study and discussion for young adults.',
    category: 'Youth',
    image: '/images/events/youth.jpg',
  },
  {
    id: 3,
    title: 'Community Outreach',
    date: '2024-02-24',
    time: '9:00 AM',
    location: 'Community Center',
    description: 'Monthly community service event helping local families in need.',
    category: 'Outreach',
    image: '/images/events/outreach.jpg',
  },
]

const EventCard = ({ event }) => {
  const date = new Date(event.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {/* Image placeholder - replace with actual image */}
        <div className="w-full h-48 bg-blue-100" />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-blue-600 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          {formattedDate}
        </div>
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            Learn More
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function EventsPage() {
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
            Events & Activities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Join us for worship, fellowship, and community service. There's always something happening at ISCC.
          </motion.p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">View Full Calendar</h2>
            <p className="text-gray-600">
              See all upcoming events and plan your involvement in our community activities.
            </p>
            <Link
              href="/calendar"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Calendar
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 