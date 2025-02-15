'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Calendar, ArrowRight, Book, Users, Flower2 } from 'lucide-react'

const activities = [
  {
    icon: Book,
    title: 'Bible Study',
    description: 'Weekly Bible study sessions focusing on women in the Bible and contemporary applications.',
    time: 'Every Tuesday at 7:00 PM',
  },
  {
    icon: Users,
    title: 'Mentorship Circle',
    description: 'Monthly gatherings where women support and encourage one another in their faith journey.',
    time: 'First Saturday of each month',
  },
  {
    icon: Flower2,
    title: 'Prayer & Fellowship',
    description: 'Regular prayer meetings and social gatherings to build strong relationships.',
    time: 'Every Thursday morning',
  },
]

export default function WomensMinistryPage() {
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
            <Heart className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            Women's Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Empowering women to grow in faith, leadership, and community.
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
              To create a nurturing environment where women can grow spiritually, develop meaningful
              relationships, and discover their God-given purpose through fellowship, study, and service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Our Activities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="inline-block p-3 rounded-lg bg-pink-100 text-pink-600 mb-4">
                  <activity.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Join Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We welcome women of all ages and stages of life to join our vibrant community.
              Experience the joy of growing together in faith and friendship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                View Events
                <Calendar className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 