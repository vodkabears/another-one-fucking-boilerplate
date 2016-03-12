/* istanbul ignore next */

import devConfig from './development';
import prodConfig from './production';

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
