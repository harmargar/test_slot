import { store } from '../models/store';

export const onStopButtonClickCommand = (): void => {
    store.slotMachine.stop(true);
};
