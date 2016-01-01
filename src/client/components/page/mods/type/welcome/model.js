import API from 'lib/api';
import Model from 'lib/component-model';

export default class PageTypeWelcomeModel extends Model {
  load() {
    API
     .get('/api/components/PageTypeWelcome')
     .then(data => this.setState(data.PageTypeWelcome));
  }
}
