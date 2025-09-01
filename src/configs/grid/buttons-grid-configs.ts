import { ICellConfig } from '@armathai/pixi-grid';

export const getButtonsGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'btns',
        cells: [
            {
                name: 'spin',
                bounds: { x: 0.73, width: 0.13, y: 0.795, height: 0.19 },
            },
            {
                name: 'stop',
                bounds: { x: 0.855, width: 0.06, y: 0.75, height: 0.11 },
            },
            {
                name: 'betIncrease',
                bounds: { x: 0.855, width: 0.045, y: 0.895, height: 0.08 },
            },
            {
                // debug: { color: 0x000000 },
                name: 'betDecrease',
                bounds: { x: 0.69, width: 0.045, y: 0.895, height: 0.08 },
            },
        ],
    };
};

export const getButtonsGridPortraitConfig = (): ICellConfig => {
    return {
        // debug: { color: 0x000000 },
        name: 'btns',
        cells: [
            {
                name: 'spin',
                bounds: { x: 0.39, width: 0.22, y: 0.75, height: 0.15 },
            },
            {
                name: 'stop',
                bounds: { x: 0.71, width: 0.12, y: 0.75, height: 0.08 },
            },
            {
                name: 'betIncrease',
                // debug: { color: 0x000000 },
                bounds: { x: 0.626, width: 0.1, y: 0.83, height: 0.069 },
            },
            {
                name: 'betDecrease',
                bounds: { x: 0.27, width: 0.1, y: 0.83, height: 0.069 },
            },
        ],
    };
};
