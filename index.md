---
title: SnapFS Docs
lede: SnapFS helps you scan storage roots, track file lifecycle changes, and explore what changed over time.
---

These docs are written for early beta users and focus on the fastest path to getting value.

## Documentation

- [Getting Started]({{ '/docs/getting-started/' | relative_url }})
- [Beta Quickstart]({{ '/docs/beta-quickstart/' | relative_url }})
- [Installing an Agent]({{ '/docs/installing-an-agent/' | relative_url }})
- [Benchmarking SnapFS]({{ '/docs/benchmarking/' | relative_url }})
- [Creating Schedules]({{ '/docs/creating-schedules/' | relative_url }})
- [Running Your First Scan]({{ '/docs/running-your-first-scan/' | relative_url }})
- [Exploring Results]({{ '/docs/exploring-results/' | relative_url }})
- [Activity, Jobs, and History]({{ '/docs/activity-jobs-and-history/' | relative_url }})
- [Managing Access]({{ '/docs/managing-access/' | relative_url }})
- [Troubleshooting]({{ '/docs/troubleshooting/' | relative_url }})

## Beta Guidance

For a first deployment:

- start with a smaller root
- confirm that the results match your expectations
- expand scope gradually
- use the `Jobs` and `Activity` pages to validate behavior before scanning very large namespaces

If you plan to grow toward tens of millions of files, start small first and use the initial scans to validate coverage, permissions, and runtime expectations.

![Overview]({{ '/screenshots/overview.png' | relative_url }})
