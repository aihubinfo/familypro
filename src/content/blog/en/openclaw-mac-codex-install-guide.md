---
locale: en
translationKey: openclaw-mac-codex-install-guide
title: "OpenClaw on Mac: Install It and Connect Codex"
description: A practical Mac setup guide for OpenClaw with Codex OAuth, covering install steps, config structure, model checks, callback fixes, and embeddings caveats.
summary: A developer-focused walkthrough for installing OpenClaw on macOS and wiring Codex in as the default model with the supported OAuth flow.
category: AI Tooling
pubDate: 2026-03-24
updatedDate: 2026-03-24
author: Mark
service: OpenClaw
tags:
  - OpenClaw
  - Codex
  - macOS
  - OAuth
  - AI Agent
draft: false
---

If you want a Mac-based AI agent stack that can do more than chat, OpenClaw is a sensible place to start. It is not just a wrapper around model calls. It gives you a runtime for models, auth, gateway services, workspaces, tools, memory, and automation. That matters because once you move past toy prompts and into repeatable workflows, the hard part is rarely “can I call a model?” It is “can I keep the whole environment predictable?”

Codex is a common first choice in that setup for an equally practical reason: if you already live inside ChatGPT or Codex, OAuth can be a cleaner on-ramp than standing up API-key billing on day one. That makes OpenClaw plus `openai-codex` a very approachable combination for solo developers and small teams.

This guide is based on the OpenClaw docs available on March 24, 2026. The goal here is not to throw every CLI command at you. It is to clarify the parts that usually get blurred together: what OpenClaw is responsible for, how `openai-codex` differs from `openai`, when to use onboarding versus direct auth login, what the config file actually controls, and how to verify that the install is genuinely working instead of merely looking plausible.

## Why people pair OpenClaw with Codex

[OpenClaw](https://github.com/openclaw/openclaw) works best when you think of it as an agent runtime rather than a model picker. It sits above providers, auth, gateway state, agent defaults, memory, and tooling. You do not need to use every layer on day one, but that layered structure is why it scales from “just get me a model” to “run tasks in a controlled workspace.”

Inside OpenClaw, Codex lives under the `openai-codex` provider. That is important because people often blur it together with the plain `openai` provider. They are related, but not interchangeable:

- `openai-codex/*` is the lane for ChatGPT or Codex subscription OAuth.
- `openai/*` is the lane for OpenAI Platform API-key usage.

So if your plan is “sign in with my ChatGPT account,” you want `openai-codex`. If your plan is “pay per request with `OPENAI_API_KEY`,” you are usually looking at `openai`, not `openai-codex`.

Docs:

- [OpenAI / Codex provider](https://docs.openclaw.ai/providers/openai)
- [Model Providers](https://docs.openclaw.ai/concepts/model-providers)

## The shortest working path

For a first-time Mac setup, this is still the most reliable path:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version
openclaw doctor
openclaw onboard --auth-choice openai-codex
```

After the browser sign-in finishes, verify the stack:

```bash
openclaw gateway status
openclaw status --deep
openclaw models status
```

If those commands look healthy, install, gateway, auth, and default model resolution are usually all in place.

## Three things to check before you start

First, do not come in with an ancient Node install. OpenClaw currently recommends Node 24 and supports Node 22.16 or newer. The installer can help, but it is still useful to know what the baseline is.

Second, expect to use a browser. Codex on this path uses OAuth, not copy-pasted API keys, so browser-based sign-in is part of the normal flow.

Third, keep a shell PATH issue in mind. A surprising number of “the install failed” reports are really “the install worked, but the shell cannot find `openclaw`.”

Install doc:

- [OpenClaw Install](https://docs.openclaw.ai/install)

## Installing OpenClaw on macOS

The recommended install method is still the official script:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

That does more than download a CLI. According to the docs, it detects the host environment, prepares Node when necessary, installs OpenClaw, and launches onboarding.

If you want the binary in place before doing setup, use:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

There is also a manual npm route:

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

That is fine if you prefer managing global packages yourself, but the official script is usually the better first pass because it reduces environment drift.

## Onboarding versus direct provider login

This is one of the easiest places for older setup guides to go stale.

As of the current OpenClaw docs, both of these are valid Codex login commands:

```bash
openclaw onboard --auth-choice openai-codex
```

```bash
openclaw models auth login --provider openai-codex
```

The difference is not which one is “real.” The difference is where you are in the setup:

- `openclaw onboard --auth-choice openai-codex` is the better first-time path because it keeps initialization, auth, and default model setup in one flow.
- `openclaw models auth login --provider openai-codex` is better when OpenClaw is already installed and you just need to add, refresh, or repair Codex auth.

If you are starting fresh, I would still use onboarding first. It is simply harder to miss a step.

## What actually happens during OAuth

Codex auth in OpenClaw uses standard PKCE OAuth. In practice, the CLI opens an authorization URL, you sign in through OpenAI, and the browser attempts to return to a local callback, commonly:

```text
http://127.0.0.1:1455/auth/callback
```

Two details matter more than most setup guides admit.

First, a broken-looking browser callback page does not automatically mean the login failed. The OpenClaw OAuth docs explicitly note that if the CLI cannot capture the redirect cleanly, you can paste the final redirect URL back into the terminal and continue.

Second, after a successful login, OpenClaw stores OAuth state in local auth profiles and handles refresh for you. In other words, your real job is verifying that auth was stored correctly, not hand-editing token files.

Doc:

- [OAuth](https://docs.openclaw.ai/concepts/oauth)

## Do not edit config before you check state

A lot of people open `~/.openclaw/openclaw.json` too early. The better order is to inspect the CLI-reported state first:

```bash
openclaw --version
openclaw doctor
openclaw gateway status
openclaw status --deep
openclaw models status
```

Each command answers a different question:

- `openclaw --version` tells you whether the CLI is reachable from the shell.
- `openclaw doctor` surfaces and repairs common config or state problems.
- `openclaw gateway status` checks whether the gateway service is actually installed and running.
- `openclaw status --deep` performs a deeper runtime probe.
- `openclaw models status` shows the resolved default model, provider auth state, and whether OAuth is missing, expiring, or broken.

Two extra commands are useful when you want more signal:

```bash
openclaw models list --provider openai-codex
openclaw models status --check
```

The first shows what Codex models your current account can actually see. The second is useful in scripts or automation because it returns exit codes for missing, expired, or soon-to-expire credentials.

Related docs:

- [Models CLI](https://docs.openclaw.ai/models)
- [Troubleshooting](https://docs.openclaw.ai/help/troubleshooting)
- [Health Checks](https://docs.openclaw.ai/health)

## If `openclaw` is not found after install

That is usually a PATH problem, not a failed install. Check the npm global prefix first:

```bash
npm prefix -g
```

Then add the global bin directory to your shell config:

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

Restart the terminal and run `openclaw --version` again.

## Where the default model lives

The current OpenClaw docs use `openai-codex/gpt-5.4` as the default Codex example. If onboarding completed cleanly, that may already be written for you. To confirm manually, inspect `~/.openclaw/openclaw.json`.

The minimal shape looks like this:

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "openai-codex/gpt-5.4"
      }
    }
  }
}
```

If you want to understand the config structure instead of just copying one field, these are the sections worth noticing:

- `agents.defaults` for default agent behavior such as primary model, fallbacks, and workspace.
- `models.providers` for explicit provider configuration.
- auth profiles for OAuth or API-key-backed provider state.

That means future changes like adding OpenAI API access, adding OpenRouter, or defining fallbacks still fit into the same config model rather than introducing a separate system.

Config doc:

- [Configuration](https://docs.openclaw.ai/gateway/configuration)

## Codex auth does not solve embeddings

This is one of the most common hidden assumptions in real-world setups.

Codex OAuth gives you access to the reasoning model path. It does not automatically give you an embeddings strategy. The OpenClaw FAQ is explicit on this point: if you want semantic memory search with OpenAI embeddings, you still need a real API key. Codex OAuth alone is not enough.

So if your only goal is “make the agent run on Codex,” you may already be done. But if you also want retrieval, memory search, or knowledge-base workflows, check embeddings separately before you assume the stack is complete.

FAQ:

- [FAQ](https://docs.openclaw.ai/faq)

## A better troubleshooting ladder

When setup goes sideways, guessing is slower than walking the stack in order. A practical local troubleshooting ladder looks like this:

```bash
openclaw status
openclaw status --all
openclaw gateway probe
openclaw gateway status
openclaw doctor
openclaw models status
openclaw health --verbose
openclaw logs --follow
```

That sequence helps separate local config issues, gateway service failures, auth problems, and runtime health issues instead of mashing them into one vague “it does not work.”

## One advanced detail you probably do not need on day one

The provider docs note that both `openai/*` and `openai-codex/*` default to `auto` transport, which means WebSocket first and SSE fallback. That is useful to know, but not something you should rush to customize unless you have a real network or compatibility reason.

For a first install, leaving transport alone is usually the right call.

## The setup order I would actually use

If I were writing this into a personal runbook, I would use this order:

1. Install OpenClaw with the official script.
2. Run `openclaw --version` and `openclaw doctor`.
3. Complete first-time Codex auth with `openclaw onboard --auth-choice openai-codex`.
4. Check `openclaw models status` to confirm the resolved default model and OAuth state.
5. Verify gateway and runtime health with `openclaw gateway status` and `openclaw status --deep`.
6. Only then add embeddings providers, fallbacks, or more detailed provider config if the workflow actually needs them.

That order keeps the debugging surface small. When something breaks, you know whether it belongs to install, auth, service, or model config.

## Copy-paste command block

```bash
# Install
curl -fsSL https://openclaw.ai/install.sh | bash

# Core checks
openclaw --version
openclaw doctor
openclaw gateway status
openclaw status --deep
openclaw models status

# First-time Codex setup
openclaw onboard --auth-choice openai-codex

# Re-auth for an existing install
openclaw models auth login --provider openai-codex

# Check what Codex models the account can see
openclaw models list --provider openai-codex
```

## Final note

The Mac setup is much clearer now than it was in earlier OpenClaw releases, but the important part is still the same: do not treat install, gateway health, auth, and embeddings as one problem. They are related, but they fail differently.

If this is your first pass, use onboarding. If you are repairing an existing install, direct provider login is a perfectly valid path now. Both are supported in the current docs. The main difference is simply when to use them.
