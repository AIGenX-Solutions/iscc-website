'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, Tag, User, ArrowLeft, Hash } from 'lucide-react'
import { NewsletterSubscription } from '@/components/NewsletterSubscription'
import { BlogComments } from '@/components/BlogComments'
import { SocialShare } from '@/components/SocialShare'
import { ReadingProgress } from '@/components/ReadingProgress'
import { BlogPost } from '@/types/blog'

// This would typically come from a CMS or API
const blogPost: BlogPost = {
  id: '1',
  slug: 'walking-in-faith',
  title: 'Walking in Faith: A Journey of Trust',
  content: `
    <p>Faith is the cornerstone of our Christian journey. It's what guides us through both the mountaintop experiences and the valley moments of our lives. In today's fast-paced world, maintaining and growing in faith can seem like an increasingly challenging task.</p>

    <h2>The Nature of Faith</h2>
    <p>Hebrews 11:1 tells us that "faith is the substance of things hoped for, the evidence of things not seen." This profound truth reminds us that faith isn't just about what we can see or touch, but about trusting in God's promises and His unchanging nature.</p>

    <h2>Practical Steps for Growing in Faith</h2>
    <ol>
      <li>Regular Bible Study and Prayer</li>
      <li>Fellowship with Other Believers</li>
      <li>Active Service in Your Community</li>
      <li>Practicing Gratitude</li>
    </ol>

    <h2>Overcoming Challenges</h2>
    <p>Every believer faces moments of doubt and uncertainty. These challenges, rather than being obstacles, can become opportunities for strengthening our faith when we approach them with the right perspective.</p>

    <blockquote>
      "Trust in the LORD with all your heart and lean not on your own understanding." - Proverbs 3:5
    </blockquote>
  `,
  excerpt: 'Explore the journey of growing in faith and trust in God through practical steps and biblical wisdom.',
  author: {
    name: 'Pastor John Smith',
    bio: 'Pastor and teacher with a passion for helping others grow in their faith journey. Regular contributor to the ISCC blog and speaker at various Christian conferences.',
    image: '/images/authors/john-smith.jpg',
  },
  date: '2024-02-15',
  readTime: '5 min read',
  category: 'Faith',
  tags: ['Prayer', 'Trust', 'Spiritual Growth', 'Bible Study'],
  image: '/images/blog/faith-journey.jpg',
  featured: true,
}

// Mock related posts
const relatedPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'faith-journey',
    title: 'My Faith Journey',
    content: 'Full content of the faith journey article...',
    excerpt: 'A personal testimony of growth and transformation through faith...',
    author: {
      name: 'Sarah Johnson',
      bio: 'Sarah is a long-time member of our church community...',
      image: '/images/authors/sarah.jpg',
    },
    date: '2024-02-14',
    readTime: '5 min read',
    category: 'Faith',
    tags: ['testimony', 'faith', 'personal'],
    image: '/images/blog/faith-journey.jpg',
  },
  {
    id: '2',
    slug: 'prayer-guide',
    title: 'A Beginner\'s Guide to Prayer',
    content: 'Full content of the prayer guide article...',
    excerpt: 'Learn the fundamentals of developing a strong prayer life...',
    author: {
      name: 'Pastor John Smith',
      bio: 'Pastor John has been leading our congregation for over 10 years...',
      image: '/images/authors/john.jpg',
    },
    date: '2024-02-10',
    readTime: '8 min read',
    category: 'Prayer',
    tags: ['prayer', 'guide', 'beginners'],
    image: '/images/blog/prayer.jpg',
  },
  {
    id: '3',
    slug: 'community-impact',
    title: 'Making an Impact in Our Community',
    content: 'Full content of the community impact article...',
    excerpt: 'How our church is reaching out and serving our local community...',
    author: {
      name: 'Mary Wilson',
      bio: 'Mary leads our community outreach programs...',
      image: '/images/authors/mary.jpg',
    },
    date: '2024-02-08',
    readTime: '6 min read',
    category: 'Community',
    tags: ['outreach', 'service', 'community'],
    image: '/images/blog/community.jpg',
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="pt-16">
      {/* Reading Progress */}
      <ReadingProgress
        title={blogPost.title}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        description={blogPost.excerpt}
      />

      {/* Hero Section */}
      <section className="gradient-bg py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-white"
          >
            <div className="mb-6">
              <Link
                href={`/blog/category/${blogPost.category.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Tag className="w-4 h-4 mr-2" />
                {blogPost.category}
              </Link>
            </div>
            <h1 className="heading-xl mb-6">{blogPost.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/80">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {blogPost.author.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blogPost.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {blogPost.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="lg:flex lg:gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:flex-1"
            >
              <div className="prose prose-lg max-w-none dark:prose-invert article-content">
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {blogPost.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <Hash className="w-3 h-3 mr-1" />
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600 dark:text-gray-400">
                    Share this article:
                  </div>
                  <SocialShare
                    title={blogPost.title}
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                    description={blogPost.excerpt}
                  />
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start space-x-4">
                  {blogPost.author.image ? (
                    <img
                      src={blogPost.author.image}
                      alt={blogPost.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">{blogPost.author.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{blogPost.author.bio}</p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-80 mt-12 lg:mt-0"
            >
              <div className="sticky top-24">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Related Posts</h3>
                  <div className="space-y-6">
                    {relatedPosts.map(post => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <div className="aspect-video rounded-lg overflow-hidden mb-3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {post.readTime} • {new Date(post.date).toLocaleDateString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <NewsletterSubscription />
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <BlogComments />
        </div>
      </section>
    </main>
  )
} 