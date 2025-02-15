'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Calendar, ArrowRight, Shield, Target, Heart } from 'lucide-react'

const activities = [
  {
    icon: Shield,
    title: 'Bible Study',
    description: 'Weekly in-depth Bible study sessions focusing on masculine leadership and spiritual growth.',
    time: 'Every Wednesday at 7:00 PM',
  },
  {
    icon: Target,
    title: 'Mentorship Program',
    description: 'One-on-one mentoring relationships fostering personal and spiritual development.',
    time: 'Monthly meetings',
  },
  {
    icon: Heart,
    title: 'Community Service',
    description: 'Regular outreach activities serving our local community and those in need.',
    time: 'Every third Saturday',
  },
]

export default function MensMinistryPage() {
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
            <Users className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            Men's Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Building strong men of faith through fellowship, discipleship, and service.
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
              To equip and empower men to be spiritual leaders in their homes, church, and community
              through Biblical teaching, fellowship, and accountability.
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
                <div className="inline-block p-3 rounded-lg bg-blue-100 text-blue-600 mb-4">
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

      {/* Get Involved Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Get Involved</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us in our journey of faith and brotherhood. Whether you're seeking spiritual growth,
              mentorship, or fellowship, there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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