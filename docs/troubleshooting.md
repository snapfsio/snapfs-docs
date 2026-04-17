# Troubleshooting

This page covers common early beta issues.

## Agent Does Not Appear In The Console

Check:

- gateway URL
- agent credentials
- network reachability between agent and gateway
- container or service logs

## Scan Completed But Results Look Wrong

Check the Job Details page for:

- issue count
- error summary
- scan error log
- root and target path

## Unexpected Creates Or Updates

Possible causes include:

- transient files that appear and disappear during the scan
- partial observations caused by hash-stage errors
- files rewritten by tools that replace content in place of editing directly

Use `Compare to Previous` and the change detail modal to inspect what SnapFS thinks changed.

## Missing Deletes

Deletes are inferred conservatively. If scan coverage is incomplete, delete reconciliation may be skipped to avoid false delete events.

## Duplicate Views Feel Heavy

For broad roots, narrow the scope first by drilling into a path before evaluating duplicates.

## Beta Guidance

If behavior looks suspicious:

- rerun a scan on a smaller root
- compare against the previous scan
- review scan issues and error logs
- capture the path and what you expected to see

That feedback is especially valuable during beta.
