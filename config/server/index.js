/* istanbul ignore next */

/**
 * WARNING!
 * Import server configs only in server modules to prevent leaking to the client bundle.
 */

import devConfig from './development';
import prodConfig from './production';

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
