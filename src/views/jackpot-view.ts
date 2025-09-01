import { Container } from 'pixi.js';
import { JackpotModel } from '../models/jackpot-model';
import { JackpotItemView } from './jackpot-item-view';

export class JackpotView extends Container {
    private _items: JackpotItemView[] = []

    constructor(private _jackpotModel: JackpotModel) {
        super();

        this._build();
    }

    public rebuild(): void {
        this._items.forEach(item => {
            item.rebuild();
        })
    }

    private _build(): void {
        this._jackpotModel.items.forEach(item => {
            const jecpotItem = new JackpotItemView(item);
            this.addChild(jecpotItem);
            this._items.push(jecpotItem);
        });
    }
}