/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import fs from 'node:fs/promises'

router.on('/').render('pages/home').as('home')

/* router
  .get('/movies', async (ctx) => {
    return ctx.view.render('pages/movies')
  })
  .as('movies.index') */

router
  .get('/movies/:slug', async (ctx) => {
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.html`)
    let movie: any
    try {
      movie = await fs.readFile(url, 'utf-8')
      ctx.view.share({ movie })
    } catch (error) {
      throw new Exception(`Could not find ${ctx.params.slug}`)
    }
    return ctx.view.render('pages/movies/show', { movie })
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())
