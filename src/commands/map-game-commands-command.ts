import { lego } from '@armathai/lego';
import { GameEvent } from '../events/game';
import { SoundViewEvent } from '../events/view';
import { onGameResizeCommand } from './on-game-resize-command';
import { onSoundClickCommand } from './on-sound-click-command';

export const mapGameCommandsCommand = (): void => {
    lego.command
        .on(GameEvent.resize, onGameResizeCommand)
        .on(SoundViewEvent.onClick, onSoundClickCommand);
};
