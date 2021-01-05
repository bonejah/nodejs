const assert = require('assert')
const PasswordHelper = require('../src/helpers/passwordHelper')

const PASSWORD = 'blima@123@456'
const HASH = '$2b$04$b/WMNhBpWXMUO7w9I3KSN.FJh0xp7EBIyFru9BMdQ1GM45oFsWnIS'

describe('UserHelper Suit', function() {

  it('should generate a hash through a password', async () => {
    const result = await PasswordHelper.hashPassword(PASSWORD)
    assert.ok(result.length > 10)
  })

  it('should compare a password with your hash', async() => {
    const result = await PasswordHelper.comparePassword(PASSWORD, HASH)
    assert.ok(result)
  }) 
})