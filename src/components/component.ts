import {EventEmitter} from "../utils/event_emitter";

export interface IComponentProps<StateType> {
    $target: Element;
    initialState: StateType;
}

export default abstract class Component<StateType> extends EventEmitter {
    protected $target;
    protected $element: HTMLElement | null;
    protected state?;

    constructor({$target, initialState}: IComponentProps<StateType>) {
        super();
        this.$target = $target;
        this.state = initialState;
        this.$element = null;

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
     */
    setState<K extends keyof StateType>(newState: Pick<StateType, K> | StateType, preventRender?: boolean): void {
        if (!this.checkNeedUpdate(newState)) return;
        if (this.state) {
            this.state = {...this.state, ...newState};
        } else {
            this.state = {...newState} as StateType;
        }
        if (preventRender) return;
        this.render();
    }


    /**
     * Component state validation
     *
     * @param newState state value to validate
     */
    checkNeedUpdate<K extends keyof StateType>(newState: Pick<StateType, K> | StateType): boolean {
        const prevState = JSON.stringify({...this.state});
        const currentState = JSON.stringify({...this.state, ...newState});
        return prevState !== currentState;
    }
}
