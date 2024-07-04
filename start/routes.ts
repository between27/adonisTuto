/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.get('/movie', async (ctx) => {
  ctx.view.share({ movie: 'Minions' })
  return ctx.view.render('pages/movies')
})
