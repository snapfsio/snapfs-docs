---
title: Beta Quickstart
lede: The fastest path for beta testers to run a small scan, validate the results, and expand carefully.
---

# Beta Quickstart

This page is for early beta testers who want the fastest path to a working first scan.

The goal is not to set up everything perfectly on day one. The goal is to get one agent connected, run one small scan, confirm the results in the console, and then expand carefully.

## What You Will Receive

Before you begin, the SnapFS team will provide:

- your SnapFS URL (e.g. https://example.snapfs.com)
- a username and password for the console

You may receive an API key as well, otherwise you can create one in the console
(see [Managing Access](managing-access.md)).

## What To Expect

For a healthy beta onboarding:

- start with one host
- start with one small, familiar root
- expect the first scan to be a validation step, not a full rollout
- use the console to confirm that the results match what you expect

Avoid starting with a very large namespace on the first day.

## Fast Path

If you plan to install a long-running agent on Linux, this is the shortest path:

```bash
python3 -m pip install -U snapfs
```

If you expect scan throughput to matter on that host, prefer:

```bash
python3 -m pip install -U 'snapfs[xxhash]'
```

That enables the optional `xxh64` hash algorithm, which is often noticeably
faster on many-small-file or CPU-limited scan workloads.

Then:

1. open the provided SnapFS URL and sign in with the provided username and password
2. install and connect the scanner agent using that same SnapFS URL as the gateway URL
3. point the agent at a small root or subpath
4. run one initial scan
5. review the results in the console before increasing scope

If you want the full package or service install flow for a long-running agent, continue to [Installing an Agent](installing-an-agent.md).

## Quick CLI Scan

If you only want to run CLI scans for now, or if you want to validate connectivity before setting up a long-running agent, you can run a one-off scan directly from the CLI.

The easiest path is to pass your SnapFS API key directly on the command line:

<div class="tab-group" data-tabs data-default-tab="bash">
  <div class="tab-list" role="tablist" aria-label="CLI quick scan examples">
    <button class="tab-button" type="button" data-tab="bash">bash</button>
    <button class="tab-button" type="button" data-tab="powershell">PowerShell</button>
  </div>

  <div class="tab-panel" data-tab-panel>
    <pre><code>snapfs scan /path/to/small/test/root \
  --gateway https://example.snapfs.com \
  --api-key YOUR_API_KEY</code></pre>

    <p>Or set the gateway and API key as environment variables first:</p>

    <pre><code>export SNAPFS_GATEWAY=https://example.snapfs.com
export SNAPFS_API_KEY=YOUR_API_KEY
snapfs scan /path/to/small/test/root</code></pre>
  </div>

  <div class="tab-panel" data-tab-panel>
    <pre><code>snapfs scan C:\path\to\small\test\root `
  --gateway https://example.snapfs.com `
  --api-key YOUR_API_KEY</code></pre>

    <p>Or set the gateway and API key as environment variables first:</p>

    <pre><code>$env:SNAPFS_GATEWAY = "https://example.snapfs.com"
$env:SNAPFS_API_KEY = "YOUR_API_KEY"
snapfs scan C:\path\to\small\test\root</code></pre>
  </div>
</div>

For a first validation run, use a small, familiar path and confirm the results in the console before expanding scope. If you later want recurring scans on Linux, you can set up a long-running agent.

## Recommended First Targets

Good first targets include:

- a project workspace
- a home directory subfolder
- a small shared folder

Avoid using a very large mount, namespace, or broad storage root for the first validation run.

## After Your First Scan

After the first scan completes, use the console to confirm:

- the scan appears under `Jobs`
- the scanned path matches your intended target
- the results in `Overview`, `Explore`, and `Activity` look reasonable

If you set up a long-running agent, also confirm that it appears under `Agents`.

If anything looks off, reduce scope and rerun on a smaller target before expanding.

## Next Step

Continue with [Installing an Agent](installing-an-agent.md).
