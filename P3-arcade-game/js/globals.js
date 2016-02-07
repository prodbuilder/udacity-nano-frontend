var DEBUG = true;

var STEP_WIDTH = 101,
    STEP_HEIGHT = 83,
    MAX_WIDTH = 505,
    MAX_HEIGHT = 606,
    MAX_COL = 5,
    MAX_ROW = 3,
    PLAYER_HEIGHT = 171;

var MAX_DURATION = DEBUG ? 30 : 10,
    MAX_LIFE = 2,
    SCORE_WIN = 1000,
    SCORE_TIME = 10, // each second remain wins 10 points
    SPEEDUP_RATIO = 1.1;

var GEM_VALUES = {
    'Orange': 100,
    'Green': 50,
    'Blue': 20,
};

var SPRITE_STAR = 'images/Star.png',
    SPRITE_SELECTOR = 'images/Selector.png';

var COLOR_ORANGE = '#E5812B',
    COLOR_GREEN = '#219348',
    COLOR_BLUE = '#2245E3',
    COLOR_RED = '#FF0040',
    COLOR_GRAY = '#626262',
    COLOR_OFFWHITE = '#f5f5f5';

var RESOURCE_IMAGES = [
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',

    'images/enemy-bug.png',

    'images/Rock.png',

    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png',

    'images/Star.png',
    'images/Selector.png',

    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
];
