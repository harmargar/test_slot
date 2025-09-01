import { lego } from '@armathai/lego';
import { GameEvent } from '../events/game';
import { SlotMachineEvent } from '../events/model';
import { ButtonsClick, SlotMachineViewEvent, SoundViewEvent } from '../events/view';
import { onDecreaseButtonClickCommand } from './on-bet-decrease-button-click-command';
import { onIncreaseButtonClickCommand } from './on-bet-increase-button-click-command';
import { onGameResizeCommand } from './on-game-resize-command';
import { onSlotMachineWinUpdateComand } from './on-slot-machine-win-update-command';
import { onSoundClickCommand } from './on-sound-click-command';
import { onSpinButtonClickCommand } from './on-spin-button-click-command';
import { onStopActionCompiteComand } from './on-stop-action-compite-comand';
import { onStopButtonClickCommand } from './on-stop-button-click-command';

export const mapGameCommandsCommand = (): void => {
    lego.command
        .on(GameEvent.resize, onGameResizeCommand)
        .on(ButtonsClick.spinButtonClick, onSpinButtonClickCommand)
        .on(ButtonsClick.stopButtonClick, onStopButtonClickCommand)
        .on(ButtonsClick.betDecreaseButtonClick, onDecreaseButtonClickCommand)
        .on(ButtonsClick.betIncreaseButtonClick, onIncreaseButtonClickCommand)
        .on(SlotMachineViewEvent.stopActionCompite, onStopActionCompiteComand)
        .on(SlotMachineEvent.winUpdate, onSlotMachineWinUpdateComand)
        .on(SoundViewEvent.onClick, onSoundClickCommand);
};
