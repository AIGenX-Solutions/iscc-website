'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Heart, Baby, BookOpen, Music, Hand } from 'lucide-react'
import type { ColorClass } from '@/types/shared'

const ministries = [
  {
    icon: Users,
    title: "Men's Ministry",
    description: "Empowering men to be spiritual leaders through fellowship, Bible study, and mentorship.",
    href: '/ministries/mens',
    color: 'blue',
  },
  {
    icon: Heart,
    title: "Women's Ministry",
    description: "Creating a supportive community for women to grow in faith and leadership.",
    href: '/ministries/womens',
    color: 'pink',
  },
  {
    icon: Baby,
    title: 'Youth Ministry',
    description: "Guiding young people in their spiritual journey through engaging activities and teachings.",
    href: '/ministries/youth',
    color: 'green',
  },
  {
    icon: BookOpen,
    title: "Children's Ministry",
    description: "Nurturing young hearts with age-appropriate Biblical teachings and fun activities.",
    href: '/ministries/children',
    color: 'yellow',
  },
  {
    icon: Music,
    title: 'Worship Ministry',
    description: "Leading the congregation in worship through music and praise.",
    href: '/ministries/worship',
    color: 'purple',
  },
  {
    icon: Hand,
    title: 'Outreach Ministry',
    description: "Serving our community and spreading God's love through practical assistance and support.",
    href: '/ministries/outreach',
    color: 'red',
  },
]

const colorClasses: Record<ColorClass, string> = {
  blue: 'bg-blue-100 text-blue-600',
  pink: 'bg-pink-100 text-pink-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
  orange: 'bg-orange-100 text-orange-600',
}

export default function MinistriesPage() {
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
            Our Ministries
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Discover the various ways you can get involved and grow in your faith journey.
          </motion.p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={ministry.href}>
                  <div className="h-full p-8 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`inline-block p-3 rounded-lg ${colorClasses[ministry.color]} mb-4`}>
                      <ministry.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{ministry.title}</h3>
                    <p className="text-gray-600">{ministry.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Get Involved</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're looking to serve, grow, or connect, there's a place for you in our community.
              Join us and be part of something meaningful.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 