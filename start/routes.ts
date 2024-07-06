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

router
  .get('/', async (context) => {
    const url = app.makeURL('resources/movies')
    const files = await fs.readdir(url)
    const movies: Record<string, any>[] = []

    for (const filename of files) {
      const movieUrl = app.makeURL(`resources/movies/${filename}`)
      const file = await fs.readFile(movieUrl, 'utf-8')
      const md = new MarkdownFile(file)

      await md.process()

      movies.push({
        title: md.frontmatter.title,
        summary: md.frontmatter.summary,
        slug: filename.replace('.md', ''),
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
    try {
      file = await fs.readFile(url, 'utf-8')
      const md = new MarkdownFile(file)

      await md.process()
      movie = toHtml(md).contents
      ctx.view.share({ movie })
    } catch (error) {
      throw new Exception(`Could not find ${ctx.params.slug}`)
    }
    return ctx.view.render('pages/movies/show', { movie })
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())
