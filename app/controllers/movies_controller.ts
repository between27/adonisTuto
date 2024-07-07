import Movie from '#models/movie'
import MovieService from '#services/movie_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies = await Movie.all()

    return view.render('pages/home', { movies })
  }

  async show({ view, params }: HttpContext) {
    const md = await MovieService.read(params.slug)
    const movie = await Movie.find(params.slug)

    return view.render('pages/movies/show', { movie, md })
  }
}
