import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`    → ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertContains(str, substring, message) {
  if (!str.includes(substring)) {
    throw new Error(message || `Expected to contain: "${substring}"`);
  }
}

// ─── 1. Core file checks ────────────────────────────────────────────────────
console.log('\n📁 Core files\n');

test('hone.md exists', () => {
  assert(fs.existsSync(path.join(ROOT, 'hone.md')), 'hone.md not found');
});

test('hone.md is non-empty', () => {
  const content = fs.readFileSync(path.join(ROOT, 'hone.md'), 'utf-8');
  assert(content.length > 100, 'hone.md is too short');
});

test('README.md exists', () => {
  assert(fs.existsSync(path.join(ROOT, 'README.md')), 'README.md not found');
});

test('CONTRIBUTING.md exists', () => {
  assert(fs.existsSync(path.join(ROOT, 'CONTRIBUTING.md')), 'CONTRIBUTING.md not found');
});

test('package.json is valid JSON', () => {
  const raw = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8');
  const pkg = JSON.parse(raw);
  assert(pkg.name === 'hone-skill', `Expected name "hone-skill", got "${pkg.name}"`);
  assert(pkg.bin?.hone, 'No bin.hone entry in package.json');
});

// ─── 2. hone.md content checks ──────────────────────────────────────────────
console.log('\n📄 hone.md content\n');

const honeMd = fs.readFileSync(path.join(ROOT, 'hone.md'), 'utf-8');

test('Contains HONE DIGEST instruction', () => {
  assertContains(honeMd, 'HONE DIGEST', 'Missing HONE DIGEST section');
});

test('Contains HONE QUESTION instruction', () => {
  assertContains(honeMd, 'HONE QUESTION', 'Missing HONE QUESTION section');
});

test('Contains hone: skip control', () => {
  assertContains(honeMd, 'hone: skip', 'Missing hone: skip control');
});

test('Contains hone: off control', () => {
  assertContains(honeMd, 'hone: off', 'Missing hone: off control');
});

test('Contains What just happened field', () => {
  assertContains(honeMd, 'What just happened', 'Missing "What just happened" field');
});

test('Contains Key decision field', () => {
  assertContains(honeMd, 'Key decision', 'Missing "Key decision" field');
});

test('Contains Watch out for field', () => {
  assertContains(honeMd, 'Watch out for', 'Missing "Watch out for" field');
});

// ─── 3. Skill files ─────────────────────────────────────────────────────────
console.log('\n⚙️  Skill files\n');

const skillFiles = ['cli.js', 'index.js', 'logger.js', 'domains.js'];

skillFiles.forEach(file => {
  test(`skill/${file} exists`, () => {
    assert(
      fs.existsSync(path.join(ROOT, 'skill', file)),
      `skill/${file} not found`
    );
  });
});

test('cli.js has shebang line', () => {
  const cli = fs.readFileSync(path.join(ROOT, 'skill', 'cli.js'), 'utf-8');
  assert(cli.startsWith('#!/usr/bin/env node'), 'cli.js missing shebang');
});

test('cli.js has init command', () => {
  const cli = fs.readFileSync(path.join(ROOT, 'skill', 'cli.js'), 'utf-8');
  assertContains(cli, "'init'", 'cli.js missing init command');
});

test('cli.js has history command', () => {
  const cli = fs.readFileSync(path.join(ROOT, 'skill', 'cli.js'), 'utf-8');
  assertContains(cli, "'history'", 'cli.js missing history command');
});

test('index.js exports init function', () => {
  const content = fs.readFileSync(path.join(ROOT, 'skill', 'index.js'), 'utf-8');
  assertContains(content, 'export async function init', 'init function not exported');
});

test('logger.js exports logEvent', () => {
  const content = fs.readFileSync(path.join(ROOT, 'skill', 'logger.js'), 'utf-8');
  assertContains(content, 'export async function logEvent', 'logEvent not exported');
});

test('logger.js exports showHistory', () => {
  const content = fs.readFileSync(path.join(ROOT, 'skill', 'logger.js'), 'utf-8');
  assertContains(content, 'export async function showHistory', 'showHistory not exported');
});

// ─── 4. Domain packs ────────────────────────────────────────────────────────
console.log('\n📦 Domain packs\n');

const expectedDomains = ['react', 'sql', 'python', 'rust', 'go'];

expectedDomains.forEach(domain => {
  const file = path.join(ROOT, 'domains', `hone-${domain}.md`);

  test(`hone-${domain}.md exists`, () => {
    assert(fs.existsSync(file), `hone-${domain}.md not found`);
  });

  test(`hone-${domain}.md has correct header`, () => {
    const content = fs.readFileSync(file, 'utf-8');
    assertContains(
      content,
      `# Hone Domain Pack — ${domain}`,
      `Missing header in hone-${domain}.md`
    );
  });

  test(`hone-${domain}.md has question templates`, () => {
    const content = fs.readFileSync(file, 'utf-8');
    assertContains(
      content,
      'Question Templates',
      `Missing question templates in hone-${domain}.md`
    );
  });
});

test('all domains registered in domains.js', () => {
  const content = fs.readFileSync(path.join(ROOT, 'skill', 'domains.js'), 'utf-8');
  expectedDomains.forEach(domain => {
    assertContains(content, `${domain}:`, `"${domain}" not registered in domains.js`);
  });
});

// ─── 5. Examples ────────────────────────────────────────────────────────────
console.log('\n📖 Examples\n');

const expectedExamples = ['cursor', 'claude-code', 'vscode'];

expectedExamples.forEach(tool => {
  test(`examples/${tool}/README.md exists`, () => {
    assert(
      fs.existsSync(path.join(ROOT, 'examples', tool, 'README.md')),
      `examples/${tool}/README.md not found`
    );
  });
});

// ─── 6. Naming conventions ──────────────────────────────────────────────────
console.log('\n🏷️  Naming conventions\n');

test('all domain files follow hone-[name].md pattern', () => {
  const files = fs.readdirSync(path.join(ROOT, 'domains'));
  files.forEach(file => {
    assert(
      /^hone-.+\.md$/.test(file),
      `"${file}" does not follow hone-[name].md naming convention`
    );
  });
});

test('.gitignore includes node_modules', () => {
  const content = fs.readFileSync(path.join(ROOT, '.gitignore'), 'utf-8');
  assertContains(content, 'node_modules', '.gitignore missing node_modules');
});

test('.gitignore includes .hone/', () => {
  const content = fs.readFileSync(path.join(ROOT, '.gitignore'), 'utf-8');
  assertContains(content, '.hone/', '.gitignore missing .hone/ entry');
});

// ─── Summary ────────────────────────────────────────────────────────────────
const total = passed + failed;
console.log('\n' + '─'.repeat(40));
console.log(`\n${passed}/${total} tests passed\n`);

if (failed > 0) {
  console.log(`❌ ${failed} test(s) failed\n`);
  process.exit(1);
} else {
  console.log('✅ All tests passed — Hone is ready\n');
}