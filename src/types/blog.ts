export interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  author: {
    name: string
    bio: string
    image?: string
  }
  date: string
  readTime: string
  category: string
  tags: string[]
  image?: string
  featured?: boolean
}

export type BlogCategory = {
  name: string
  slug: string
  description: string
  count: number
}

export type BlogTag = {
  name: string
  slug: string
  count: number
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    name: 'Faith',
    slug: 'faith',
    description: 'Articles about growing in faith and spiritual development',
    count: 12,
  },
  {
    name: 'Ministry',
    slug: 'ministry',
    description: 'Updates and insights from our various ministries',
    count: 8,
  },
  {
    name: 'Community',
    slug: 'community',
    description: 'Stories and news from our church community',
    count: 15,
  },
  {
    name: 'Events',
    slug: 'events',
    description: 'Upcoming and past church events',
    count: 10,
  },
  {
    name: 'Devotional',
    slug: 'devotional',
    description: 'Daily devotionals and Bible studies',
    count: 20,
  },
]

export const BLOG_TAGS: BlogTag[] = [
  { name: 'Prayer', slug: 'prayer', count: 8 },
  { name: 'Worship', slug: 'worship', count: 12 },
  { name: 'Bible Study', slug: 'bible-study', count: 15 },
  { name: 'Youth', slug: 'youth', count: 6 },
  { name: 'Outreach', slug: 'outreach', count: 9 },
  { name: 'Family', slug: 'family', count: 7 },
  { name: 'Missions', slug: 'missions', count: 5 },
  { name: 'Leadership', slug: 'leadership', count: 4 },
] 