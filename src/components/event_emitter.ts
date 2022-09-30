namespace EventEmitter {
    export type Listener = (...args: any[]) => void

    export interface Events {
        [event: string]: Listener[]
    }

    export interface Emitter {
        on(event: string, listener: Listener): () => void

        off(event: string, listener: Listener): void

        offAll(): void

        emit(event: string, ...args: any[]): void

        once(event: string, listener: Listener): () => void
    }
}

/**
 * @class EventEmitter
 * @description
 * Simple EventEmitter to manage a set of listeners and publishing
 * events to them when it is told that such events happened.
 */
export class EventEmitter implements EventEmitter.Emitter {
    private readonly events: EventEmitter.Events = {
        '*': [],
    }

    public on(event: string, listener: EventEmitter.Listener): () => void {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = []
        }

        this.events[event].push(listener)

        return () => this.off(event, listener)
    }

    public off(event: string, listener: EventEmitter.Listener): void {
        if (typeof this.events[event] !== 'object') {
            return
        }

        this.events[event] = this.events[event].filter(
            (eventListener) => eventListener !== listener
        )
    }

    public offAll(): void {
        Object.keys(this.events).forEach(
            (event: string) => (this.events[event] = [])
        )
    }

    public emit(event: string, ...args: any[]): void {
        if (typeof this.events[event] === 'object') {
            ;[...this.events[event]].forEach((listener) => listener.apply(this, args))
        }

        ;[...this.events['*']].forEach((listener) =>
            listener.apply(this, [event, ...args])
        )
    }

    public once(event: string, listener: EventEmitter.Listener): () => void {
        const remove: () => void = this.on(event, (...args: any[]) => {
            remove()
            listener.apply(this, args)
        })
        return remove
    }
}
