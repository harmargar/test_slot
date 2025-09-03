import { lego } from '@armathai/lego';
import gsap from 'gsap';
import { Container } from 'pixi.js';
import { SlotMachineEvent } from '../events/model';
import { makeSprite } from '../utils';

type LightsConfig = { x: number, y: number }[][];


const lightConfig: LightsConfig = [
    [{ x: -569, y: - 242 }, { x: 570, y: - 242 }],
    [{ x: -581, y: - 120 }, { x: 582, y: - 120 }],
    [{ x: -582, y: 3 }, { x: 583, y: 3 }],
    [{ x: -581, y: 126 }, { x: 582, y: 126 }],
    [{ x: -569, y: 247 }, { x: 570, y: 247 }],
]

const hederLineConfig: LightsConfig = [
    [{ x: -391, y: - 398 }, { x: 390, y: - 398 }],
    [{ x: -262, y: - 398 }, { x: 261, y: - 398 }],
    [{ x: -64, y: -398 }, { x: 63, y: -398 }],
]

export class SlotMachineEffectsView extends Container {
    private _lights: Container[] = [];
    private _headerLights: Container[] = [];


    constructor() {
        super();
        this._build();
        lego.event.on(SlotMachineEvent.winUpdate, this._onWinUpdate, this)
    }

    private _onWinUpdate(win: number): void {
        if (win > 0) {
            this._winAction(this._lights);
            this._winAction(this._headerLights);
        } else {
            this._idleAction(this._lights);
            this._idleAction(this._headerLights);
        }
    }

    private _build(): void {
        this._lights = this._buildLights(lightConfig, 'slot_machine_light.png');
        this._headerLights = this._buildLights(hederLineConfig, 'slot_machin_header_lite.png');

        this._idleAction(this._lights);
        this._idleAction(this._headerLights);
    }

    private _buildLights(config: LightsConfig, texture: string): Container[] {
        const continers: Container[] = []
        config.forEach(lightGrup => {
            const continer = new Container();
            continer.alpha = 0;
            this.addChild(continer);
            continers.push(continer);
            lightGrup.forEach(light => {
                const { x, y } = light;
                continer.addChild(makeSprite({ texture, x, y }));
            })
        })

        return continers
    }

    private _idleAction(items: Container[]): void {
        items.forEach((light, index) => {
            gsap.killTweensOf(light);
            gsap.to(light, { alpha: 0, duration: 0.5, ease: "sine.inOut" });
            gsap.to(light, { alpha: 1, duration: 1, delay: index % 2 + 0.5, yoyo: true, repeat: -1, ease: 'none' });
        })
    }

    private _winAction(items: Container[]): void {
        items.forEach((light, index) => {
            gsap.killTweensOf(light);
            gsap.to(light, { alpha: 0, duration: 0.5, ease: "sine.inOut" });
            gsap.to(light, { alpha: 1, duration: 0.8, repeat: -1, delay: 0.5, yoyo: true, ease: "sine.inOut" });
        })
    }
}