import { lego } from '@armathai/lego';
import gsap from 'gsap';
import { Container, Sprite } from 'pixi.js';
import { SlotState } from '../constants/states';
import { SlotEvent } from '../events/model';
import { SlotModel } from '../models/slot-model';
import { makeSprite } from '../utils';

export class SlotView extends Container {
    private _item: Sprite;
    private _effect: Sprite;

    constructor(private _slotModel: SlotModel) {
        super();
        this._build();


        lego.event.on(SlotEvent.stateUpdate, this._onStateUpdate, this)

    }

    public update(): void {
        this._item.destroy();
        this._effect.destroy();
        this._build();
    }

    private _onStateUpdate(state: SlotState, preState: SlotState, uuid: string): void {
        if (this._slotModel.uuid != uuid) return;
        switch (state) {
            case SlotState.idel:
                this.hideWinEffwct();
                break;
            case SlotState.win:
                this.showWinEffwct();
                break;

            default:
                break;
        }
    }


    private _build(): void {
        this._buildItem();
        this._buildEffect();
    }

    public showWinEffwct(): void {
        this._effect.alpha = 0;
        this._effect.visible = true;
        gsap.to(this._effect, { alpha: 1, duration: 0.8, repeat: -1, delay: 0.5, yoyo: true, ease: "sine.inOut" });
        gsap.to(this._effect.scale, { x: 1.01, y: 1.01, duration: 0.8, repeat: -1, delay: 0.5, yoyo: true, ease: "sine.inOut" });
    }

    public hideWinEffwct(): void {
        gsap.killTweensOf(this._effect);
        gsap.killTweensOf(this._effect.scale);
        this._effect.alpha = 0;
        this._effect.scale.set(1);
        this._effect.visible = false;
    }

    private _buildItem(): void {
        const item = makeSprite(`item_${this._slotModel.item}.png`);
        this.addChild(this._item = item);
    }

    private _buildEffect(): void {
        const effect = makeSprite(`item_effect_${this._slotModel.item}.png`);
        effect.visible = false;
        this.addChild(this._effect = effect);

    }
}