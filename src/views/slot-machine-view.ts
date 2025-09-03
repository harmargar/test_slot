import { lego } from '@armathai/lego';
import { Container, Graphics, Point, Sprite } from 'pixi.js';
import { SlotMachineState } from '../constants/states';
import { SlotMachineEvent } from '../events/model';
import { SlotMachineViewEvent } from '../events/view';
import { ReelModel } from '../models/reel-model';
import { delayRunnable, lp, makeSprite } from '../utils';
import { RillView } from './reel-view';
import { SlotMachineEffectsView } from './slot-machine-effect-view';
const logoData = {
    landscape: {
        position: new Point(752, -384),
        scale: 0.68
    },
    portrait: {
        position: new Point(0, -478),
        scale: 1
    }
}

export class SlotMachineView extends Container {
    private _reelsContiner: Container;
    private _reels: RillView[] = [];
    private _logo: Sprite;
    private _logoBg: Sprite;

    constructor() {
        super();

        this._build();
        lego.event.on(SlotMachineEvent.reelsUpdate, this._onRillsUpdate, this);
        lego.event.on(SlotMachineEvent.stateUpdate, this._onStateUpdate, this);

    }

    public rebuild(): void {
        if (!!this._logo) this._updateLegoPosition();
        lp(
            this._landscape,
            this._portrait
        ).call(this);
    }

    public spin(): void {
        this._reels.forEach(reel => {
            reel.spin();
        })
    }

    public async stop(): Promise<void> {
        const promises: Promise<void>[] = []
        this._reels.forEach(async (reel, index) => {
            delayRunnable(index, () => {
                promises.push(reel.stop());
            })
        })
        delayRunnable(this._reels.length - 1, () => {
            Promise.all(promises).then(() => {
                lego.event.emit(SlotMachineViewEvent.stopActionCompite);
            })
        })
    }

    public async stopForce(): Promise<void> {
        this._reels.forEach(async (reel) => {
            // delayRunnable(index, () => {
            reel.stopForce();
            // })
        })

        lego.event.emit(SlotMachineViewEvent.stopActionCompite);

    }

    private _landscape(): void {
        !!this._logoBg && (this._logoBg.visible = true);


    }

    private _portrait(): void {
        !!this._logoBg && (this._logoBg.visible = false);
    }

    private _updateLegoPosition(): void {
        const { position, scale } = lp(logoData.landscape, logoData.portrait);
        this._logo.position.copyFrom(position);
        this._logo.scale.set(scale);
    }

    private _onStateUpdate(state: SlotMachineState): void {
        switch (state) {
            case SlotMachineState.idel:

                break;
            case SlotMachineState.spin:
                this.spin();
                break;
            case SlotMachineState.stop:
                this.stop();
                break;
            case SlotMachineState.stopForce:
                this.stopForce();
                break;

            default:
                break;
        }
    }

    private _build(): void {
        const logoBg = makeSprite('logo_bg.png');
        logoBg.position.set(700, -370)
        this.addChild(this._logoBg = logoBg);

        const slotMachine = makeSprite('slot_machine.png');
        this.addChild(slotMachine);

        const drum = makeSprite('drum.png');
        drum.y = 10;
        this.addChild(drum);

        const grap = new Graphics();
        grap.y = 10;
        grap.beginFill(0xff0000, 0.5);
        grap.drawRect(-drum.width / 2, -drum.height / 2, drum.width, drum.height);
        grap.endFill();

        this.addChild(grap);


        this._reelsContiner = new Container();
        this.addChild(this._reelsContiner);
        this._reelsContiner.mask = grap;

        this._buildLogo();
        this._buildLights();

        this.rebuild();
    }

    private _onRillsUpdate(rills: ReelModel[]): void {
        if (!rills) return;
        rills.forEach((rillModel, index) => {
            const rill = new RillView(rillModel);
            rill.x = (300 + 50) * index / 0.9;
            this._reelsContiner.addChild(rill);
            this._reels.push(rill);
        })

        this._reelsContiner.scale.set(0.9);
        this._reelsContiner.position.set(-350, -280 * 2 * 0.9);
    }

    private _buildLogo(): void {
        const logo = makeSprite('logo.png');
        this.addChild(this._logo = logo);
        this._updateLegoPosition();

    }

    private _buildLights(): void {
        this.addChild(new SlotMachineEffectsView);
    }
}