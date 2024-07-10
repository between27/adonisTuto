import { CineastFactory } from '#database/factories/cineast_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { ProfileFactory } from '#database/factories/profile_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment: string[] = ['development', 'testing']
  async run() {
    // Write your database queries inside the run method
    await CineastFactory.createMany(10)
    await MovieFactory.createMany(4)
    await UserFactory.createMany(5)
    await ProfileFactory.createMany(5)
  }
}
