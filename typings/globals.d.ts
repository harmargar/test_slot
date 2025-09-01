
declare const __SPINE__: boolean;
declare const __LEGOLOGGER__: boolean;
declare let game: import('../src/game').Game;

declare module 'inline-source-webpack-plugin' {
    import { Plugin } from 'webpack';
    class InlineSourcePlugin extends Plugin {
        constructor(options?: any);
    }
    export = InlineSourcePlugin;
}

interface Window {
    __PIXI_APP__: import('pixi.js').Application;
    game: import('../src/game').Game;
    Game: new () => import('../src/game').Game;
}

interface Document {
    msHidden?: string;
    webkitHidden?: string;
}

interface SlotConfig {
    reelCount: number;
    slotCount: number;
    symbols: number[];
    symbolsWinProcent: number[];
    winCombinations: WinCombinations[];
    winProbability: number;
}

interface WinCombinations {
    conbination: number[][];
    winProcent: number;
}

interface JecpotConfig {
    name: string;
    position: JecpoPositiontConfig;
    value: number;
}

interface JecpoPositiontConfig {
    landscape: import('pixi.js').Point;
    portrait: import('pixi.js').Point;
}

interface PlayerConfig {
    bet: number;
    maxBet: number;
    minBet: number;
    betStep: number;
    balance: number;
}

interface BackEndRsult {
    slots: number[][];
    winSlotsPositions: number[][];
    win: number;
}