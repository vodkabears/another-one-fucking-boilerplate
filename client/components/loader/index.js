import Component, { PropTypes } from 'lib/component';
import styles from './styles.css';

export default class Loader extends Component {
  /**
   * @override
   */
  render() {
    if (!this.props.isLoading) {
      return null;
    }

    return (
      <div className={this.styles.loader}></div>
    );
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool
};

Loader.defaultProps = {
  isLoading: false
};

Loader.styles = styles;
