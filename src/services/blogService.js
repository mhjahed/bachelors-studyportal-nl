import { Repository } from './storage/repository.js'
import { STORAGE_KEYS } from './storage/constants.js'

class BlogServiceClass extends Repository {
  constructor() {
    super(STORAGE_KEYS.BLOGS, 'blog')
  }

  getPublished() {
    return this.filter({ status: 'published' })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  getFeatured() {
    return this.findMany((b) => b.status === 'published' && b.featured === true)
  }

  getRecommended() {
    return this.findMany((b) => b.status === 'published' && b.recommended === true)
  }

  getByCategory(category) {
    return this.findMany((b) => b.status === 'published' && b.category === category)
  }

  findBySlug(slug) {
    if (!slug) return null
    return this.findOne((b) => b.slug === slug)
  }

  searchBlogs(query) {
    return this.search(query, ['title', 'subtitle', 'body', 'tags', 'category'])
  }

  incrementViews(id) {
    const blog = this.findById(id)
    if (!blog) return null
    return this.update(id, { views: (blog.views || 0) + 1 })
  }
}

export const BlogService = new BlogServiceClass()