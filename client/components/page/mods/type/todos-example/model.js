import API from 'lib/api';
import Model from 'lib/component-model';

export default class PageTypeTodosExampleModel extends Model {
  /**
   * Loads data for the page
   * @returns {Promise}
   */
  load() {
    this.setState({ isLoading: true });

    return API
      .get('/api/components/PageTypeTodosExample')
      .then(state => {
        state.isLoading = false;
        this.setState(state);
      });
  }
}
