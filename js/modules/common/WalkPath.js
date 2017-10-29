/**
 * @file WalkPath.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */

define(['lodash', '../enums/Directions'], (_, Directions) => {
    /**
     * @class WalkPath
     * @description logic of entity moving
     */
    class WalkPath {

        /**
         * Create walkpath object
         * @param {Function} [canMove=_.noop]
         */
        constructor(canMove = _.noop) {
            this._canMove = canMove;
        }

        /**
         * Do step by logic
         */
        step() {
            throw new Error('unimplemented method');
        }
    }

    class DefaultWalkPath extends WalkPath {
        step() {

        }
    }

    WalkPath.DEFAULT = DefaultWalkPath;

    return new WalkPath;
});
