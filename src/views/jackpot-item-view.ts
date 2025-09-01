import { lego } from '@armathai/lego';
import { Container, Sprite, Text } from 'pixi.js';
import { JackpotItemEvent } from '../events/model';
import { JackpotItemModel } from '../models/jackpot-item-model';
import { animateText, lp, makeSprite, makeText } from '../utils';

export class JackpotItemView extends Container {
    private _texara: Sprite;
    private _icon: Sprite;
    private _title: Sprite;
    private _text: Text;

    constructor(private _model: JackpotItemModel) {
        super();

        this._build();

        lego.event.on(JackpotItemEvent.valueUpdate, this._updateText, this);
    }

    public rebuild(): void {
        this.position.copyFrom(this._model.position);
        this.scale.set(lp(1, 1.3))
    }

    private _build(): void {
        this._buildTextarea();
        this._buildIcon();
        this._buildTitle();
        this._buildText();

        this.rebuild();
    }

    private _buildTextarea(): void {
        const textarea = makeSprite(`${this._model.name}_text_area.png`);
        // textarea.scale.set(0.95);
        this.addChild(this._texara = textarea);
    }

    private _buildIcon(): void {
        const icon = makeSprite(`${this._model.name}.png`);
        icon.x -= this._texara.width / 2;
        icon.y = this._texara.height * 0.1;
        this.addChild(this._icon = icon);
    }

    private _buildTitle(): void {
        const title = makeSprite(`${this._model.name}_title.png`);
        title.y = -this._texara.height * 0.7;
        this.addChild(this._title = title);
    }

    private _buildText(): void {
        const text = makeText({ text: this._model.value + " TCL", style: { fill: 0xffffff, fontWeight: '600' } });
        this.addChild(this._text = text);
    }

    private _updateText(endValue: number, startValue: number, uuid: string): void {
        if (uuid != this._model.uuid) return;
        animateText(this._text, startValue, endValue, 1, ' TCL')
    }
}