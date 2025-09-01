import { ICellConfig } from '@armathai/pixi-grid';
import { lp } from '../utils';
import { getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig } from './grid/background-grid-configs';
import { getButtonsGridLandscapeConfig, getButtonsGridPortraitConfig } from './grid/buttons-grid-configs';
import { getEffectViewGridLandscapeConfig, getEffectViewGridPortraitConfig } from './grid/efferct-view-grid-configs copy';
import { getMainGridLandscapeConfig, getMainGridPortraitConfig } from './grid/main-grid-configs';
import { getUIGridLandscapeConfig, getUIGridPortraitConfig } from './grid/ui-grid-configs';

export const getMainGridConfig = (): ICellConfig => {
    return lp(getMainGridLandscapeConfig, getMainGridPortraitConfig).call(null);
};

export const getBackgroundGridConfig = (): ICellConfig => {
    return lp(getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig).call(null);
};

export const getUIGridConfig = (): ICellConfig => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

export const getEffectViewGridConfig = (): ICellConfig => {
    return lp(getEffectViewGridLandscapeConfig, getEffectViewGridPortraitConfig).call(null);
};

export const getButtonsGridConfig = (): ICellConfig => {
    return lp(getButtonsGridLandscapeConfig, getButtonsGridPortraitConfig).call(null);
};