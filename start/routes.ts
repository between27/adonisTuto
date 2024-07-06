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
import { toHtml } from '@dimerapp/markdown/utils'
import { MarkdownFile } from '@dimerapp/markdown'
import { title } from 'node:process'
import MovieService from '#services/movie_service'
const MoviesController = () => import('#controllers/movies_controller')

router.get('/', [MoviesController, 'index']).as('home')

/* router
  .get('/movies', async (ctx) => {
    return ctx.view.render('pages/movies')
  })
  .as('movies.index') */

router
  .get('/movies/:slug', [MoviesController, 'show'])
  .as('movies.show')
  .where('slug', router.matchers.slug())
