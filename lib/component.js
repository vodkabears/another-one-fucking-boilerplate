import React, { PropTypes } from 'react';

export default class Component extends React.Component {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    let constructor = this.constructor;
    let styles = constructor.styles;
    let Model = constructor.Model;

    /**
     * Model of the component
     * @type {ComponentModel}
     */
    Model && (this.model = new Model(this));

    /**
     * CSS module styles
     * @type {Object}
     */
    this.styles = styles || {};

    /**
     * Сontext independent translation function for the component
     * @type {Function}
     */
    this.t = constructor.i18n;
  }

  /**
   * @override
   */
  componentWillUnmount() {
    let model = this.model;

    model && model.destroy();
  }
}

export { PropTypes };
