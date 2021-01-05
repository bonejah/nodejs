const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HERO_SAVE = {
  name: 'HawkMan',
  power: 'Hammer'
}

const MOCK_HERO_UPDATE = {
  name: 'Wonder Woman',
  power: 'Strength'
}

describe('Postgres Strategy', function () {
  this.timeout(Infinity)

  before(async function() {
    await context.connect()
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