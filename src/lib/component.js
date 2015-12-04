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
     * @protected
     * @type {ComponentModel}
     */
    Model && (this.model = new Model(this));

    /**
     * CSS module styles
     * @protected
     * @type {Object}
     */
    this.styles = styles || {};
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
