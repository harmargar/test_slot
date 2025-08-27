import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getUIGridConfig } from '../configs/grid-configs';
import { LogoView } from './logo-view';
import { SoundView } from './sound-view';

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
        const logo = new LogoView();
        const sound = new SoundView();

        this.setChild("logo", logo);
        this.setChild('sound', sound);
    }
}
