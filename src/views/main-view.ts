
import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Container } from 'pixi.js';
import { getMainGridConfig } from '../configs/grid-configs';
import { GameEvent } from '../events/game';
import { StoreEvent } from '../events/model';
import { JackpotModel } from '../models/jackpot-model';
import { delayRunnable } from '../utils';
import { BackgroundView } from './background-view';
import { EffectView } from './effect-view';
import { JackpotView } from './jackpot-view';
import { SlotMachineView } from './slot-machine-view';
import { UIView } from './ui-view';

export class MainView extends PixiGrid {
    private _uiView: UIView;
    private _content: Container;
    private _slotMachine: SlotMachineView
    private _jecpot: JackpotView;

    public constructor() {
        super();
        this._build();
        this.name = 'MainView';

        lego.event.on(GameEvent.resize, this.onResize, this);
        lego.event.on(StoreEvent.slotMachineUpdate, this._onSlotMachineUpdate, this);
        lego.event.on(StoreEvent.jackpotUpdate, this._onJackpotUpdate, this);

    }

    public onResize(): void {
        delayRunnable(0.05, () => {
            !!this._slotMachine && this._slotMachine.rebuild();
            !!this._jecpot && this._jecpot.rebuild()
            this.rebuild(this.getGridConfig());
        });
    }

    public getGridConfig(): ICellConfig {
        return getMainGridConfig();
    }

    private async _build(): Promise<void> {
        this.setChild("bg", new BackgroundView());
        this.setChild('slot', this._content = new Container);
        this.setChild("main", this._uiView = new UIView());
        this.setChild("main", new EffectView());

    }

    private _onSlotMachineUpdate(): void {
        const slotMachine = new SlotMachineView();
        this._content.addChild(this._slotMachine = slotMachine);
        this.rebuild(this.getGridConfig());


        document.body.addEventListener('keydown', (ev: KeyboardEvent) => {
            if (ev.code === 'Space')
                lego.event.emit(GameEvent.documentBodySpaceKeypress);
        });
    }

    private _onJackpotUpdate(jackpotModel: JackpotModel): void {
        if (!!jackpotModel) {
            const jackpot = new JackpotView(jackpotModel);
            jackpot.position.set(-375, -448);
            this._content.addChild(this._jecpot = jackpot);
            this.rebuild(this.getGridConfig());
        }

    }
}
