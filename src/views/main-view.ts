
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getMainGridConfig } from '../configs/grid-configs';
import { StorStates } from '../constants/states';
import { GameEvent } from '../events/game';
import { StoreEvent } from '../events/model';
import { delayRunnable } from '../utils';
import { GameView } from './game-view';
import { UIView } from './ui-view';

export class MainView extends PixiGrid {
    private _uiView: UIView;
    private _game: GameView;

    public constructor() {
        super();
        this._build();
        this.name = 'MainView';
        lego.event.on(GameEvent.resize, this.onResize, this);

        lego.event.on(StoreEvent.stateUpdate, this._onStorStateUpdate, this);
    }

    public onResize(): void {
        delayRunnable(0.05, () => {
            this.rebuild(this.getGridConfig());
        });
    }

    public getGridConfig(): ICellConfig {
        return getMainGridConfig();
    }

    private async _build(): Promise<void> {
        this.setChild("main", this._game = new GameView());
        this.setChild("main", this._uiView = new UIView());

    }

    private _onStorStateUpdate(state: StorStates): void {
        switch (state) {
            case StorStates.cta:
                break;

            case StorStates.game:
                break;

            default:
                break;
        }
    }
}
