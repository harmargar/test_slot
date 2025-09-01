import { store } from '../models/store';

export function onStopActionCompiteComand(): void {
    store.slotMachine.checkWin();
}