import Component, { PropTypes } from 'lib/component';
import config from 'config/common';
import styles from './styles.css';

export default class LangSwitcher extends Component {
  render() {
    return (
      <ul className={this.props.className}>
        {config.langs.map(lang => (
          <li key={lang}>
            <a data-lang={lang} href={`?lang=${lang}`}>{lang}</a>
          </li>
        ))}
      </ul>
    );
  }
}

LangSwitcher.propTypes = {
  className: PropTypes.string
};

LangSwitcher.defaultProps = {
  className: styles.langSwitcher
};

LangSwitcher.styles = styles;
