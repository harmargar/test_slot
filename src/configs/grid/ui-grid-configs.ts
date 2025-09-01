import { CellAlign, CellScale, ICellConfig } from '@armathai/pixi-grid';

export const getUIGridLandscapeConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'ui',
        cells: [
            {
                name: 'buttons',
                bounds: { x: 0, width: 1, y: 0, height: 1 },
            },
            {
                align: CellAlign.leftCenter,
                name: 'player',
                bounds: { x: 0.135, width: 0.25, y: 0.85, height: 0.17 },
            },
            {
                name: 'win',
                bounds: { x: 0.39, width: 0.21, y: 0.83, height: 0.15 },
            },
            {
                name: 'shadow',
                bounds: { x: -0.1, width: 0, y: 0, height: 0 },
            },
            {
                // debug: { color: 0x000000 },
                name: 'futter',
                bounds: { x: 0, width: 1, y: 0.83, height: 0.17 },
                scale: CellScale.fill,
            },
            {
                name: 'sound',
                bounds: { x: 0.08, width: 0.05, y: 0.19, height: 0.06 },
            }
        ],
    };
};

export const getUIGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'ui',
        // debug: { color: 0x000000 },

        cells: [
            {
                name: 'buttons',
                bounds: { x: 0, width: 1, y: 0, height: 1 },
            },
            {
                align: CellAlign.leftCenter,
                name: 'player',
                bounds: { x: 0.125, width: 0.5, y: 0.925, height: 0.054 },
            },
            {
                name: 'win',
                bounds: { x: 0, width: 1, y: 0.65, height: 0.09 },
                // padding: { x: 0.08, width: 0.92, y: 0.05 }
            },
            {
                name: 'shadow',
                scale: CellScale.fill,
                bounds: { x: 0, width: 1, y: 0.65, height: 0.09 },
            },
            {
                name: 'futter',
                bounds: { x: 0, width: 1, y: 0.925, height: 0.076 },
                scale: CellScale.fill,
            },
            {
                // align: CellAlign.leftCenter,
                name: 'sound',
                bounds: { x: 0.8, width: 0.18, y: 0.925, height: 0.054 },
            }
        ],
    };
};
