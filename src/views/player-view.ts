import { lego } from '@armathai/lego';
import { ICellConfig } from '@armathai/pixi-grid';
import { Container, Text } from 'pixi.js';
import { getUIGridConfig } from '../configs/grid-configs';
import { PlayerModelEvent } from '../events/model';
import { animateText, makeText } from '../utils';

export class PlayerView extends Container {
    private _bet: Text
    private _balance: Text

    public constructor() {
        super();
        this.name = 'PlayerView';
        this._init();

        lego.event.on(PlayerModelEvent.betUpdate, this._onBetUpdate, this);
        lego.event.on(PlayerModelEvent.balanceUpdate, this._onBalanceUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    private _init(): void {
        this._buildBet();
        this._buildBalance();


    }

    private _buildBet(): void {
        const continer = new Container();
        const betTitle = makeText({
            text: "BET",
            style: {
                fill: 0xffb95a,
                fontWeight: '900',
                stroke: 0x846038,
                strokeThickness: 2,
                fontSize: 18,
                letterSpacing: 0.8
            }
        })
        betTitle.anchor.set(0, 0.5);
        continer.addChild(betTitle);

        this._bet = makeText({
            text: '0', style: {
                fill: 0xffffff,
                fontWeight: '900',
                fontSize: 20,
                letterSpacing: 1
            }
        })
        this._bet.anchor.set(0, 0.5);
        this._bet.x = 113;
        continer.addChild(this._bet);
        continer.y = 23;
        this.addChild(continer);
    }

    private _buildBalance(): void {
        const continer = new Container();
        const balanceTitle = makeText({
            text: "BALANCE", style: {
                fill: 0xffb95a,
                fontWeight: '900',
                stroke: 0x846038,
                strokeThickness: 2,
                fontSize: 18,
                letterSpacing: 0.8
            }
        })
        balanceTitle.anchor.set(0, 0.5)
        continer.addChild(balanceTitle);

        this._balance = makeText({
            text: 0 + ' TCL', style: {
                fill: 0xffffff,
                fontWeight: '900',
                fontSize: 20,
                letterSpacing: 1
            }
        })
        this._balance.anchor.set(0, 0.5);
        this._balance.x = 113;
        continer.addChild(this._balance);

        this.addChild(continer);
    }

    private _onBetUpdate(bet: number): void {
        this._bet.text = bet;
    }

    private _onBalanceUpdate(balance: number, preBalanc: number): void {
        animateText(this._balance, preBalanc, balance, 0.5, ' TSL')
    }
}
