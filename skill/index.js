import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HONE_SOURCE = path.join(__dirname, '..', 'hone.md');

// Target-specific file mappings
// Each AI tool reads context from a different file
const TARGET_MAP = {
  raw: {
    filename: 'hone.md',
    description: 'Generic hone.md for any AI tool',
  },
  cursor: {
    filename: '.cursorrules',
    description: 'Cursor AI rules file',
    wrapper: (content) => `# Hone Protocol — Cursor Rules\n\n${content}`,
  },
  'claude-code': {
    filename: 'CLAUDE.md',
    description: 'Claude Code context file',
    wrapper: (content) => `# Hone Protocol — Claude Code\n\n${content}`,
  },
  vscode: {
    filename: '.github/copilot-instructions.md',
    description: 'GitHub Copilot instructions',
    wrapper: (content) => `# Hone Protocol — Copilot Instructions\n\n${content}`,
    ensureDir: '.github',
  },
};

export async function init({ target = 'raw', domain = null } = {}) {
  const cwd = process.cwd();
  const targetConfig = TARGET_MAP[target] || TARGET_MAP.raw;

  console.log(chalk.bold(`Initializing Hone for ${chalk.cyan(target)}...\n`));

  // Read base hone.md
  let content = await fs.readFile(HONE_SOURCE, 'utf-8');

  // Append domain pack if requested
  if (domain) {
    const domainPath = path.join(__dirname, '..', 'domains', `hone-${domain}.md`);
    if (await fs.pathExists(domainPath)) {
      const domainContent = await fs.readFile(domainPath, 'utf-8');
      content += `\n\n---\n\n${domainContent}`;
      console.log(chalk.green(`✓ Domain pack loaded: ${domain}`));
    } else {
      console.log(chalk.yellow(`⚠ Domain pack not found: ${domain}. Continuing without it.`));
      console.log(chalk.dim(`  Available: react, sql, python, node, devops`));
    }
  }

  // Apply wrapper if target needs it
  if (targetConfig.wrapper) {
    content = targetConfig.wrapper(content);
  }

  // Ensure subdirectory exists if needed
  if (targetConfig.ensureDir) {
    await fs.ensureDir(path.join(cwd, targetConfig.ensureDir));
  }

  // Write the file
  const outputPath = path.join(cwd, targetConfig.filename);
  const fileExists = await fs.pathExists(outputPath);

  if (fileExists) {
    console.log(chalk.yellow(`⚠ ${targetConfig.filename} already exists.`));
    console.log(chalk.dim(`  Appending Hone Protocol to existing file...\n`));
    const existing = await fs.readFile(outputPath, 'utf-8');
    await fs.writeFile(outputPath, `${existing}\n\n---\n\n${content}`);
  } else {
    await fs.writeFile(outputPath, content);
  }

  console.log(chalk.green(`✓ ${targetConfig.filename} created in ${cwd}`));
  console.log(chalk.green(`✓ Hone is active — your AI will now run the protocol\n`));

  // Initialize local history log
  await initHistoryLog(cwd);

  console.log(chalk.bold.cyan('You\'re set. AI writes the code. You understand it.\n'));
}

async function initHistoryLog(cwd) {
  const logDir = path.join(cwd, '.hone');
  const logFile = path.join(logDir, 'history.json');

  await fs.ensureDir(logDir);

  if (!(await fs.pathExists(logFile))) {
    await fs.writeJSON(logFile, {
      created: new Date().toISOString(),
      sessions: [],
    });
    console.log(chalk.green(`✓ History log initialized at .hone/history.json`));
    console.log(chalk.dim(`  Add .hone/ to .gitignore to keep history local\n`));

    // Auto-append to .gitignore if it exists
    const gitignorePath = path.join(cwd, '.gitignore');
    if (await fs.pathExists(gitignorePath)) {
      const gitignore = await fs.readFile(gitignorePath, 'utf-8');
      if (!gitignore.includes('.hone')) {
        await fs.appendFile(gitignorePath, '\n# Hone local history\n.hone/\n');
        console.log(chalk.green(`✓ .hone/ added to .gitignore automatically\n`));
      }
    }
  }
}