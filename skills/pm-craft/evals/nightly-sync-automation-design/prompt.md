---
tags: [skill-creator]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

We want a nightly job that pulls new Zendesk tickets tagged "bug", creates matching Jira issues for them, and posts a summary to our #eng-triage Slack channel every morning. We're a small team and it'll run as a scheduled GitHub Action. Before we build anything, can you write up a design doc for it? Save it as design.md
