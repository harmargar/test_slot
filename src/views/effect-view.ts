import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import gsap from 'gsap';
import { Sprite, Texture } from 'pixi.js';
import { getEffectViewGridConfig } from '../configs/grid-configs';
import { SlotMachineState } from '../constants/states';
import { SlotMachineEvent } from '../events/model';
import { store } from '../models/store';
import { delayRunnable, removeRunnable } from '../utils';
import { BigWinView } from './big-win-view';

export class EffectView extends PixiGrid {
    private _bigwin: BigWinView;
    private _blocker: Sprite;
    private _hideTimer: Runnable

    public constructor() {
        super();
        this.name = 'EffectView';
        this._init();

        lego.event.on(SlotMachineEvent.winUpdate, this._onWinUpdate, this);
        lego.event.on(SlotMachineEvent.stateUpdate, this._onSlotMachineStateUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getEffectViewGridConfig();
    }

    private _onWinUpdate(winValue: number): void {
        if (store.player.bet * 3 < winValue)
            this._show(winValue)
    }


    private _onSlotMachineStateUpdate(state: SlotMachineState): void {
        switch (state) {
            case SlotMachineState.spin:
                this._hide();
                break;

            default:
                break;
        }
    }

    private _show(winValue: number): void {
        gsap.to(this, { alpha: 1, duration: 1, ease: 'sine.inOut' });
        this.visible = true;
        this._bigwin.show(winValue);

        this._hideTimer = delayRunnable(8, () => {
            this._hide();
        })
    }

    private _hide(): void {
        removeRunnable(this._hideTimer);
        gsap.to(this, { alpha: 0, duration: 0.5, ease: 'sine.inOut' }).eventCallback('onComplete', () => {
            this.visible = false;
        });
        this._bigwin.hide();
    }

    private _forceHide(): void {
        removeRunnable(this._hideTimer);
        gsap.to(this, { alpha: 0, duration: 3, ease: 'sine.inOut' });
        this.visible = false;
        this._bigwin.hide();
    }

    private _init(): void {
        this.visible = false;
        this.alpha = 0;
        const blocker = new Sprite(Texture.WHITE);
        blocker.tint = 0x000000;
        blocker.alpha = 0.5;
        blocker.interactive = true;
        this.setChild('blocker', this._blocker = blocker);
        this.setChild('big_win', this._bigwin = new BigWinView());


        this._blocker.on('pointerdown', () => {
            this._hide();
        })

    }
}
