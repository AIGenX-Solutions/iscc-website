import { ElementType } from 'react'

export type ColorClass = 
  | 'blue' 
  | 'pink' 
  | 'green' 
  | 'yellow' 
  | 'purple' 
  | 'red' 
  | 'orange'

export interface WithColor {
  color: ColorClass
}

export interface WithIcon {
  icon: ElementType
}

export type ColorClassMap = {
  [K in ColorClass]: string
}

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export type SortDirection = 'asc' | 'desc'

export interface PaginationParams {
  page: number
  limit: number
}

export interface ApiResponse<T> {
  data: T
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
} 