export enum StorStates {
    idel = "StorIdleState",
    game = "StorGameState",
    cta = "StorCtaState"
}

export enum SlotMachineState {
    idel = "SlotMachineIdleState",
    spin = "SlotMachineSpinState",
    stop = "SlotMachineStopState",
    stopForce = "SlotMachineStopForceState",
    win = "SlotMachineWinState"
}


export enum SlotState {
    idel = "SlotIdleState",
    win = "SlotWinState"
}

export enum ReelState {
    idel = "RellIdleState",
    spin = "RellSpinState"
}

export enum SoundState {
    idle = "SoundIdelState",
    on = "SoundOnState",
    off = "SoundOffState"
}