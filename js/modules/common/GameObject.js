/**
 * @file GameObject.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */

define(['lodash', '../constants'], (_, Constants) => {
    /**
     * @class GameObject
     * @description defines common game object with coordinates (`x`, `y`), sizes (`width`, `height`) and `image`
     */
    class GameObject {
        /**
         * Create game object
         * @param {Number} [x=0]
         * @param {Number} [y=0]
         * @param {Number} [width=Constants.DEFAULT_SIZE]
         * @param {Number} [height=Constants.DEFAULT_SIZE]
         * @param {Image} [image=null]
         */
        constructor(x = 0, y = 0, width = Constants.DEFAULT_SIZE, height = Constants.DEFAULT_SIZE, image = null) {
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._image = image;
        }

        /**
         * Change object coordinates
         * @param {Number} x
         * @param {Number} y
         */
        changeCoordinates(x, y) {
            if (_.isNumber(x) && _.isNumber(y) && x >= 0 && y >= 0) {
                this._x = x;
                this._y = y;
            } else {
                throw new Error('must be a positive number');
            }
        }

        /**
         * Image getter
         * @returns {Image}
         */
        get image() {
            return this._image || {};
        }

        /**
         * Image setter
         * @param {Image} newImage
         * @returns {Image}
         */
        set image(newImage) {
            if (newImage instanceof Image) {
                return this._image = newImage;
            }

            throw new Error('must be an Image');
        }

        /**
         * Set canvas corners
         * @param {Number} [width=Constants.MIN_SCREEN_WIDTH]
         * @param {Number} [height=Constants.MIN_SCREEN_HEIGHT]
         */
        static setCorners(width, height) {
            GameObject.corners = {
                width: _.max(width, GameObject.corners.width),
                height: _.max(height, GameObject.corners.height)
            };
        }

        /**
         * Get canvas corners
         * @return {{width: *, height: *}}
         */
        static getCorners() {
            return {...GameObject.corners};
        }
    }

    GameObject.corners = {width: Constants.MIN_SCREEN_WIDTH, height: Constants.MIN_SCREEN_HEIGHT};

    return GameObject;
});
