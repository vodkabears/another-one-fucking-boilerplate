'use strict';

let path = require('path');

module.exports = shipit => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/aofb',
      deployTo: '/srv/aofb',
      repositoryUrl: 'https://github.com/VodkaBears/another-one-fucking-boilerplate.git',
      ignores: [
        '.*',
        'db',
        'lib',
        'test',
        'client',
        'server',
        'config',
        'README.md',
        '*.config.js',
        'shipitfile.js'
      ],
      rsync: ['--del'],
      keepReleases: 3,
      deleteOnRollback: false,
      shallowClone: true
    },
    production: {
      servers: 'USER@YOUR_HOST_NAME'
    }
  });

  shipit.blTask('deploy:build', () => {
    return shipit.local(`cd ${shipit.config.workspace} && npm run prod:build`);
  });

  shipit.blTask('deploy:startup', () => {
    return shipit.remote(
      `cd ${shipit.currentPath} && npm run set-db;` +
      `pm2 start ${path.join(shipit.currentPath, 'build', 'server.js')} -i 0 -l /var/log/node/ || pm2 reload all; pm2 save`
    );
  });

  shipit.task('deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:build',
    'deploy:update',
    'deploy:publish',
    'deploy:startup',
    'deploy:clean',
    'deploy:finish'
  ]);
};
