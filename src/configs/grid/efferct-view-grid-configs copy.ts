import { CellScale, ICellConfig } from '@armathai/pixi-grid';

export const getEffectViewGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'effect',
        cells: [
            {
                scale: CellScale.fill,
                name: 'blocker',
                bounds: { x: 0, width: 1, y: 0, height: 1 },
            },
            {
                name: 'big_win',
                bounds: { x: 0, width: 1, y: 0, height: 0.8 },
            },
        ],
    };
};

export const getEffectViewGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'effect',
        cells: [
            {
                scale: CellScale.fill,
                name: 'blocker',
                bounds: { x: 0, width: 1, y: 0, height: 1 },
            },
            {
                name: 'big_win',
                bounds: { x: 0, width: 1, y: 0, height: 1 },
            },
        ],
    };
};
