module.exports = {
  apps: [{
    name: 'trusmith',
    script: 'npm',
    args: 'start',
    cwd: '/Users/motherfuckingpatrick/trusmith-jewelers-prod',
    env: {
      NODE_ENV: 'production',
      PORT: 3002
    }
  }]
};
