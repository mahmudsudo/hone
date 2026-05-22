#!/usr/bin/env node

import { program } from 'commander';
import { init } from './index.js';
import { showHistory } from './logger.js';
import { listDomains, installDomain } from './domains.js';
import chalk from 'chalk';

console.log(chalk.bold.cyan('\n⚡ Hone — AI writes the code. You understand it.\n'));

program
  .name('hone')
  .description('Keep your coding skills sharp while using AI')
  .version('1.0.0');

program
  .command('init')
  .description('Drop hone.md into your current project')
  .option('-d, --domain <domain>', 'Add a domain pack (react, sql, python, etc.)')
  .option('-t, --target <target>', 'Target AI tool: cursor | claude-code | vscode | raw', 'raw')
  .action((options) => {
    init(options);
  });

program
  .command('history')
  .description('View your comprehension history and weak spots')
  .option('-n, --last <number>', 'Show last N sessions', '10')
  .action((options) => {
    showHistory(parseInt(options.last));
  });

program
  .command('domains')
  .description('List available domain packs')
  .action(() => {
    listDomains();
  });

program
  .command('add <domain>')
  .description('Add a domain pack to your project (e.g. hone add react)')
  .action((domain) => {
    installDomain(domain);
  });

program
  .command('status')
  .description('Show Hone status for current project')
  .action(async () => {
    const { default: fs } = await import('fs-extra');
    const { default: path } = await import('path');
    const honePath = path.join(process.cwd(), 'hone.md');
    if (fs.existsSync(honePath)) {
      console.log(chalk.green('✓ hone.md found in this project'));
    } else {
      console.log(chalk.yellow('✗ hone.md not found — run `hone init` to set up'));
    }
  });

program.parse();