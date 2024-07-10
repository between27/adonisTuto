import factory from '@adonisjs/lucid/factories'
import Movie from '#models/movie'
import MovieStatuses from '#enums/movie_statuses'

export const MovieFactory = factory
  .define(Movie, async ({ faker }) => {
    let song = faker.music.songName()
    return {
      statusId: MovieStatuses.WRITING,
      writerId: 1,
      directorId: 2,
      title: song,
      slug: faker.helpers.slugify(song),
      summary: faker.lorem.sentence(),
      abstract: faker.lorem.paragraph(),
      posterUrl: faker.image.urlPicsumPhotos(),
      releasedAt: null,
    }
  })
  .build()
