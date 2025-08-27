import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameGridConfig } from '../configs/grid-configs';

export class GameView extends PixiGrid {
    public constructor() {
        super();
        this.name = 'GameView';

        // lego.event.on(StoreEvent.gameUpdate, this._onGameUpdate, this);

    }

    public getGridConfig(): ICellConfig {
        return getGameGridConfig();
    }

    public rebuild(config?: ICellConfig): void {
        super.rebuild(config);
    }
}
