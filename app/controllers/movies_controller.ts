import type { HttpContext } from '@adonisjs/core/http'
import Movie from '#models/movie'
import { scope } from '@adonisjs/lucid/orm'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies = await Movie.all()
    const recentlyReleased = await Movie.query()
      .apply((scope) => scope.released())
      .orderBy('releasedAt', 'desc')
      .limit(5)

    const notReleased = await Movie.query()
      .apply((scope) => scope.notReleased())
      .orderBy('releasedAt', 'asc')
      .limit(5)
    return view.render('pages/home', { notReleased, stateExample: 'State info' })
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)
    return view.render('pages/movies/show', { movie })
  }
}
