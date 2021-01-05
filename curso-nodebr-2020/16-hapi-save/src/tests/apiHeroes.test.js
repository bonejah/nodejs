const assert = require("assert");
const api = require("../api");

let app = {};

const MOCK_HERO_SAVE_DEFAULT = {
  name: 'Chapolin Colorado',
  power: 'Bionic Hammer'
}

describe.only("Tests API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;
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

  it.only('should save a hero', async () => {
    
    const result = await app.inject({
      method: "POST",
      url: '/heroes',
      payload: JSON.stringify(MOCK_HERO_SAVE_DEFAULT)
    });

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)
    
    assert.ok(statusCode === 200)
    assert.notStrictEqual(_id, undefined)
    assert.deepEqual(message, "Hero save with success!")
  })

});
