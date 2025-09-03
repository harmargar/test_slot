import { SlotMachineState } from '../constants/states';
import { store } from '../models/store';

export function isSlotMachineSpinStateGuard(): boolean {
    return store.slotMachine.state === SlotMachineState.spin;
}