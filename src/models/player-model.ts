import { ObservableModel } from './observable-model';

export class PlayerModel extends ObservableModel {
    private _balance: number;
    private _bet: number;
    private _maxBet: number;
    private _minBet: number;
    private _betStep: number;

    constructor() {
        super("PlayerModel");

        this.makeObservable('_balance', '_bet');
    }

    public get balance(): number {
        return this._balance;
    }

    public set balance(value: number) {
        this._balance = value;
    }

    public get bet(): number {
        return this._bet;
    }

    public set bet(value: number) {
        this._bet = value;
    }

    public increaseBet(): void {
        this.bet + this._betStep > this._maxBet ? this._bet = this._maxBet : this._bet += this._betStep;
    }

    public decreaseBet(): void {
        this.bet - this._betStep < this._minBet ? this._bet = this._minBet : this._bet -= this._betStep;
    }

    public increaseBalance(value: number): void {
        this.balance += value;
    }

    public decreaseBalance(value: number): void {
        this.balance -= value;
    }

    public destroy(): void {
        super.destroy()
    }

    public initialize(playerConfig: PlayerConfig): void {
        const { bet, balance, maxBet, minBet, betStep } = playerConfig;

        this.bet = bet;
        this.balance = balance;
        this._maxBet = maxBet;
        this._minBet = minBet;
        this._betStep = betStep
    }
}