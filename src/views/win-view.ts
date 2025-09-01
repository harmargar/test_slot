import { lego } from '@armathai/lego';
import { Container, Text } from 'pixi.js';
import { SlotMachineEvent } from '../events/model';
import { animateText, makeText } from '../utils';

export class WinView extends Container {
    private _value: Text;

    constructor() {
        super();
        this.name = "WinView";

        this._init();

        lego.event.on(SlotMachineEvent.winUpdate, this._updateValue, this)
    }

    private _init(): void {
        const title = makeText({ text: 'WIN', style: { fill: 0xffffff, fontWeight: '700', fontSize: 22 } })
        title.y = 35
        this.addChild(title);

        this._value = makeText({ text: '0', style: { fill: 0xffffff, fontWeight: '900', fontSize: 32 } });
        this.addChild(this._value)
    }

    private _updateValue(newValue: number): void {
        animateText(this._value, 1, newValue, 1);
    }

}