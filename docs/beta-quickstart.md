---
title: Beta Quickstart
lede: The fastest path for beta testers to connect an agent, run a small scan, and validate the results.
---

# Beta Quickstart

This page is for early beta testers who want the fastest path to a working first scan.

The goal is not to set up everything perfectly on day one. The goal is to get one agent connected, run one small scan, confirm the results in the console, and then expand carefully.

## What You Will Receive

Before you begin, the SnapFS team will provide:

- your SnapFS URL (e.g. https://example.snapfs.com)
- a username and password for the console

You may receive an API key as well, otherwise you can create one in the console
(see [Managing Access](docs/managing-access.md)).

## What To Expect

For a healthy beta onboarding:

- start with one host
- start with one small, familiar root
- expect the first scan to be a validation step, not a full rollout
- use the console to confirm that the results match what you expect

Avoid starting with a very large namespace on the first day.

## Fast Path

If you already have a Linux host picked out for the scanner agent, this is the shortest path:

```bash
python3 -m pip install -U snapfs
```

Then:

1. open the provided SnapFS URL and sign in with the provided username and password
2. install and connect the scanner agent using that same SnapFS URL as the gateway URL
3. point the agent at a small root or subpath
4. run one initial scan
5. review the results in the console before increasing scope

If you need the full package or service install flow, continue to [Installing an Agent](installing-an-agent.md).

## Recommended First Targets

Good first targets include:

- a project workspace
- a home directory subfolder
- a small shared folder

Avoid using a very large mount, namespace, or broad storage root for the first validation run.

## After Your First Scan

After the first scan completes, use the console to confirm:

- the agent appears under `Agents`
- the scan appears under `Jobs`
- the scanned path matches your intended target
- the results in `Overview`, `Explore`, and `Activity` look reasonable

If anything looks off, reduce scope and rerun on a smaller target before expanding.

## Next Step

Continue with [Installing an Agent](installing-an-agent.md).
