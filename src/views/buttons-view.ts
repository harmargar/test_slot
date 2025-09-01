import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { DisplayObject, Sprite } from 'pixi.js';
import { getButtonsGridConfig } from '../configs/grid-configs';
import { SlotMachineState } from '../constants/states';
import { SlotMachineEvent } from '../events/model';
import { ButtonsClick } from '../events/view';
import { makeSprite } from '../utils';

export class ButtonsView extends PixiGrid {
    private _spinButton: Sprite;
    private _stopButton: Sprite;
    private _betIncreaseButton: Sprite;
    private _betDecreaseButton: Sprite;

    public constructor() {
        super();
        this.name = 'ButtonsView';
        this._init();

        lego.event.on(SlotMachineEvent.stateUpdate, this._onSlotMachinStateUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getButtonsGridConfig();
    }

    private _onSlotMachinStateUpdate(state: SlotMachineState): void {
        switch (state) {
            case SlotMachineState.spin:
                this._buttonDiable(this._spinButton);
                this._buttonDiable(this._betDecreaseButton);
                this._buttonDiable(this._betIncreaseButton);
                this._buttonEnable(this._stopButton)
                break;
            case SlotMachineState.idel:
            case SlotMachineState.win:
                this._buttonEnable(this._spinButton);
                this._buttonEnable(this._betDecreaseButton);
                this._buttonEnable(this._betIncreaseButton);
                this._buttonDiable(this._stopButton)
                break
            default:
                break;
        }
    }

    private _init(): void {
        this._buildSpinButton();
        this._buildStopButton();
        this._buildBetIncreaseButton();
        this._buildBetDecreaseButton();

    }

    private _buildSpinButton(): void {
        const btn = makeSprite('spin.png');
        this.setChild('spin', this._spinButton = btn);
        btn.interactive = true;

        btn.on('pointerdown', () => {
            lego.event.emit(ButtonsClick.spinButtonClick);
        })
    }

    private _buildStopButton(): void {
        const btn = makeSprite('stop.png');
        this.setChild('stop', this._stopButton = btn);
        btn.interactive = true;
        btn.x = 100;
        btn.on('pointerdown', () => {
            lego.event.emit(ButtonsClick.stopButtonClick);
        })
    }

    private _buildBetIncreaseButton(): void {
        const btn = makeSprite('bet_increase.png');
        this.setChild('betIncrease', this._betIncreaseButton = btn);
        btn.interactive = true;
        btn.x = 100;
        btn.y = 100;
        btn.on('pointerdown', () => {
            lego.event.emit(ButtonsClick.betIncreaseButtonClick);
        })
    }

    private _buildBetDecreaseButton(): void {
        const btn = makeSprite('bet_decrease.png');
        this.setChild('betDecrease', this._betDecreaseButton = btn);
        btn.interactive = true;
        btn.y = 100;
        btn.on('pointerdown', () => {
            lego.event.emit(ButtonsClick.betDecreaseButtonClick);
        })
    }

    private _buttonDiable(button: DisplayObject): void {
        button.interactive = false;
        button.alpha = 0.5;
    }


    private _buttonEnable(button: DisplayObject): void {
        button.interactive = true;
        button.alpha = 1;
    }
}
