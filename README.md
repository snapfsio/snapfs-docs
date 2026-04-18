# SnapFS Docs

SnapFS helps you scan storage roots, track file lifecycle changes, and explore what changed over time.

These docs are written for early beta users and focus on the fastest path to getting value:

- [Getting Started](docs/getting-started.md)
- [Beta Quickstart](docs/beta-quickstart.md)
- [Installing an Agent](docs/installing-an-agent.md)
- [Creating Schedules](docs/creating-schedules.md)
- [Running Your First Scan](docs/running-your-first-scan.md)
- [Exploring Results](docs/exploring-results.md)
- [Activity, Jobs, and History](docs/activity-jobs-and-history.md)
- [Managing Access](docs/managing-access.md)
- [Troubleshooting](docs/troubleshooting.md)

## Beta Guidance

For a first deployment:

- start with a smaller root
- confirm that the results match your expectations
- expand scope gradually
- use the Jobs and Activity pages to validate behavior before scanning very large namespaces

If you plan to grow toward tens of millions of files, start small first and use the initial scans to validate coverage, permissions, and runtime expectations.
