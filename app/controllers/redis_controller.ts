// import type { HttpContext } from '@adonisjs/core/http'

import cache from '#services/cache_service'
import { HttpContext } from '@adonisjs/core/http'

export default class RedisController {
  async destroy({ response, params }: HttpContext) {
    console.log('destroyed')
    await cache.delete(params.slug)
    return response.redirect().back()
  }

  async flush({ response }: HttpContext) {
    console.log('flushed')
    await cache.flushDB()
    return response.redirect().back()
  }
}
