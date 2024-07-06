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

router
  .get('/', async (context) => {
    const slugs = await MovieService.getSlugs()
    const movies: Record<string, any>[] = []

    for (const slug of slugs) {
      const md = await MovieService.read(slug)

      movies.push({
        title: md.frontmatter.title,
        summary: md.frontmatter.summary,
        slug,
      })
    }

    return context.view.render('pages/home', { movies })
  })
  .as('home')

/* router
  .get('/movies', async (ctx) => {
    return ctx.view.render('pages/movies')
  })
  .as('movies.index') */

router
  .get('/movies/:slug', async (ctx) => {
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.md`)
    let movie: any
    let file: any

    file = await fs.readFile(url, 'utf-8')
    const md = await MovieService.read(ctx.params.slug)

    await md.process()
    movie = toHtml(md).contents
    ctx.view.share({ movie })

    return ctx.view.render('pages/movies/show', { movie })
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())
