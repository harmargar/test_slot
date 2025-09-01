import { SlotState } from '../constants/states';
import { ObservableModel } from './observable-model';

export class SlotModel extends ObservableModel {
    private _state: SlotState;

    constructor(public item: number) {
        super("SlotModel");

        this.makeObservable('_state');
    }

    public get state(): SlotState {
        return this._state;
    }

    public set state(state: SlotState) {
        this._state = state;
    }

    public setState(state: SlotState): void {
        this.state = state;
    }

    public update(item: number): void {
        this.item = item;
    }

    public destroy(): void {
        super.destroy()
    }

    public initialize(): void {
        this._state = SlotState.idel
    }
}