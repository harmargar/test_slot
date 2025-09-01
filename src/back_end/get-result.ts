import { slotConfig } from '../configs/slot-config';

export function getResult(bet: number): BackEndRsult {
    const win = Math.random() * 100;

    if (win > slotConfig.winProbability) {
        return getNoWinResult();
    } else {
        return getWinResult(bet);
    }

}

function getNoWinResult(withoutSymbol: number = -1): BackEndRsult {
    const { symbols, reelCount: rillCount, slotCount } = slotConfig;
    const newSymblsArr = [...symbols].sort(() => Math.random() - 0.5).filter(item => item !== withoutSymbol);
    let counter: number = 0;
    const slots: number[][] = [];
    for (let i = 0; i < rillCount; i++) {
        for (let j = 0; j < slotCount; j++) {
            if (!slots[i]) {
                slots[i] = [];
            }
            counter++;
            slots[i][j] = newSymblsArr[counter % newSymblsArr.length];
        }
    }
    slots.forEach(val => val.sort(() => Math.random() - 0.5));

    return { slots, winSlotsPositions: [], win: 0 };
}

function getWinResult(bet: number): BackEndRsult {
    const { symbols, winCombinations, symbolsWinProcent } = slotConfig;
    const winSymbolIndex = Math.floor(Math.random() * 9)
    const symbolWinProcent = symbolsWinProcent[winSymbolIndex];
    const winSymbol = symbols[winSymbolIndex];
    const result = getNoWinResult(winSymbol);
    const { conbination, winProcent } = winCombinations[Math.floor(Math.random() * winCombinations.length)];

    conbination.forEach(([i, j]) => {
        result.slots[i][j] = winSymbol;
    })
    result.winSlotsPositions = conbination;
    result.win = bet * symbolWinProcent * winProcent;
    return result;
}