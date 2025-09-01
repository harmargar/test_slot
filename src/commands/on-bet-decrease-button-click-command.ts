import { store } from '../models/store';

export const onDecreaseButtonClickCommand = (): void => {
    store.player.decreaseBet();
};
