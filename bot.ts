import * as core from '@actions/core'
import * as github from '@actions/github'
import { exec } from 'child_process'
import { promises as fs } from 'fs'

export var token = core.getInput('token', { required: true })
export var octokit = github.getOctokit(token)

const args = process.argv.slice(2)
const checkIndex = args.indexOf('--check')

if (checkIndex !== -1) {
  check()
  console.log('Checking Your Code.')
}

async function check() {
  try {
    exec('bun test > test.log', handleExec)
    exec('bun lint > lint.log', handleExec)
    exec('bun fmt > fmt.log', handleExec)
  } catch (error) {
    handleError(error)
  }
}

async function handleExec(error: Error | null, stdout: string, stderr: string) {
  if (error) {
    const errorLog = await fs.readFile('test.log', 'utf8')
    const fmtLog = await fs.readFile('fmt.log', 'utf8')
    const lintLog = await fs.readFile('lint.log', 'utf8')

    if (errorLog) {
      await octokit.rest.issues.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: 'Test failed',
        body: `The test failed with the following log:\n\n\`\`\`\n${errorLog}\n\`\`\``,
      })
    }

    if (fmtLog) {
      await octokit.rest.issues.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: 'Formatting issues',
        body: `The code has formatting issues:\n\n\`\`\`\n${fmtLog}\n\`\`\``,
      })
    }

    if (lintLog) {
      await octokit.rest.issues.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: 'Linting issues',
        body: `The code has linting issues:\n\n\`\`\`\n${lintLog}\n\`\`\``,
      })
    }
  }
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    core.setFailed(error.message)
  } else {
    core.setFailed('An unknown error occurred')
  }
}
