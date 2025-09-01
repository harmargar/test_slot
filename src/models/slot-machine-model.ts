import { getResult } from '../back_end/get-result';
import { slotConfig } from '../configs/slot-config';
import { ReelState, SlotMachineState } from '../constants/states';
import { delayRunnable, removeRunnable } from '../utils';
import { ObservableModel } from './observable-model';
import { ReelModel } from './reel-model';
import { store } from './store';

export class SlotMachineModel extends ObservableModel {
    private _reels: ReelModel[];
    private _state: SlotMachineState;
    private _spinResult: BackEndRsult;
    private _stopTimer: Runnable;
    private _win: number;

    constructor() {
        super("SlotMachineModel");

        this.makeObservable("_reels", "_state", "_win");
    }

    public get reels(): ReelModel[] {
        return this._reels;
    }

    public set reels(value: ReelModel[]) {
        this._reels = value;
    }

    public get state(): SlotMachineState {
        return this._state;
    }

    public set state(value: SlotMachineState) {
        this._state = value;
    }

    public set win(value: number) {
        this._win = value;
    }


    public get win(): number {
        return this._win;
    }

    public checkWin(): void {
        this.state = SlotMachineState.idel;

        if (!!this._spinResult.winSlotsPositions.length) {
            this.win = this._spinResult.win;
            const slotsPos = this._spinResult.winSlotsPositions;
            slotsPos.forEach(pos => {
                this._reels[pos[0]].showWinBySlotIndex(pos[1]);
            })
        }
    }

    public spin(): void {
        this._state = SlotMachineState.spin;
        this.win = 0;
        this._spinResult = getResult(store.player.bet);

        const { slots: result } = this._spinResult;
        this._reels.forEach(reel => {
            reel.updateState(ReelState.spin);
        })
        this._reels.forEach((reel, index) => {
            reel.update(result[index]);
        });

        this._stopTimerStart();
    }

    public stop(force: Boolean = false): void {
        this._state = !force ? SlotMachineState.stop : SlotMachineState.stopForce;

        removeRunnable(this._stopTimer);
    }

    public destroy(): void {
        super.destroy()
    }

    public initialize(): void {
        const config = slotConfig;

        this._state = SlotMachineState.idel;
        this._builRells(config.reelCount, config.slotCount);
    }

    private _stopTimerStart(): void {
        this._stopTimer = delayRunnable(3, this.stop, this);
    }

    private _builRells(rillCount: number, slotCount: number): void {
        const rills = []
        for (let i = 0; i < rillCount; i++) {
            rills.push(new ReelModel(slotCount));
        }
        this.reels = rills;
    }
}