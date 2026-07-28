---
title: Installing an Agent
lede: Install a SnapFS scanner agent, point it at the right root, and confirm it appears in the console.
---

# Installing an Agent

A SnapFS scanner agent is responsible for walking a filesystem root and publishing scan events.

## Platform Support

Today, the supported packaged agent setup path is Linux.

On macOS, you can still run the agent directly after installing the package, but
the packaged Linux `systemd` setup does not apply.

Windows agent install guidance and install scripts are coming soon. If you are
on Windows today, you can continue with one-off CLI scans, or you can wire up
the agent manually if you are comfortable with a DIY setup.

## Before You Install

Make sure you know:

- the gateway URL (e.g. https://example.snapfs.com)
- the root path you want this agent to scan (e.g. `/mnt/data`)
- API keys (see [Managing Access](managing-access.md))

## Install The Agent

If you are installing the long-running agent service on Linux, the preferred
flow is the bootstrap installer:

```bash
curl -fsSL https://raw.githubusercontent.com/snapfsio/snapfs/master/install.sh | bash
```

That bootstrap flow verifies `python3`, prepares the managed SnapFS runtime,
and then launches the Linux `systemd` installer for scanner-specific
configuration.

The bootstrap installer and lower-level Linux install details live in the
public `snapfsio/snapfs` repository:

[`https://github.com/snapfsio/snapfs`](https://github.com/snapfsio/snapfs)

If you prefer to review the installer locally first, the repo-based fallback is:

```bash
git clone https://github.com/snapfsio/snapfs
cd snapfs
./install.sh
```

## Advanced Install Options

If you prefer to manage the Python environment yourself, the manual package
install remains available:

```bash
python3 -m pip install -U snapfs
```

If agent scan performance matters on that host, install the optional `xxhash`
support as well:

```bash
python3 -m pip install -U 'snapfs[xxhash]'
```

That enables the faster `xxh64` hash algorithm. It is often a good fit for
performance-sensitive scanner hosts, especially when scanning many small files
or repeating warm-cache scans.

If you are managing the Python environment and service wiring yourself, the
manual Linux installer path remains available:

```bash
python3 -m pip install -U 'snapfs[xxhash]'
git clone --depth 1 https://github.com/snapfsio/snapfs
cd snapfs
./systemd/install.sh
```

During `systemd` setup, if you installed `xxhash`, consider setting the agent
hash algorithm to `xxh64`. You can also re-run the installer later with the
same scanner name to update the hash algorithm or worker count on an existing
agent.

For fuller Linux install and service-management details, see the install and
systemd docs in the SnapFS client repo:

- [`docs/install.md`](https://github.com/snapfsio/snapfs/blob/master/docs/install.md)
- [`docs/systemd.md`](https://github.com/snapfsio/snapfs/blob/master/docs/systemd.md)

## Agent Root Paths

Each scanner agent has a configured root path.

Examples:

- `/mnt/projects`
- `/data/io`

Schedules and manual scans should stay within that root.

## Confirm The Agent Is Connected

After installation, open the console and check the `Agents` page.

You should see:

- the agent id
- connection status
- the configured root path

![Agents](../screenshots/agents.png)

If the agent is connected and idle, you are ready to create a schedule.

## Next Step

Continue with [Creating Schedules](creating-schedules.md).
