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
        DEFAULT_DISARM_TIMEOUT
    };
});
