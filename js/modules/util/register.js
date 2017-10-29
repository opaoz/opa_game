/**
 * @file register.js
 *
 * @author opa_oz
 * @date 29/10/2017
 */

const modulesPrefix = 'modules/';

define([
    'Player'
].map((v) => `${modulesPrefix}${v}`), (...classes) => (classes));
