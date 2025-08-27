import { ObservableModel } from './observable-model';

export class GameModel extends ObservableModel {

    constructor(private _config: GameConfig) {
        super("GameModel");

        this.makeObservable('_cells', '_margeCount');
    }

    public destroy(): void {
        super.destroy()
    }

    public initialize(): void {

        // this.cells[0].itemIndex = 32;
        // this.cells[1].itemIndex = 34;
    }
}