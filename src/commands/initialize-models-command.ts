import { lego } from '@armathai/lego';
import { initializeGameModelCommand } from './initialize-game-model-command';
import { initializeSoundModelCommand } from './initialize-sound-model-command';

export const initializeModelsCommand = (): void => {
    lego.command.execute(initializeGameModelCommand)
        .execute(initializeSoundModelCommand);
};
