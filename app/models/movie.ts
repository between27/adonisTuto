import MovieService from '#services/movie_service'
import { BaseModel } from '@adonisjs/lucid/orm'
import { toHtml } from '@dimerapp/markdown/utils'

export default class Movie extends BaseModel {
  declare title: string
  declare slug: string
  declare summary: string
  declare abstract?: string

  static async all() {
    const slugs = await MovieService.getSlugs()
    const movies: Movie[] = []

    for (const slug of slugs) {
      const movie = await this.find(slug)
      movies.push(movie)
    }

    return movies
  }

  static async find(slug: string) {
    const md = await MovieService.read(slug)
    const movie = new Movie()
    movie.title = md.frontmatter.title
    movie.abstract = toHtml(md).contents
    movie.slug = slug
    movie.summary = md.frontmatter.summary

    return movie
  }
}
