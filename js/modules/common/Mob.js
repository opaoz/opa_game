/**
 * @file Mob.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */

define(['lodash', './AliveEntity'], (_, AliveEntity) => {
    class Mob extends AliveEntity {

        /**
         * Create mob
         * @param {Object} gameObject
         * @param {Object} entity
         * @param {Image[]} imageSet
         * @param {Function} [onKill=_.noop] on kill callback
         * @param {WalkPath} [walkPath=WalkPath.DEFAULT]
         */
        constructor(gameObject, entity, imageSet, onKill, walkPath = WalkPath.DEFAULT) {
            super(...arguments);
            this._walkPath = new walkPath(this.canMove);
        }
    }

    return Mob;
});
