import { getPlayer } from '../back_end/get-player';
import { jecpotConfig } from '../configs/jecpot-config';
import { SoundState, StorStates } from '../constants/states';
import { postRunnable } from '../utils';
import { JackpotModel } from './jackpot-model';
import { ObservableModel } from './observable-model';
import { PlayerModel } from './player-model';
import { SlotMachineModel } from './slot-machine-model';
import { SoundModel } from './sound-model';

class Store extends ObservableModel {
    private _player: PlayerModel;
    private _slotMachine: SlotMachineModel;
    private _jackpot: JackpotModel;
    private _sound: SoundModel;
    private _state: StorStates

    public constructor() {
        super('Store');
        this.makeObservable("_game", "_state", "_slotMachine", "_jackpot");

        this._state = StorStates.idel;
    }

    public get state(): StorStates {
        return this._state;
    }

    public set state(value: StorStates) {
        this._state = value;
    }

    public get player(): PlayerModel {
        return this._player;
    }

    public set player(value) {
        this._player = value;
    }

    public get slotMachine(): SlotMachineModel {
        return this._slotMachine;
    }

    public set slotMachine(value) {
        this._slotMachine = value;
    }

    public get sound(): SoundModel {
        return this._sound;
    }

    public set sound(value: SoundModel) {
        this._sound = value;
    }

    // GAME
    public initializePlayerModel(): void {
        this._player = new PlayerModel();
        postRunnable(() => {
            this._player.initialize(getPlayer());
        });
    }

    public destroyPlayerModel(): void {
        this._player.destroy();
        this._player = null;
    }


    public destroySlotMachineModel(): void {
        this._slotMachine.destroy();
        this._slotMachine = null;
    }

    public initializeSlotMachineModel(): void {
        this._slotMachine = new SlotMachineModel();
        postRunnable(() => {
            this._slotMachine.initialize();
        });
    }


    public destroyJackpotModel(): void {
        this._jackpot.destroy();
        this._jackpot = null;
    }

    public initializeJackpotModel(): void {
        this._jackpot = new JackpotModel(jecpotConfig);
    }


    public initializeSoundModel(): void {
        this._sound = new SoundModel();
        postRunnable(() => {
            this._sound.initialize(SoundState.on);
        });
    }

    public destroySoundModel(): void {
        this._sound?.destroy();
        this._sound = null;
    }
}

export const store = new Store();
