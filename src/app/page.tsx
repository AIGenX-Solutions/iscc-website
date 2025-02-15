'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Book, Church, Globe, Handshake } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg min-h-screen flex flex-col items-center justify-center p-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="heading-xl text-white text-center max-w-4xl"
        >
          International Shepards Christian Coalition
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="paragraph text-white text-center mt-6 max-w-2xl"
        >
          Uniting believers worldwide to nurture faith, leadership, and service in our communities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 space-x-4"
        >
          <Link href="/about" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="heading-lg text-center mb-12"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Faith & Spirituality', description: 'Deepening understanding of Scripture and fostering personal relationships with God.' },
              { icon: Users, title: 'Unity & Diversity', description: 'Embracing and celebrating the rich tapestry of cultural and denominational diversity.' },
              { icon: Book, title: 'Leadership & Empowerment', description: 'Equipping church leaders with necessary skills for effective ministry.' },
              { icon: Church, title: 'Community & Service', description: 'Engaging in outreach programs that address community needs.' },
              { icon: Globe, title: 'Discipleship & Growth', description: 'Creating structured programs that foster personal growth and accountability.' },
              { icon: Handshake, title: 'Family & Relationships', description: 'Supporting strong family bonds within the Christian framework.' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
                }}
                className="card-hover p-6 rounded-lg bg-gray-50"
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="heading-lg mb-6"
          >
            Join Our Community
          </motion.h2>
          <motion.p
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="paragraph mb-8"
          >
            Be part of a growing community dedicated to spreading God's love and making a positive impact in the world.
          </motion.p>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Involved
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
} 