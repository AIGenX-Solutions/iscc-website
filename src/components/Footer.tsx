'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'Our Mission', href: '/about#mission' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Values', href: '/about#values' },
    ],
  },
  {
    title: 'Ministries',
    links: [
      { label: 'Men\'s Ministry', href: '/ministries/mens' },
      { label: 'Women\'s Ministry', href: '/ministries/womens' },
      { label: 'Youth Ministry', href: '/ministries/youth' },
      { label: 'Children\'s Ministry', href: '/ministries/children' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Sermons', href: '/sermons' },
      { label: 'Events', href: '/events' },
      { label: 'Prayer Requests', href: '/prayer-requests' },
      { label: 'Give', href: '/give' },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Mail, href: 'mailto:contact@iscc.org', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">ISCC</h2>
            <p className="text-gray-400">
              Uniting believers worldwide to nurture faith, leadership, and service in our communities.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} International Shepards Christian Coalition. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 