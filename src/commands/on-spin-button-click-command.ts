import { store } from '../models/store';

export const onSpinButtonClickCommand = (): void => {
    store.slotMachine.spin();
    store.player.decreaseBalance(store.player.bet);
};
