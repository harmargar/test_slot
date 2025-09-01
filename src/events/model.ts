export enum ObservableModelEvent {
    uuidUpdate = 'ObservableModelUuidUpdate',
}


export enum StoreEvent {
    uuidUpdate = "StoreUuidUpdate",
    gameUpdate = "StoreGameUpdate",
    slotMachineUpdate = "StoreSlotMachineUpdate",
    jackpotUpdate = "StoreJackpotUpdate",
    stateUpdate = "StoreStateUpdate",
}

export enum PlayerModelEvent {
    betUpdate = "PlayerModelBetUpdate",
    balanceUpdate = "PlayerModelBalanceUpdate",
}

export enum SlotMachineEvent {
    reelsUpdate = "SlotMachineModelReelsUpdate",
    stateUpdate = "SlotMachineModelStateUpdate",
    winUpdate = "SlotMachineModelWinUpdate",
}


export enum SlotEvent {
    stateUpdate = "SlotModelStateUpdate",
}

export enum JackpotItemEvent {
    valueUpdate = "JackpotItemModelValueUpdate",
}

export enum SoundModelEvent {
    stateUpdate = "SoundModelStateUpdate"
}