import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const LOG_FILE = path.join(process.cwd(), '.hone', 'history.json');

// Log a comprehension event (called externally or by IDE plugins)
export async function logEvent({ question, userAnswer, correct, topic, timestamp }) {
  const log = await readLog();

  log.sessions.push({
    id: log.sessions.length + 1,
    timestamp: timestamp || new Date().toISOString(),
    topic: topic || 'general',
    question,
    userAnswer,
    correct,
  });

  await fs.writeJSON(LOG_FILE, log, { spaces: 2 });
}

// Read raw log
export async function readLog() {
  if (!(await fs.pathExists(LOG_FILE))) {
    return { created: new Date().toISOString(), sessions: [] };
  }
  return fs.readJSON(LOG_FILE);
}

// Show history in terminal
export async function showHistory(last = 10) {
  const log = await readLog();

  if (log.sessions.length === 0) {
    console.log(chalk.yellow('No comprehension history yet.'));
    console.log(chalk.dim('Start using Hone in your AI sessions to build history.\n'));
    return;
  }

  const recent = log.sessions.slice(-last);
  const total = log.sessions.length;
  const correct = log.sessions.filter((s) => s.correct).length;
  const score = Math.round((correct / total) * 100);

  console.log(chalk.bold.cyan(`\n📊 Hone History — Last ${last} sessions\n`));
  console.log(chalk.dim(`Overall: ${correct}/${total} correct (${score}%)\n`));

  // Weak spot analysis
  const topics = {};
  log.sessions.forEach((s) => {
    if (!topics[s.topic]) topics[s.topic] = { correct: 0, total: 0 };
    topics[s.topic].total++;
    if (s.correct) topics[s.topic].correct++;
  });

  const weakSpots = Object.entries(topics)
    .filter(([, v]) => v.total >= 2 && v.correct / v.total < 0.6)
    .map(([topic]) => topic);

  if (weakSpots.length > 0) {
    console.log(chalk.yellow(`⚠ Weak spots detected: ${weakSpots.join(', ')}`));
    console.log(chalk.dim(`  Consider reviewing these topics.\n`));
  }

  // Recent sessions
  recent.forEach((s) => {
    const icon = s.correct ? chalk.green('✓') : chalk.red('✗');
    const date = new Date(s.timestamp).toLocaleDateString();
    console.log(`${icon} [${date}] ${chalk.bold(s.topic)}`);
    console.log(chalk.dim(`   Q: ${s.question.slice(0, 80)}...`));
    if (!s.correct && s.userAnswer) {
      console.log(chalk.dim(`   You answered: ${s.userAnswer.slice(0, 60)}`));
    }
    console.log();
  });
}

// Get weak spots (for domain pack suggestions)
export async function getWeakSpots() {
  const log = await readLog();
  const topics = {};

  log.sessions.forEach((s) => {
    if (!topics[s.topic]) topics[s.topic] = { correct: 0, total: 0 };
    topics[s.topic].total++;
    if (s.correct) topics[s.topic].correct++;
  });

  return Object.entries(topics)
    .filter(([, v]) => v.total >= 2 && v.correct / v.total < 0.6)
    .map(([topic, v]) => ({ topic, score: v.correct / v.total }))
    .sort((a, b) => a.score - b.score);
}