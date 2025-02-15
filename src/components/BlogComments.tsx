'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Heart, Reply, MoreVertical, ThumbsUp, MessageSquare, Flag, Trash2, Edit, Send, Loader2, X } from 'lucide-react'

interface Comment {
  id: string
  author: {
    name: string
    image?: string
    isAdmin?: boolean
  }
  content: string
  date: string
  likes: number
  replies: Comment[]
  isLiked?: boolean
}

// Mock comments - In a real app, these would come from an API
const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'John Smith',
      image: '/images/avatars/john.jpg',
      isAdmin: true,
    },
    content: `Thank you for your kind words, Sarah! I'm glad the message resonated with you.`,
    date: '2024-02-14',
    likes: 5,
    replies: [],
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      image: '/images/users/michael.jpg',
    },
    content: 'The practical steps for growing in faith are very helpful. I especially appreciate the emphasis on community and fellowship.',
    date: '2024-02-13',
    likes: 3,
    replies: [],
  },
]

export function BlogComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: 'Current User', // In a real app, this would come from the authenticated user
          image: '/images/users/default.jpg',
        },
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: [],
      }

      if (replyTo) {
        setComments(prev => {
          return prev.map(c => {
            if (c.id === replyTo.id) {
              return {
                ...c,
                replies: [...c.replies, comment],
              }
            }
            return c
          })
        })
        setReplyTo(null)
      } else {
        setComments(prev => [comment, ...prev])
      }
      
      setNewComment('')
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = async (commentId: string, isReply = false) => {
    // In a real app, this would make an API call
    setComments(prev => {
      return prev.map(comment => {
        if (!isReply && comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        if (isReply) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked,
                }
              }
              return reply
            }),
          }
        }
        return comment
      })
    })
  }

  const handleEditComment = async (commentId: string, isReply = false) => {
    if (!editContent.trim()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setComments(prev => {
        return prev.map(comment => {
          if (!isReply && comment.id === commentId) {
            return {
              ...comment,
              content: editContent,
            }
          }
          if (isReply) {
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    content: editContent,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        })
      })
      
      setEditingComment(null)
      setEditContent('')
    } catch (error) {
      console.error('Error editing comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string, isReply = false) => {
    // In a real app, this would make an API call
    setComments(prev => {
      if (!isReply) {
        return prev.filter(comment => comment.id !== commentId)
      }
      return prev.map(comment => ({
        ...comment,
        replies: comment.replies.filter(reply => reply.id !== commentId),
      }))
    })
  }

  const CommentActions = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => handleLikeComment(comment.id, isReply)}
        className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
          comment.isLiked ? 'text-blue-600' : 'text-gray-500'
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{comment.likes}</span>
      </button>
      {!isReply && (
        <button
          onClick={() => setReplyTo({ id: comment.id, author: comment.author.name })}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Reply className="w-4 h-4" />
          <span>Reply</span>
        </button>
      )}
      <div className="relative group">
        <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block z-10">
          <button
            onClick={() => {
              setEditingComment(comment.id)
              setEditContent(comment.content)
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => handleDeleteComment(comment.id, isReply)}
            className="w-full px-4 py-2 text-left flex items-center gap-2 text-red-600 hover:bg-gray-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Flag className="w-4 h-4" />
            Report
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-8">Comments ({comments.length})</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-12">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
            <img
              src="/images/users/default.jpg"
              alt="Your avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyTo ? `Reply to ${replyTo.author}...` : "Share your thoughts..."}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Be kind and respectful in your comments.
              </p>
              <div className="flex items-center gap-2">
                {replyTo && (
                  <button
                    type="button"
                    onClick={() => setReplyTo(null)}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                    Cancel Reply
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {replyTo ? 'Reply' : 'Comment'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map(comment => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                {comment.author.image ? (
                  <img
                    src={comment.author.image}
                    alt={comment.author.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 m-2 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {comment.author.name}
                        {comment.author.isAdmin && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            Admin
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <CommentActions comment={comment} />
                  </div>
                  {editingComment === comment.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingComment(null)
                            setEditContent('')
                          }}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          disabled={isSubmitting}
                          className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700">{comment.content}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="ml-14 space-y-4">
              {comment.replies.map(reply => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0">
                    {reply.author.image ? (
                      <img
                        src={reply.author.image}
                        alt={reply.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 m-1.5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {reply.author.name}
                            {reply.author.isAdmin && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                Admin
                              </span>
                            )}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(reply.date).toLocaleDateString()}
                          </span>
                        </div>
                        <CommentActions comment={reply} isReply />
                      </div>
                      {editingComment === reply.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingComment(null)
                                setEditContent('')
                              }}
                              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleEditComment(reply.id, true)}
                              disabled={isSubmitting}
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                'Save Changes'
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700">{reply.content}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 