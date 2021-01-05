const EventEmitter = require('events')

class MyEmmiter extends EventEmitter {

}

const eventName = 'user:click'
const myEmmiter = new MyEmmiter()

myEmmiter.on(eventName, function(click) {
  console.log('a user click', click)
})

myEmmiter.emit(eventName, 'on scrollbar')
myEmmiter.emit(eventName, 'on ok')

let count = 0
setInterval(function(){
  myEmmiter.emit(eventName, 'no cancel' + (count++))
}, 1000)

// const stdin = process.openStdin()
// stdin.addListener('data', function(value) {
//   console.log(`You insert: ${value.toString().trim()}`)
// })
