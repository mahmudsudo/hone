import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOMAINS_DIR = path.join(__dirname, '..', 'domains');

const AVAILABLE_DOMAINS = {
  react: {
    file: 'hone-react.md',
    description: 'React hooks, components, state management, rendering patterns',
  },
  sql: {
    file: 'hone-sql.md',
    description: 'SQL queries, joins, indexes, query optimization',
  },
  python: {
    file: 'hone-python.md',
    description: 'Python idioms, data structures, async, decorators',
  },
  rust: {
    file: 'hone-rust.md',
    description: 'Ownership, borrowing, lifetimes, traits, concurrency',
  },
  go: {
    file: 'hone-go.md',
    description: 'Goroutines, channels, error handling, interfaces, Go idioms',
  },
  node: {
    file: 'hone-node.md',
    description: 'Node.js, Express, event loop, streams, APIs',
  },
  devops: {
    file: 'hone-devops.md',
    description: 'Docker, CI/CD, Kubernetes, infrastructure as code',
  },
};

export function listDomains() {
  console.log(chalk.bold.cyan('\n📦 Available Hone Domain Packs\n'));
  Object.entries(AVAILABLE_DOMAINS).forEach(([name, info]) => {
    const domainPath = path.join(DOMAINS_DIR, info.file);
    const installed = fs.pathExistsSync(domainPath);
    const status = installed ? chalk.green('✓') : chalk.dim('○');
    console.log(`${status} ${chalk.bold(name.padEnd(12))} ${chalk.dim(info.description)}`);
  });
  console.log();
  console.log(chalk.dim('Install: hone add <domain>'));
  console.log(chalk.dim('Example: hone add react\n'));
}

export async function installDomain(domain) {
  const domainInfo = AVAILABLE_DOMAINS[domain];

  if (!domainInfo) {
    console.log(chalk.red(`✗ Unknown domain: ${domain}`));
    console.log(chalk.dim(`Run \`hone domains\` to see available packs.\n`));
    return;
  }

  const domainPath = path.join(DOMAINS_DIR, domainInfo.file);
  const projectHonePath = path.join(process.cwd(), 'hone.md');

  if (!(await fs.pathExists(domainPath))) {
    console.log(chalk.red(`✗ Domain file missing: ${domainInfo.file}`));
    console.log(chalk.dim(`This domain pack may not be installed yet.\n`));
    return;
  }

  if (!(await fs.pathExists(projectHonePath))) {
    console.log(chalk.yellow(`⚠ hone.md not found in this project.`));
    console.log(chalk.dim(`Run \`hone init\` first, then \`hone add ${domain}\`\n`));
    return;
  }

  const domainContent = await fs.readFile(domainPath, 'utf-8');
  const existing = await fs.readFile(projectHonePath, 'utf-8');

  if (existing.includes(`# Hone Domain Pack — ${domain}`)) {
    console.log(chalk.yellow(`⚠ ${domain} pack already installed in hone.md\n`));
    return;
  }

  await fs.appendFile(projectHonePath, `\n\n---\n\n${domainContent}`);
  console.log(chalk.green(`✓ Domain pack added: ${domain}`));
  console.log(chalk.dim(`  hone.md updated with ${domain}-specific question templates\n`));
}