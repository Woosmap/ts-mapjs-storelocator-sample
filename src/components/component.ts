import {EventEmitter} from "./event_emitter";

export interface IComponentProps<StateType> {
    $target: HTMLElement;
    initialState: StateType;
}

export default abstract class Component<StateType> extends EventEmitter {
    protected $target;
    protected $element!: HTMLElement;
    protected state;

    constructor({$target, initialState}: IComponentProps<StateType>) {
        super();
        this.$target = $target;
        this.state = initialState;

        this.init();
        this.render();
    }

    /**
     * Set the component default value when creating it
     */
    abstract init(): void;

    /**
     * Render the component to the DOM
     */
    abstract render(): void;

    /**
     * Component state change logic
     *
     * @param newState state value to change
     * @param preventRender If true, no rendering is done after the state is changed.
     * @param callback If set, called back if state has changed.
     */
    setState<K extends keyof StateType>(newState: Pick<StateType, K> | StateType, preventRender?: boolean, callback?: () => any): void {
        if (!this.checkNeedUpdate(newState)) return;
        if (this.state) {
            this.state = {...this.state, ...newState};
        } else {
            this.state = {...newState} as StateType;
        }
        if (callback) {
            callback();
            return;
        }
        if (preventRender) return;
        this.render();
    }


    /**
     * Component state validation, basic... can use more advanced like fast-deep-equal package
     *
     * @param newState state value to validate
     */
    checkNeedUpdate<K extends keyof StateType>(newState: Pick<StateType, K> | StateType): boolean {
        const prevState = JSON.stringify({...this.state});
        const currentState = JSON.stringify({...this.state, ...newState});
        return prevState !== currentState;
    }

}
