import * as EventEmitter2 from 'eventemitter2'

const emitter = new EventEmitter2.EventEmitter2({
  wildcard: true,
  delimiter: '.'
})

export default emitter
