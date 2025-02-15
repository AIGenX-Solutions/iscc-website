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

interface Program {
  title: string
  description: string
  icon: ElementType
  color: ColorClass
  schedule: string
  requirements?: string[]
}

// ... rest of the file ... 