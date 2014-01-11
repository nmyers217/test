const { exec } = require('child_process');
const execa = require('execa');
const config = require('./config');
const dates = require('./dates');

const main = async () => {
  try {
    console.log('Cleaning up old repo...');
    await execa('rm', ['-rf', config.dummyRepoPath]);

    console.log('Initializing new repo...');
    await execa('mkdir', [config.dummyRepoPath]);
    await execa('cd', [config.dummyRepoPath]);
    process.chdir(config.dummyRepoPath);
    await execa('git', ['init']);
    await execa('touch', ['content.txt']);

    console.log('Making commits...');
    for (const d of dates) {
      for (let i = 0; i < config.histogramStrength; i++) {
        await execa.command('echo "hi" >> content.txt', { shell: true });
        await execa('git', ['add', '--all']);
        await execa.command(`GIT_AUTHOR_DATE='${d}' GIT_COMMITTER_DATE='${d}' git commit -m "updates"`, { shell: true });
      }
    }

    console.log('Pushing commits...');
    await execa('git', ['remote', 'add', 'origin', config.dummyRepoRemote]);
    await execa('git', ['push', '-u', '--force', 'origin', 'master']);
  } catch (err) {
    console.error(err);
  }
};

main();
