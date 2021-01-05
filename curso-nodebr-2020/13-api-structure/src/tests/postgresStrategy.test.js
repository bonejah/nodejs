const assert = require('assert')
const Postgres = require('../db/postgres/postgres')
const Context = require('../db/base/contextStrategy')
const HeroeSchema = require('../db/postgres/schemas/heroesSchema')

const MOCK_HERO_SAVE = {
  name: 'HawkMan',
  power: 'Hammer'
}

const MOCK_HERO_UPDATE = {
  name: 'Wonder Woman',
  power: 'Strength'
}

let context = {}

describe('Postgres Strategy', function () {
  this.timeout(Infinity)

  before(async () => {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, HeroeSchema)
    context = new Context(new Postgres(connection, model))


    await context.create(MOCK_HERO_UPDATE)
  })

  it('should connect Postgres', async function() {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it('should save hero', async function() {
    const result = await context.create(MOCK_HERO_SAVE)
    delete result.id
    assert.deepEqual(result, MOCK_HERO_SAVE)
  })

  it('should list hero', async function() {
    const [result] = await context.read({ name: MOCK_HERO_SAVE.name })
    delete result.id
    assert.deepEqual(result, MOCK_HERO_SAVE)
  })

  it('should update hero', async function() {
    const [hero] = await context.read({})
    
    const newHero = {
      ...MOCK_HERO_SAVE,
      name: 'Wonder Woman'
    }

    const [result] = await context.update(hero.id, newHero)
    assert.deepEqual(result, 1)
  })

  it('should remove hero', async function () {
    const [hero] = await context.read({})
    const result = await context.delete(hero.id)
    assert.deepEqual(result, 1)
  })

})