import { lego } from '@armathai/lego';
import { sound } from '@pixi/sound';
import { utils } from 'pixi.js';
import { SoundState } from '../constants/states';
import { GameEvent } from '../events/game';
import { SoundModelEvent } from '../events/model';
import { postRunnable } from '../utils';

export class SoundObservant {
    public constructor() {
        this._init();
    }

    private _init(): void {
        lego.event.on(GameEvent.pause, this._pause, this).on(GameEvent.resume, this._resume, this);
        lego.event.on(SoundModelEvent.stateUpdate, this._onStateUpdate, this);
        postRunnable(() => {
            if (game.interaction) {
                this._playLoop();
            } else {
                lego.event.once(GameEvent.firstInteraction, this._playLoop, this);
            }
        });
    }

    private _onStateUpdate(state: SoundState): void {
        switch (state) {
            case SoundState.on:
                this._unmute();
                break;
            case SoundState.off:
                this._mute();
                break

            default:
                this._unmute();
                break;
        }
    }

    private _playLoop(): void {
        this._play('bgm_groovy', 0.5, true);
    }

    private _onSoundMuteUpdate(mute: boolean): void {
        mute ? this._mute() : this._unmute();
    }

    private _unmute(): void {
        sound.unmuteAll();
    }

    private _mute(): void {
        sound.muteAll();
    }

    private _pause(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.pauseAll();
    }

    private _resume(): void {
        (!utils.isMobile.apple.device || sound.useLegacy) && sound.resumeAll();
    }

    private _play(
        sprite: string,
        volume: number = 1,
        loop: boolean = false
    ): import('@pixi/sound').IMediaInstance | Promise<import('@pixi/sound').IMediaInstance> {
        return sound.play('spritemap', { sprite, volume, loop });
    }
}
