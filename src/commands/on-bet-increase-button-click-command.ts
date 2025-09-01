import { store } from '../models/store';

export const onIncreaseButtonClickCommand = (): void => {
    store.player.increaseBet();
};
