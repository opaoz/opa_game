/**
 * @file Bonus.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */

define(['lodash', './GameObject', '../constants'], (_, GameObject, Constants) => {
    /**
     * @class Bonus
     * @description bonus implementation with pickuping
     */
    class Bonus extends GameObject {
        /**
         * Create alive entity
         * @param {Object} gameObjectProps
         * @param {Object} stats
         * @param {Number} [stats.heal=0]
         * @param {Number} [stats.dDamage=0]
         * @param {Number} [stats.dSpeed=0]
         * @param {Number} [stats.damage=0]
         * @param {Number} [stats.dMaxHealth=0]
         */
        constructor(gameObjectProps, {heal = 0, dDamage = 0, dSpeed = 0, damage = 0, dMaxHealth = 0}) {
            super(...gameObjectProps);
            
            this._heal = _.min(heal, Constants.MAX_HEALTH_DIFF);
            this._dDamage = _.min(dDamage, Constants.MAX_DAMAGE_DIFF);
            this._damage = _.min(damage, Constants.MAX_HEALTH_DIFF);
            this._dSpeed = _.min(dSpeed, Constants.MAX_SPEED_DIFF);
            this._dMaxHealth = _.min(dMaxHealth, Constants.MAX_MAXHEALTH_DIFF);

            this._isPickedUp = false;
        }

        /* Actions */
        /**
         * Pick up bonus
         * @return {boolean}
         */
        pickUp() {
            return this._isPickedUp = true;
        }

        /* Getters */
        /**
         * Get bonus stats
         * @return {{heal: number, damage: number, dSpeed: number, dDamage: number, dMaxHealth: number}}
         */
        getStats() {
            return {
                heal: this._heal,
                damage: this._damage,
                dSpeed: this._dSpeed,
                dDamage: this._dDamage,
                dMaxHealth: this._dMaxHealth
            };
        }

        /**
         * Is bonus was picked up
         * @return {boolean}
         */
        isPickedUp() {
            return this._isPickedUp;
        }
    }

    return Bonus;
});
