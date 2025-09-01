import { JackpotItemModel } from './jackpot-item-model';
import { ObservableModel } from './observable-model';

export class JackpotModel extends ObservableModel {
    private _items: JackpotItemModel[] = [];

    constructor(private _config: JecpotConfig[]) {
        super("JackpotModel");

        this.makeObservable();
        this.initialize();
    }

    public get items(): JackpotItemModel[] {
        return this._items;
    }


    public set items(value: JackpotItemModel[]) {
        this._items = value;
    }

    public initialize(): void {
        this._config.forEach(value => {
            this._items.push(new JackpotItemModel(value));
        })
    }
}