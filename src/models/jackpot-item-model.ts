import { Point } from 'pixi.js';
import { SlotState } from '../constants/states';
import { delayRunnable, lp } from '../utils';
import { ObservableModel } from './observable-model';

export class JackpotItemModel extends ObservableModel {
    private _state: SlotState;
    private _name: string;
    private _position: JecpoPositiontConfig;
    private _value: number;

    constructor(private _config: JecpotConfig) {
        super("JackpotItemModel");

        const { name, position, value } = this._config;

        this._name = name;
        this._position = position;
        this._value = value;

        this.makeObservable('_value', '_position');

        this.initialize();
    }

    public get name(): string {
        return this._name;
    }

    public get value(): number {
        return this._value;
    }

    public set value(val: number) {
        this._value = val;
    }

    public get position(): Point {
        return lp(this._position.landscape, this._position.portrait);
    }


    // public set position(value: Point) {
    //     this._position = value;
    // }

    public initialize(): void {
        this._updateValue();
    }

    private _updateValue(): void {
        delayRunnable(Math.random() * 10 + 10, () => {
            this.value += this.value * 0.01;
            this._updateValue();
        })
    }
}