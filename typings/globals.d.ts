


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
    game: import('../src/game').Game;
    Game: new () => import('../src/game').Game;
}

interface Document {
    msHidden?: string;
    webkitHidden?: string;
}

interface GameConfig { }