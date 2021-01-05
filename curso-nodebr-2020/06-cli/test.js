const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_ITEM_INSERT = {
  name: 'Flash',
  power: 'Speed',
  id: 1
}

const DEFAULT_ITEM_BATMAN = {
  name: 'Batman',
  power: 'Brain',
  id: 2
}

const DEFAULT_UPDATE_BATMAN = {
  name: 'Batman',
  power: 'Intelligence, Martial Arts, Tech Gear',
  id: 2
}

describe('Suit for manipulate Heros', () => {

  before(async() => {
    await database.saveHero(DEFAULT_ITEM_INSERT)
    await database.saveHero(DEFAULT_ITEM_BATMAN)
  })

  it('should search a hero', async() => {
    const expected = DEFAULT_ITEM_INSERT
    const [result] = await database.listHero(expected.id)
    deepEqual(result, expected)
  })

  it('should insert a hero using files', async() => {
    const expected = DEFAULT_ITEM_BATMAN
    const result = await database.saveHero(expected)
    const [actual] = await database.listHero(expected.id)
    deepEqual(actual, expected)
  })

  it('should remove a hero', async() => {
    const expected = true
    const result = await database.removeHero(DEFAULT_ITEM_BATMAN.id)
    deepEqual(result, expected)
  })

  it('should update a hero', async() => {
    const expected = DEFAULT_UPDATE_BATMAN

    const heroUpdated = {
      name: 'Batman',
      power: 'Intelligence, Martial Arts, Tech Gear',
    }

    await database.updateHero(expected.id, heroUpdated)
    const [result] = await database.listHero(expected.id)

    deepEqual(result, expected)
  })

})
