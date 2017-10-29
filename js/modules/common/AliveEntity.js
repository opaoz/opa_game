/**
 * @file AliveEntity.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */

define(['lodash', './GameObject', '../constants'], (_, GameObject, Constants) => {
    /**
     * @class AliveEntity
     * @description class to implement moveable creatures with live cycle
     */
    class AliveEntity extends GameObject {
        /**
         * Create alive entity
         * @param {Object} gameObject
         * @param {Number} gameObject.x
         * @param {Number} gameObject.y
         * @param {Number} gameObject.width
         * @param {Number} gameObject.height
         * @param {Object} entity
         * @param {Number} entity.health
         * @param {Number} entity.damage
         * @param {Number} entity.speed
         * @param {Image[]} imageSet
         * @param {Function} [onKill=_.noop] on kill callback
         */
        constructor({x, y, width, height}, {health, damage, speed}, imageSet = [], onKill = _.noop) {
            super(x, y, width, height);
            this._maxHealth = this._health = _.min(Constants.MAX_HEALTH, health);
            this._damage = _.min(Constants.MAX_DAMAGE, damage);
            this._speed = _.min(Constants.MAX_SPEED, speed);
            this._imageSet = imageSet;

            this._isDisarmed = false;
            this._onKill = onKill;
        }

        /* State changers */
        /**
         * Change entity's speed
         * @param {Number} [dSpeed=0] speed diff to change (max: Constants.MAX_SPEED_DIFF, min: -Constants.MAX_SPEED_DIFF)
         * @returns {Number}
         */
        changeSpeed(dSpeed = 0) {
            const newSpeed = this._speed + dSpeed;

            if (!_.isNumber(dSpeed) || dSpeed < -Constants.MAX_SPEED_DIFF || dSpeed > Constants.MAX_SPEED_DIFF) {
                throw new Error(`can change only by +-${Constants.MAX_SPEED_DIFF} at time`);
            }

            if (newSpeed < 0) {
                return this._speed = 0;
            }

            return this._speed = _.min(Constants.MAX_SPEED, this._speed + dSpeed);
        }

        /**
         * Heal entity
         * @param {Number} [dHealth=0] heal count (max: Constants.MAX_HEALTH_DIFF)
         * @returns {Number}
         */
        heal(dHealth = 0) {
            if (!_.isNumber(dHealth) || dHealth < 0 && dHealth > Constants.MAX_HEALTH_DIFF) {
                throw new Error(`must be a positive number, max ${Constants.MAX_HEALTH_DIFF}`);
            }

            return this._health = _.min(this._maxHealth, this._health + dHealth);
        }

        /**
         * Change entity's damage
         * @param [dDamage=0] damage diff to change (max: Constants.MAX_DAMAGE_DIFF, min: -Constants.MAX_DAMAGE_DIFF)
         * @return {Number}
         */
        changeDamage(dDamage = 0) {
            const newDamage = this._damage + dDamage;

            if (!_.isNumber(dDamage) || dDamage < -Constants.MAX_DAMAGE_DIFF || dDamage > Constants.MAX_DAMAGE_DIFF) {
                throw new Error(`can change only by +-${Constants.MAX_DAMAGE_DIFF} at time`);
            }

            if (newDamage < 0) {
                return this._damage = 0;
            }

            return this._damage = _.min(Constants.MAX_DAMAGE, newDamage);
        }

        /**
         * Change max health of entity
         * @param {Number} dMaxHealth max health diff (max: Constants.MAX_MAXHEALTH_DIFF)
         * @param {Bonus} source
         * @return {Number}
         */
        changeMaxHealth(dMaxHealth, source) {
            const newMaxHealth = this._maxHealth + dMaxHealth;

            if (!_.isNumber(dMaxHealth) || dMaxHealth < -Constants.MAX_MAXHEALTH_DIFF || dMaxHealth > Constants.MAX_MAXHEALTH_DIFF) {
                throw new Error(`can change only by +-${Constants.MAX_MAXHEALTH_DIFF} at time`);
            }

            if (newMaxHealth < 0) {
                return this.death(source);
            }

            if (newMaxHealth < this._health) {
                return this._health = this._maxHealth = newMaxHealth;
            }

            return this._maxHealth = newMaxHealth;
        }

        /**
         * Hit the entity by entity
         * @param {AliveEntity|Bonus} hitter
         * @return {Number}
         */
        hit(hitter) {
            if (_.isEmpty(hitter)) {
                throw new Error('hitter must be an object');
            }

            const dDamage = hitter.getStats().damage;
            const newHealth = this._health - dDamage;

            if (newHealth <= 0) {
                return this.death(hitter);
            }

            return this._health = newHealth;
        }

        /* Actions */
        /**
         * Disarm entity to time
         * @param {Number} [timeout=Constants.DEFAULT_DISARM_TIMEOUT] disarm timeout (max: Constants.MAX_DISARM_TIMEOUT)
         * @param {Function} [cb=_.noop] callback function
         */
        disarm(timeout = Constants.DEFAULT_DISARM_TIMEOUT, cb = _.noop) {
            if (!_.isNumber(timeout) || timeout < 0 || timeout > Constants.MAX_DISARM_TIMEOUT) {
                throw new Error(`must be a positive number, max ${Constants.MAX_DISARM_TIMEOUT}`);
            }

            this._isDisarmed = true;
            this._disarmedDamage = this._damage;
            this._damage = 0;

            setTimeout(() => {
                this._isDisarmed = false;
                this._damage = this._disarmedDamage;
                this._disarmedDamage = 0;

                _.isFunction(cb) && cb(this);
            }, timeout * 1000);
        }

        /**
         * Kill the entity
         */
        death(killer) {
            this._health = 0;
            _.isFunction(this._onKill) && this._onKill(killer);
        }

        /* Getters */
        /**
         * Is entity disarmed
         * @return {boolean}
         */
        isDisarmed() {
            return this._isDisarmed;
        }

        /**
         * Is entity alive
         * @return {boolean}
         */
        isAlive() {
            return this._health > 0;
        }

        /**
         * Get entity's state
         * @return {{health: number, speed: number, damage: number, maxHealth: number, isDisarmed: boolean}}
         */
        getStats() {
            return {
                health: this._health,
                speed: this._speed,
                damage: this._damage,
                maxHealth: this._maxHealth,
                isDisarmed: this._isDisarmed
            };
        }

        /**
         * Return image set
         * @readonly
         * @return {Image[]}
         */
        get imageSet() {
            return this._imageSet;
        }
    }

    return AliveEntity;
});
