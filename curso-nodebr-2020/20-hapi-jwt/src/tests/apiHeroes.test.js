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

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsaW1hIiwiaWQiOjEsImlhdCI6MTYwOTc2NzM2MH0.6JLMk4hJOB-nsOCL0UvD2I0Y9sIryODmc8-NJQxeOYU"

const headers = {
  authorization: TOKEN
}

let MOCK_ID = ''

describe("Tests API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: 'POST',
      url: '/heroes',
      payload: JSON.stringify(MOCK_HERO_UPDATE_DEFAULT),
      headers
    })

    const data = JSON.parse(result.payload)
    MOCK_ID = data._id
  });

  it("should list heroes /heroes", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/heroes?skip=0&limit=10",
      headers
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
      headers
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
      headers
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
    const NAME = MOCK_HERO_SAVE_DEFAULT.name;
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}&name=${NAME}`,
      headers
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
      payload: JSON.stringify(MOCK_HERO_SAVE_DEFAULT),
      headers
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
      payload: JSON.stringify(expected),
      headers
    });

    const statusCode = result.statusCode
    const { message } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(message, "Hero updated with success!")
  })

  it('should not update a hero with incorrect ID', async() => {
    const _id = '5ff2f06f192f93139828b1f7'
    const heroUpdated = {
      power: 'Speed'
    }

    const result = await app.inject({
      method: "PATCH",
      url: `/heroes/${_id}`,
      payload: JSON.stringify(heroUpdated),
      headers
    });

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)
    const expected = {
      statusCode: 412,
      error: 'Precondition Failed',
      message: 'It was not possible to update a hero'
    }

    assert.ok(statusCode === 412)
    assert.deepEqual(data, expected)
  })

  it('should remove a hero', async () => {
    const _id = MOCK_ID

    const result = await app.inject({
      method: "DELETE",
      url: `/heroes/${_id}`,
      headers
    });

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(data.message, "Hero removed with success!")
  })

  it('should not remove a hero with an ID incorrect', async () => {
    const _id = '5ff2f06f192f93139828b1f7'

    const result = await app.inject({
      method: "DELETE",
      url: `/heroes/${_id}`,
      headers
    });

    const statusCode = result.statusCode
    const data = JSON.parse(result.payload)
    const expected = {
      statusCode: 412,
      error: 'Precondition Failed',
      message: 'It was not possible to remove a hero'
    }
    
    assert.ok(statusCode === 412)
    assert.deepEqual(data, expected)
  })

});
