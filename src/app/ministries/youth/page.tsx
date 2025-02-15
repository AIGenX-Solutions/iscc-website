'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Baby, Calendar, ArrowRight, Music, GamepadIcon, BookOpen, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ColorClass } from '@/types/shared'

const colorClasses: Record<ColorClass, string> = {
  orange: 'bg-orange-100 text-orange-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  pink: 'bg-pink-100 text-pink-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  red: 'bg-red-100 text-red-600',
} as const

const activities = [
  {
    icon: Music,
    title: 'Youth Worship',
    description: 'Contemporary worship sessions led by our youth praise band.',
    time: 'Every Sunday at 6:00 PM',
    color: 'purple',
  },
  {
    icon: GamepadIcon,
    title: 'Youth Fellowship',
    description: 'Fun activities, games, and social events to build lasting friendships.',
    time: 'Every Friday at 7:00 PM',
    color: 'green',
  },
  {
    icon: BookOpen,
    title: 'Bible Study',
    description: 'Interactive Bible study sessions tailored for young minds.',
    time: 'Every Wednesday at 6:30 PM',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Leadership Training',
    description: 'Developing the next generation of Christian leaders.',
    time: 'Monthly workshops',
    color: 'orange',
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 16,
    quote: 'The youth ministry has helped me grow in my faith and make amazing friends who support me.',
    image: '/images/testimonials/sarah.jpg',
    involvement: '2 years',
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 17,
    quote: 'Being part of the worship team has given me confidence and helped me discover my passion for music.',
    image: '/images/testimonials/michael.jpg',
    involvement: '3 years',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    age: 15,
    quote: 'The Bible studies are engaging and help me understand how to apply God\'s word to my daily life.',
    image: '/images/testimonials/emily.jpg',
    involvement: '1 year',
  },
]

export default function YouthMinistryPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState(0)
  const testimonialRef = useRef<HTMLDivElement>(null)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentTestimonial(prev => (prev + newDirection + testimonials.length) % testimonials.length)
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
            Youth Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Empowering young people to discover their faith and purpose.
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
              To create an engaging environment where young people can grow in their faith,
              develop meaningful relationships, and discover their God-given potential through
              worship, discipleship, and fellowship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Our Activities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`inline-block p-3 rounded-lg ${colorClasses[activity.color]} mb-4`}>
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

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Youth Testimonials</h2>
          <div className="relative h-[400px]" ref={testimonialRef}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentTestimonial}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-lg shadow-xl p-8 mx-4">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <blockquote className="text-xl italic text-gray-600 mb-4">
                        "{testimonials[currentTestimonial].quote}"
                      </blockquote>
                      <div className="font-semibold text-gray-900">
                        {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].age}
                      </div>
                      <div className="text-sm text-gray-500">
                        Member for {testimonials[currentTestimonial].involvement}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentTestimonial ? 1 : -1)
                    setCurrentTestimonial(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Join Our Youth Community</h2>
            <p className="max-w-2xl mx-auto">
              Whether you're looking to grow in your faith, make new friends, or discover
              your purpose, there's a place for you in our youth ministry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Connected
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
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