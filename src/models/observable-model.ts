import { lego } from '@armathai/lego';

const getUUID = (() => {
    let num = 0;
    return (prefix = '') => {
        num += 1;
        const value = num < 10 ? `0${num}` : num;
        return `${prefix}${value.toString()}`;
    };
})();

export class ObservableModel {

    private __name__: string;
    private _uuid: string;

    public constructor(name: string) {
        this.__name__ = name;
        this._uuid = getUUID(this.__name__);
    }

    public get uuid(): string {
        return this._uuid;
    }

    public makeObservable(...properties: string[]): void {
        lego.observe.makeObservable(this, ...properties);
    }

    public createObservable(property: string, value: unknown): void {
        lego.observe.createObservable(this, property, value);
    }

    public removeObservable(...properties: string[]): void {
        lego.observe.removeObservable(this, ...properties);
    }

    public initialize(...args: unknown[]): void {
        void args;
    }

    public destroy(): void {
        void 0;
    }
}
