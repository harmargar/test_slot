import { ICellConfig } from '@armathai/pixi-grid';
import { Container } from 'pixi.js';
import { getBackgroundGridConfig } from '../configs/grid-configs';
import { makeSprite } from '../utils';

export class BackgroundView extends Container {
    // private _bg: Sprite;

    public constructor() {
        super();
        this.name = 'BackgroundView';
        this._createBg();
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    private _createBg(): void {
        const bg = makeSprite('bg');
        this.addChild(bg);
    }
}
