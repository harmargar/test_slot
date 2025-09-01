import { store } from '../models/store';

export const onSlotMachineWinUpdateComand = (win: number): void => {
    store.player.increaseBalance(win);
};
