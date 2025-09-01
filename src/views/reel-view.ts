import { BlurFilter, Container, Ticker, TickerCallback } from 'pixi.js';
import { ReelModel } from '../models/reel-model';
import { SlotView } from './slot-view';

export class RillView extends Container {
    private _slots: SlotView[] = []
    private _speed: number = 0;
    private _endPosition: number;
    private _stopPromise: TickerCallback<any>;
    private _blurFiltr: BlurFilter;

    constructor(private _rillModel: ReelModel) {
        super();

        this._build();
    }

    public spin(): void {
        this._endPosition = this.height;
        this._blurFiltr = new BlurFilter(0, 3);

        this.filters = [
            this._blurFiltr
        ];

        !!this._stopPromise && Ticker.shared.remove(this._stopPromise, this);
        Ticker.shared.add(this._spinAction, this);
    }

    public async stop(): Promise<void> {

        !!this._stopPromise && Ticker.shared.remove(this._stopPromise, this);

        return new Promise((res) => {
            this._stopPromise = () => {
                Ticker.shared.remove(this._spinAction, this);
                this._stopAction(res)
            }

            Ticker.shared.add(this._stopPromise, this);
        });
    }


    public stopForce(): void {

        !!this._stopPromise && Ticker.shared.remove(this._stopPromise, this);
        !!this._spinAction && Ticker.shared.remove(this._spinAction, this);

        this._slots.forEach(slot => {
            slot.update();
        })

        this._removeActions();
    }

    private _build(): void {
        this._rillModel.slots.forEach((slotModel, index) => {
            const slot = new SlotView(slotModel);
            slot.y = (287) * index;
            this.addChild(slot);
            this._slots.push(slot);
        })
    }

    private _spinAction(): void {
        if (this._speed <= 70) {
            this._speed += 2;
        }
        if (this._blurFiltr.blur <= 14) {
            this._blurFiltr.blur += 0.5;
        }
        this._slots.forEach(slot => {
            slot.y += this._speed;
            if (slot.y >= this._endPosition) {
                slot.y = slot.y - this._endPosition;
                slot.update();
            }
        })
    }

    private _stopAction(colback: (value: void | PromiseLike<void>) => void): void {
        this._slots.forEach((slot, index) => {
            const nextPos = slot.y + this._speed >= this._endPosition ? 0 : slot.y + this._speed;
            const startPos = (287) * index;
            if (slot.y <= startPos && nextPos > startPos) {
                slot.y = startPos
                this._speed = 0
                this._removeActions()
                colback();
            } else {
                slot.y = nextPos;
            }
        })
    }

    private _removeActions(): void {
        this.filters = [];
        Ticker.shared.remove(this._stopPromise, this);
        this._stopPromise = null;
        this._slots.forEach((slot, index) => {
            const startPos = (287) * index;
            slot.y = startPos
            this._speed = 0
            // slot.update();
        })
    }
}