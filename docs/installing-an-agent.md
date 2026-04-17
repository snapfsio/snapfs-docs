# Installing an Agent

A SnapFS scanner agent is responsible for walking a filesystem root and publishing scan events.

## Before You Install

Make sure you know:

- the gateway URL (e.g. https://example.snapfs.com)
- the root path you want this agent to scan (e.g. `/mnt/data`)
- API keys (see [Managing Access](managing-access.md))

## Install The Package

The canonical install instructions live in the public `snapfsio/snapfs` repository. This docs repo is meant to stay lightweight and user-focused, so for package installation and service setup we point back to the main project repo:

- Repository: `https://github.com/snapfsio/snapfs`
- Systemd install guide: `https://github.com/snapfsio/snapfs/blob/master/README.md#install-the-systemd-agent`

For most Linux hosts, the quick start is:

```bash
pip install -U snapfs
```

If you are installing the long-running agent service, follow the `install.sh` / systemd instructions in the main repo after installing the package.

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
