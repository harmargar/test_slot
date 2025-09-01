export const slotConfig: SlotConfig = {
    reelCount: 3,
    slotCount: 5,
    symbols: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    symbolsWinProcent: [3, 4, 2, 1.5, 1.5, 1.6, 1.8, 1.6, 1.6, 1.9],
    winCombinations: [{
        conbination: [[0, 2], [1, 2], [2, 2]],
        winProcent: 2
    },
    {
        conbination: [[0, 1], [1, 1], [2, 1]],
        winProcent: 1.8
    },
    {
        conbination: [[0, 3], [1, 3], [2, 3]],
        winProcent: 1.8
    },
    {
        conbination: [[0, 1], [1, 2], [2, 1]],
        winProcent: 1.3
    },
    {
        conbination: [[0, 1], [1, 2], [2, 3]],
        winProcent: 1.5
    },
    {
        conbination: [[0, 3], [1, 2], [2, 1]],
        winProcent: 1.5,
    },
    {
        conbination: [[0, 3], [1, 2], [2, 3]],
        winProcent: 1.3
    }

    ],
    winProbability: 80
}