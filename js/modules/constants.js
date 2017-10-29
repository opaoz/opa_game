/**
 * @file constants.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */

define(() => {
    const MAX_HEALTH = 100;
    const MAX_SPEED = 11;
    const MAX_DAMAGE = 32;

    const MAX_HEALTH_DIFF = 10;
    const MAX_DAMAGE_DIFF = 7;
    const MAX_SPEED_DIFF = 3;
    const MAX_MAXHEALTH_DIFF = 10;

    const MAX_DISARM_TIMEOUT = 20;
    const DEFAULT_DISARM_TIMEOUT = 7;

    const DEFAULT_SIZE = 16;

    const MIN_SCREEN_WIDTH = 600;
    const MIN_SCREEN_HEIGHT = 800;

    const PIXELS_IN_STEP = 1;

    return {
        MAX_HEALTH,
        MAX_SPEED,
        MAX_DAMAGE,
        MAX_HEALTH_DIFF,
        MAX_DAMAGE_DIFF,
        MAX_SPEED_DIFF,
        MAX_MAXHEALTH_DIFF,
        DEFAULT_SIZE,
        MAX_DISARM_TIMEOUT,
        DEFAULT_DISARM_TIMEOUT,
        MIN_SCREEN_WIDTH,
        MIN_SCREEN_HEIGHT,
        PIXELS_IN_STEP
    };
});
