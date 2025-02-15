'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Users, Star, Heart } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function AboutPage() {
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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            The International Shepards Christian Coalition is dedicated to nurturing spiritual growth,
            fostering leadership, and serving with compassion.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="inline-block p-3 bg-blue-100 rounded-lg">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="heading-lg">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a united and diverse community of faith, where every believer can grow
              in their relationship with God and actively participate in building a stronger,
              more loving community.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="inline-block p-3 bg-blue-100 rounded-lg">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="heading-lg">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To create an inclusive environment that nurtures spiritual growth, empowers leadership,
              and demonstrates Christ's love through compassionate service to our communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from our worship services to our community outreach programs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Faith-Centered',
                description: 'Keeping God at the center of all we do.',
              },
              {
                icon: Users,
                title: 'Community-Focused',
                description: 'Building strong, supportive relationships.',
              },
              {
                icon: Star,
                title: 'Service-Oriented',
                description: 'Serving others with compassion and love.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
                }}
                className="card-hover p-6 bg-white rounded-lg"
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 