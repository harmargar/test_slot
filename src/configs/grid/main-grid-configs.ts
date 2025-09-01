
import { CellScale, ICellConfig, IRawBounds } from '@armathai/pixi-grid';


function getCanvasBounds(): IRawBounds {
    return { x: 0, y: 0, width: window.game.renderer.width, height: window.game.renderer.height };
}

export const getMainGridLandscapeConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getCanvasBounds(),
        cells: [
            {
                name: 'bg',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.envelop,
            },
            {
                name: 'slot',
                bounds: { x: 0.139, y: 0.01, width: 0.85, height: 0.90 },
            },
            {
                name: 'effect',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                // scale: CellScale.fill
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill
            },
        ],
    };
};

export const getMainGridPortraitConfig = (): ICellConfig => {
    return {
        name: 'main',
        // debug: { color: 0xd95027 },
        bounds: getCanvasBounds(),
        cells: [
            {
                name: 'bg',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.envelop,
            },
            {
                // debug: { color: 0xd95027 },
                name: 'slot',
                bounds: { x: 0.01, y: 0.02, width: 0.98, height: 0.63 },
            },
            {
                name: 'effect',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                // scale: CellScale.fill
            },
            {
                name: 'blocker',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
                scale: CellScale.fill
            },
        ],
    };
};
