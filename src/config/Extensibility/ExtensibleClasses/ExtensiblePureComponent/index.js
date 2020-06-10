/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const { PureComponent } = require('react');
const proxyInstance = require('../ProxyInstance');

/**
 * This component allows ScandiPWA extension functionality.
 * If the class has plugins meant for its instances
 * its instance is being proxied at the moment of instantiation.
 */
module.exports = class ExtensiblePureComponent extends PureComponent {
    constructor(props) {
        super(props);
        return proxyInstance(this);
    }
};
