import { lego } from '@armathai/lego';
import { isSlotMachineSpinStateGuard } from '../guards/isSlotMachinStateGuard';
import { onSpinButtonClickCommand } from './on-spin-button-click-command';
import { onStopButtonClickCommand } from './on-stop-button-click-command';

export const onSpaceKeypressComand = (): void => {
    if (!isSlotMachineSpinStateGuard()) {
        lego.command.execute(onSpinButtonClickCommand)
    } else {
        lego.command.execute(onStopButtonClickCommand);
    }
};
