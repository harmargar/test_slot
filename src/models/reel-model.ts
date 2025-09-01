import { ReelState, SlotState } from '../constants/states';
import { ObservableModel } from './observable-model';
import { SlotModel } from './slot-model';

export class ReelModel extends ObservableModel {
    private _slots: SlotModel[] = [];
    private _state: ReelState;

    constructor(slotCount: number) {
        super("RillModel");

        this.makeObservable('_slots', '_state');

        this._initialize(slotCount);
    }

    public get slots(): SlotModel[] {
        return this._slots;
    }

    public set slots(slots: SlotModel[]) {
        this._slots = slots;
    }


    public get state(): ReelState {
        return this._state;
    }

    public set state(value: ReelState) {
        this._state = value;
    }

    public updateState(state: ReelState): void {
        switch (state) {
            case ReelState.spin:
                this._slots.forEach(slot => {
                    slot.setState(SlotState.idel);
                })
                break;

            default:
                break;
        }
    }

    public showWinBySlotIndex(index: number): void {
        this.slots[index].setState(SlotState.win);
    }

    public update(slotsResult: number[]): void {
        this._slots.forEach((slot, index) => {
            slot.update(slotsResult[index]);
        })
    }

    public destroy(): void {
        super.destroy()
    }

    private _initialize(slotCount: number): void {
        for (let i = 0; i < slotCount; i++) {
            this._slots.push(new SlotModel(Math.floor(Math.random() * 9) + 1));
        }
    }
}