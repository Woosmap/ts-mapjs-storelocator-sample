import {EventEmitterNS as Emitter} from '../../components/event_emitter'
import {EventEmitter} from '../../components/event_emitter'

describe('- Event Emitter', () => {
    let eventEmitter: Emitter.Emitter

    beforeEach(() => {
        eventEmitter = new EventEmitter()
    })

    it('should allow subscription to any event', () => {
        return new Promise<void>((resolve) => {
            const testEvent = 'user-position'
            const testPayload = {lat: '43.3', lng: '2.4'}
            eventEmitter.on(testEvent, (payload) => {
                expect(payload).toBe(testPayload)
                resolve()
            })

            eventEmitter.emit(testEvent, testPayload)
        })
    })

    it('should allow subscription to any event once', () => {
        return new Promise<void>((resolve) => {
            const testEvent = 'user-position'
            const testPayload = {lat: '43.3', lng: '2.4'}
            eventEmitter.once(testEvent, (payload) => {
                expect(payload).toBe(testPayload)
                resolve()
            })

            eventEmitter.emit(testEvent, testPayload)
        })
    })
})
