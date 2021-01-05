const assert = require("assert");
const api = require("../api");

let app = {};

const MOCK_HERO_SAVE_DEFAULT = {
  name: 'Chapolin Colorado',
  power: 'Bionic Hammer'
}

const MOCK_HERO_UPDATE_DEFAULT = {
  name: 'Superman',
  power: 'Strong'
}

let MOCK_ID = ''

describe.only("Tests API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: 'POST',
      url: '/heroes',
      payload: JSON.stringify(MOCK_HERO_UPDATE_DEFAULT)
    })

    const data = JSON.parse(result.payload)
    MOCK_ID = data._id
  });

  it("should list heroes /heroes", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/heroes?skip=0&limit=10",
    });

    const data = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(data));
  });

  it("should list heroes /heroes with 10 registers", async () => {
    const LIMIT_SIZE = 2;
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
    });

    const data = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(data.length === LIMIT_SIZE);
  });

  it("should validate skip and limit", async () => {
    const LIMIT_SIZE = "ADSDS";
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
    });

    const errorResult = {
      statusCode: 400,
      error: "Bad Request",
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: { source: "query", keys: ["limit"] },
    };

    assert.deepEqual(result.statusCode, 400)
    assert.deepEqual(result.payload, JSON.stringify(errorResult))
  });

  it("should filter a hero", async () => {
    const LIMIT_SIZE = 1000;
    const NAME = "Patolino";
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}&name=${NAME}`,
    });

    const data = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(data[0].name === NAME);
  });

  it('should save a hero', async () => {
    
    const result = await app.inject({
      method: "POST",
      url: '/heroes',
      payload: JSON.stringify(MOCK_HERO_SAVE_DEFAULT)
    });

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)
    
    assert.ok(statusCode === 200)
    assert.notStrictEqual(_id, undefined)
    assert.deepEqual(message, "Hero saved with success!")
  })

  it('shoul update a hero', async() => {
    const _id = MOCK_ID
    const expected = {
      power: 'Speed'
    }

    const result = await app.inject({
      method: "PATCH",
      url: `/heroes/${_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode
    const { message } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(message, "Hero updated with success!")
  })

  it('should not update a hero with incorrect ID', async() => {
    const _id = '5ff2f06f192f93139828b1f7'
    const expected = {
      power: 'Speed'
    }

    const result = await app.inject({
      method: "PATCH",
      url: `/heroes/${_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode
    const { message } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(message, "It was not possible to update a hero")
  })

});
