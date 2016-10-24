/*
 * A module that contains the default constants for the applications.
 */
const excluded = ['t', 'n'],
    hp = 63,
    hpOptions = [21, 42, 63, 127, 253,380, 503],
    limit = 67,
    limitOptions = [25, 37, 50, 67, 75, 100],
    start = '2015-10-13',
    jump = 1,
    jumpOptions = [1, 10, 11, 21,42, 63, 127,253],
    gap = 22,
    gapOptions = [22, 43, 63, 127, 253],
    spread = 0,
    spreadOptions = [0, 1 / 8, 1 / 4, 1 / 2, 3 / 4, 1],
    defaultSelection = 'm3';

export {
    excluded,
    hp,
    hpOptions,
    limit,
    limitOptions,
    start,
    jump,
    jumpOptions,
    gap,
    gapOptions,
    spread,
    spreadOptions,
    defaultSelection
};