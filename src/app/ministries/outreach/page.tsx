'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Heart, Calendar, ArrowRight, Utensils, Home, Book, Globe, Users, ChevronDown, X, Loader2, Check } from 'lucide-react'
import type { ColorClass } from '@/types/shared'

const programs = [
  {
    icon: Utensils,
    title: 'Food Bank',
    description: 'Providing meals and groceries to families in need.',
    schedule: 'Every Saturday 9:00 AM - 12:00 PM',
    color: 'orange',
  },
  {
    icon: Home,
    title: 'Homeless Outreach',
    description: 'Supporting the homeless community with resources and care.',
    schedule: 'Every Sunday 2:00 PM - 5:00 PM',
    color: 'blue',
  },
  {
    icon: Book,
    title: 'Literacy Program',
    description: 'Teaching reading and writing skills to children and adults.',
    schedule: 'Weekdays 4:00 PM - 6:00 PM',
    color: 'green',
  },
  {
    icon: Globe,
    title: 'Mission Trips',
    description: 'Organizing local and international mission opportunities.',
    schedule: 'Quarterly trips',
    color: 'purple',
  },
]

const colorClasses: Record<ColorClass, string> = {
  orange: 'bg-orange-100 text-orange-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  pink: 'bg-pink-100 text-pink-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  red: 'bg-red-100 text-red-600',
} as const

const upcomingEvents = [
  {
    title: 'Community Food Drive',
    date: '2024-03-15',
    description: 'Annual food collection drive for local families.',
    location: 'Church Parking Lot',
  },
  {
    title: 'Back to School Supply Drive',
    date: '2024-07-30',
    description: 'Collecting school supplies for underprivileged children.',
    location: 'Fellowship Hall',
  },
  {
    title: 'Christmas Gift Program',
    date: '2024-12-10',
    description: 'Providing Christmas gifts to children in need.',
    location: 'Main Sanctuary',
  },
]

interface VolunteerFormData {
  name: string
  email: string
  phone: string
  program: string
  message: string
}

interface EventRegistration {
  name: string
  email: string
  phone: string
  event: string
  numberOfPeople: number
  specialRequirements: string
}

interface Program {
  title: string
  description: string
  icon: ElementType
  color: ColorClass
  schedule: string
  requirements?: string[]
}

export default function OutreachMinistryPage() {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)
  const [showVolunteerForm, setShowVolunteerForm] = useState(false)
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  })
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null,
  })
  const [showEventRegistration, setShowEventRegistration] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null)
  const [registrationData, setRegistrationData] = useState<EventRegistration>({
    name: '',
    email: '',
    phone: '',
    event: '',
    numberOfPeople: 1,
    specialRequirements: '',
  })
  const [registrationState, setRegistrationState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null,
  })

  const toggleProgram = (title: string) => {
    setExpandedProgram(expandedProgram === title ? null : title)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ isSubmitting: true, isSubmitted: false, error: null })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setFormState({ isSubmitting: false, isSubmitted: true, error: null })
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSubmitted: false }))
        setShowVolunteerForm(false)
      }, 5000)
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: 'An error occurred. Please try again.',
      })
    }
  }

  const handleEventRegistration = (event: typeof upcomingEvents[0]) => {
    setSelectedEvent(event)
    setRegistrationData(prev => ({
      ...prev,
      event: event.title,
    }))
    setShowEventRegistration(true)
  }

  const handleRegistrationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setRegistrationData(prev => ({
      ...prev,
      [name]: name === 'numberOfPeople' ? parseInt(value) || 1 : value,
    }))
  }

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegistrationState({ isSubmitting: true, isSubmitted: false, error: null })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setRegistrationState({ isSubmitting: false, isSubmitted: true, error: null })
      setRegistrationData({
        name: '',
        email: '',
        phone: '',
        event: '',
        numberOfPeople: 1,
        specialRequirements: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setRegistrationState(prev => ({ ...prev, isSubmitted: false }))
        setShowEventRegistration(false)
      }, 5000)
    } catch (error) {
      setRegistrationState({
        isSubmitting: false,
        isSubmitted: false,
        error: 'An error occurred. Please try again.',
      })
    }
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
            <Heart className="w-12 h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-6"
          >
            Outreach Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="paragraph"
          >
            Serving our community and sharing God's love through action.
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
              To demonstrate Christ's love by meeting the physical and spiritual needs
              of our community through practical service and meaningful relationships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleProgram(program.title)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg ${colorClasses[program.color]} mr-4`}>
                        <program.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                        <p className="text-gray-600">{program.description}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedProgram === program.title ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedProgram === program.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t"
                    >
                      <div className="p-6 bg-gray-50">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900">Schedule</h4>
                            <p className="text-gray-600">{program.schedule}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">How to Help</h4>
                            <ul className="list-disc list-inside text-gray-600 mt-2">
                              <li>Volunteer your time</li>
                              <li>Donate supplies</li>
                              <li>Spread awareness</li>
                            </ul>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowVolunteerForm(true)
                              setFormData(prev => ({ ...prev, program: program.title }))
                            }}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Get Involved
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </button>
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

      {/* Volunteer Form Modal */}
      <AnimatePresence>
        {showVolunteerForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowVolunteerForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:max-w-lg w-full bg-white rounded-lg shadow-xl z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Volunteer Sign Up</h3>
                  <button
                    onClick={() => setShowVolunteerForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                      Program
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a program</option>
                      {programs.map(program => (
                        <option key={program.title} value={program.title}>
                          {program.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {formState.error && (
                    <p className="text-red-600 text-sm">{formState.error}</p>
                  )}

                  {formState.isSubmitted && (
                    <p className="text-green-600 text-sm">
                      Thank you for signing up! We'll be in touch soon.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {formState.isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Upcoming Events */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-6">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                    <span className="mx-2">•</span>
                    <Users className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <button
                  onClick={() => handleEventRegistration(event)}
                  className="flex-shrink-0 ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Registration Modal */}
      <AnimatePresence>
        {showEventRegistration && selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowEventRegistration(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:max-w-lg w-full bg-white rounded-lg shadow-xl z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Event Registration</h3>
                  <button
                    onClick={() => setShowEventRegistration(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{selectedEvent.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{selectedEvent.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(selectedEvent.date).toLocaleDateString()}
                    <span className="mx-2">•</span>
                    <Users className="w-4 h-4 mr-2" />
                    {selectedEvent.location}
                  </div>
                </div>
                
                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={registrationData.name}
                      onChange={handleRegistrationChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={registrationData.email}
                      onChange={handleRegistrationChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={registrationData.phone}
                      onChange={handleRegistrationChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of People
                    </label>
                    <input
                      type="number"
                      id="numberOfPeople"
                      name="numberOfPeople"
                      min="1"
                      value={registrationData.numberOfPeople}
                      onChange={handleRegistrationChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requirements (Optional)
                    </label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={registrationData.specialRequirements}
                      onChange={handleRegistrationChange}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {registrationState.error && (
                    <p className="text-red-600 text-sm">{registrationState.error}</p>
                  )}

                  {registrationState.isSubmitted && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="w-5 h-5" />
                      <span>Registration successful! We'll be in touch soon.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={registrationState.isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {registrationState.isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      'Register Now'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Impact Stats */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Meals Served</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Volunteers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-600">Mission Trips</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">1,000+</div>
              <div className="text-gray-600">Families Helped</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="heading-lg">Get Involved</h2>
            <p className="max-w-2xl mx-auto">
              Join us in making a difference in our community. Whether you can give
              your time, resources, or skills, there's a place for you in our
              outreach programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Volunteer Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
              >
                Donate
                <Heart className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 