/**
 * @file Player.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */
define(['lodash', './common/AliveEntity', './common/Bonus'], (_, AliveEntity, Bonus) => {
    /**
     * @class Player
     * @description main game player class with alive actions
     */
    class Player extends AliveEntity {
        constructor() {
            super(...arguments);
        }

        /**
         * Pickup bonus from ground
         * @param {Bonus} bonus
         */
        pickUpBonus(bonus) {
            if (_.isEmpty(bonus) || !(bonus instanceof Bonus)) {
                throw new Error('must be bonus');
            }

            const bonusStats = bonus.getStats();

            if (bonusStats.heal) {
                this.heal(bonusStats.heal);
            } else if (bonusStats.damage) {
                this.hit(bonus);
            }

            if (bonusStats.dSpeed) {
                this.changeSpeed(bonusStats.dSpeed);
            }

            if (bonusStats.dDamage) {
                this.changeDamage(bonusStats.dDamage);
            }

            if (bonusStats.dMaxHealth) {
                this.changeMaxHealth(bonusStats.dMaxHealth, bonus);
            }

            bonus.pickUp();
        }
    }

    return Player;
});
