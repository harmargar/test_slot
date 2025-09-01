import { lego } from '@armathai/lego';
import { initializeJackpotModelCommand } from './initialize-jackpot-model-command';
import { initializePlayerModelCommand } from './initialize-player-model-command';
import { initializeSlotMachineModelCommand } from './initialize-slot-machine-model-command';
import { initializeSoundModelCommand } from './initialize-sound-model-command';

export const initializeModelsCommand = (): void => {
    lego.command
        .execute(initializePlayerModelCommand)
        .execute(initializeSlotMachineModelCommand)
        .execute(initializeJackpotModelCommand)
        .execute(initializeSoundModelCommand);
};
