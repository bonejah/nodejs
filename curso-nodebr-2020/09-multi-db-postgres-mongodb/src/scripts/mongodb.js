docker ps

docker exec -it 54822f78b483 \
  mongo -u bonejah -p 123456 --authenticationDatabase heroes

// show databases
show dbs

// change context to a database
use heroes

// show document collections
show collections

// comand to insert
db.heroes.insert({
  name: 'Batman',
  power: 'Intelligence'
})

for (let i=0; i<= 100; i++) {
  db.heroes.insert({
    name: `Batman-${i}`,
    power: 'Intelligence'
  })
}

// comand to select
db.heroes.find()
db.heroes.find({ name: "Superman"})
db.heroes.find().pretty()
db.heroes.findOne()
db.heroes.find().limit(1000).sort({ name: -1})
db.heroes.find({}, { power: 1, _id: 0})

// command to count registers
db.heroes.count()

// update
db.heroes.update({ _id: ObjectId("5ff0da2c686e37d9256b7b97") },
    { $set: {name: "Superman"} })

// remove
db.heroes.remove({})
db.heroes.remove({ name: "Superman" })
