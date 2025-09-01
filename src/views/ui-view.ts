import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite, Texture } from 'pixi.js';
import { getUIGridConfig } from '../configs/grid-configs';
import { makeSprite } from '../utils';
import { ButtonsView } from './buttons-view';
import { PlayerView } from './player-view';
import { SoundView } from './sound-view';
import { WinView } from './win-view';

export class UIView extends PixiGrid {
    public constructor() {
        super();
        this.name = 'UIView';
        this._init();

    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    private _init(): void {
        const sound = new SoundView();
        this.setChild('sound', sound);

        const futterGradient = makeSprite('futter_gradient.png');
        this.setChild('futter', futterGradient);

        const buttons = new ButtonsView();
        this.setChild('buttons', buttons);

        const player = new PlayerView();
        this.setChild('player', player);

        const winShadoe = new Sprite(Texture.WHITE);
        winShadoe.tint = 0x000000;
        winShadoe.alpha = 0.5
        this.setChild('shadow', winShadoe);

        const win = new WinView();
        this.setChild('win', win);



    }
}
