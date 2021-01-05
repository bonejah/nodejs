const assert = require("assert");
const MongoDB = require("../db/mongodb/mongodb");
const Context = require("../db/base/contextStrategy");
const HeroesSchema = require('../db/mongodb/schemas/heroesSchema')

const MOCK_SAVE_HERO = {
  name: "Darkseid",
  power: "Punch"
};

const MOCK_SAVE_HERO_DEFAULT = {
  name: "Spider Man",
  power: "Cobweb"
};

const MOCK_UPDATE_HERO_DEFAULT = {
  name: "Patolino",
  power: "Speaker"
};

let MOCK_HERO_ID = ''
let context = {}

describe("MongoDB Strategy", () => {
  before(async () => {
    const connection = MongoDB.connect()
    context = new Context(new MongoDB(connection, HeroesSchema))

    await context.create(MOCK_SAVE_HERO_DEFAULT)
    const result = await context.create(MOCK_UPDATE_HERO_DEFAULT)
    MOCK_HERO_ID = result._id
  });

  it("should verify the connection", async () => {
    const result = await context.isConnected();
    const expected = "Connected";
    assert.deepEqual(result, expected);
  });

  it("should save a hero", async () => {
    const { name, power} = await context.create(MOCK_SAVE_HERO)
    assert.deepEqual({ name, power }, MOCK_SAVE_HERO)
  });

  it ('should list hero', async () => {
    const [{ name, power }] = await context.read({ name: MOCK_SAVE_HERO.name })
    const result = {
      name, power
    }

    assert.deepEqual(result, MOCK_SAVE_HERO)
  })

  it('should update a hero', async () => {
    const result = await context.update(MOCK_HERO_ID, { name: 'Pernalonga'})

    assert.deepEqual(result.nModified, 1)
  })

  it('should remove a hero', async () => {
    const result = await context.delete(MOCK_HERO_ID)
    assert.deepEqual(result.n, 1)
  })
  
});
