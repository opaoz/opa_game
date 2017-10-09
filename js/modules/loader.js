/**
 * @file loader.js
 *
 * @author opa_oz
 * @date 09/10/2017
 */

define(['jquery', 'lodash'], ($, _) => {
    let progress = 0;
    let maxProgress = 0;
    const files = {};

    return {
        /**
         * Subscribe to resources loader
         * @param {Object} options
         * @param {Function} [options.progress]
         * @param {Function} [options.done]
         * @returns {Promise}
         */
        subscribe: (options) => {
            const defaults = {
                progress: _.noop,
                done: _.noop
            };

            options = _.defaults(options, defaults);

            return $.get('resources/config.json', (data) => {
                _.each(data, (v) => {
                    if (_.isArray(v)) {
                        maxProgress += v.length;
                    }
                });

                progress += Math.ceil(maxProgress / 10);
                maxProgress += progress;
                options.progress(progress, maxProgress);

                _.each(_.omitBy(data, (v) => !_.isArray(v)), (v, k) => {
                    _.each(v, (path) => {
                        const img = new Image();
                        const fullPath = `${data.prefix}/${k}/${path}`;

                        img.src = fullPath;
                        return img.onload = () => {
                            progress++;
                            options.progress(progress, maxProgress);
                            files[fullPath] = img;

                            if (progress === maxProgress) {
                                options.done(files);
                                return options.done = _.noop;
                            }
                        };
                    });
                });
            });
        }
    };
});
