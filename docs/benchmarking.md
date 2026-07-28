---
title: Benchmarking SnapFS
lede: Run lightweight local benchmarks, compare hash algorithms, and interpret the results before tuning scanner defaults.
doc_class: benchmark-doc
---

# Benchmarking SnapFS

This page is for beta users who want to measure local scan performance before
choosing scanner settings for a host.

The goal is not to produce one universal score. The goal is to compare:

- one host against itself
- small-file behavior against large-file behavior
- one hash algorithm against another
- cold-path runs against warmed or repeated runs

## When To Benchmark

Benchmarking is especially useful when:

- scan performance matters for a production agent host
- you want to compare `xxh64` against the SHA-based defaults
- you want to compare worker counts on a real dataset
- your storage path may be the bottleneck and you want to confirm that

## Install Benchmark Support

If you are benchmarking on Linux and plan to run a long-lived agent, the normal
bootstrap installer already includes `xxhash` support by default:

```bash
curl -fsSL https://raw.githubusercontent.com/snapfsio/snapfs/master/install.sh | bash
```

If you only want the package and CLI tools, at minimum install SnapFS:

```bash
python3 -m pip install -U snapfs
```

If you are managing the Python environment yourself and performance matters on
that host, prefer installing with `xxhash` support so you can benchmark
`xxh64` as well:

```bash
python3 -m pip install -U 'snapfs[xxhash]'
```

`xxh64` is often much faster on many-small-file, warm-cache, or CPU-limited
scan workloads.

## Benchmark Shape

For useful results, benchmark at least two dataset shapes:

- a small-file tree with many files
- a large-file tree with relatively few files

Those two shapes often behave very differently.

Small-file runs tend to emphasize:

- per-file overhead
- metadata walking cost
- scheduling overhead
- hash CPU cost

Large-file runs tend to emphasize:

- storage throughput
- read-ahead behavior
- whether the scan is I/O-bound instead of hash-bound

## Benchmark Tools

The public package includes the `snapfs` CLI, but the local benchmark helper
currently lives in the public repository:

[`https://github.com/snapfsio/snapfs`](https://github.com/snapfsio/snapfs)

Clone the repo when you want to use the bundled benchmark scripts:

```bash
git clone --depth 1 https://github.com/snapfsio/snapfs
cd snapfs
```

The repo includes:

- `scripts/bench_scan.py` for direct local scan-engine benchmarks
- `scripts/example_benchmark_matrix.json` as a sample matrix to copy and edit
- `scripts/run_benchmarks.py` to expand and execute a local benchmark suite

## Quick Commands

Benchmark a single dataset directly:

```bash
python3 scripts/bench_scan.py /path/to/tree --force --workers 4 --algo sha1
python3 scripts/bench_scan.py /path/to/tree --force --workers 4 --algo xxh64
```

Run the matrix runner:

```bash
mkdir -p /tmp/snapfs-bench
cp scripts/example_benchmark_matrix.json /tmp/snapfs-bench/benchmark_matrix.json
$EDITOR /tmp/snapfs-bench/benchmark_matrix.json
cd /tmp/snapfs-bench
python3 /path/to/snapfs/scripts/run_benchmarks.py
```

The matrix runner looks for `./benchmark_matrix.json` in the current working
directory by default.

## Example Results

Representative example:

| Dataset | Tool | Mode | Algo | Workers | Files | Bytes | Elapsed s | MiB/s | Files/s | Repeat | Notes |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| small-files | snapfs | force | sha1 | 4 | 717 | 0.69 GiB | 0.813 | 872.5 | 881.827 | 2 | warmed run |
| small-files | snapfs | force | xxh64 | 4 | 717 | 0.69 GiB | 0.319 | 2223.5 | 2249.476 | 1 | warmed run |
| large-files | snapfs | force | sha1 | 4 | 129 | 27.20 GiB | 258.104 | 107.9 | 0.500 | 2 | storage-limited |
| large-files | snapfs | force | xxh64 | 4 | 129 | 27.20 GiB | 256.301 | 108.7 | 0.503 | 3 | storage-limited |

This is a common pattern:

- `xxh64` is clearly faster on the small-file workload
- the large-file workload stays near the same MiB/s

That usually means:

- small-file performance is meaningfully affected by hash cost
- large-file performance is limited by the storage path, not the hash algorithm

## How To Choose A Hash Algorithm

Current SnapFS options:

- `sha1`: the current default
- `xxh64`: available when `xxhash` is installed
- `sha256`: supported when you want a SHA-256 hash specifically

Practical guidance:

- use `sha1` if you want the current default behavior and have not benchmarked yet
- try `xxh64` first when host throughput matters and `xxhash` is available
- use `sha256` when you specifically want SHA-256, even if it may cost more CPU

## Interpreting Results

A few patterns to watch for:

- if `xxh64` is much faster than `sha1` or `sha256`, hashing cost matters on that host
- if `xxh64` and SHA-based runs are almost identical on large files, the storage path is probably the bottleneck
- if the first run is much slower than later runs, page cache or remote-storage warmup is probably affecting the result
- if worker count helps small files only a little, you may be dominated by metadata or scheduling overhead instead of hashing

Be careful with:

- NFS
- SMB/CIFS
- FUSE mounts
- overlay or merger filesystems

Those can make first-read results much less stable than warmed runs.

## Next Step

After benchmarking, you can keep the current default settings or tune a host
more aggressively:

- install `xxhash` and use `xxh64`
- increase worker count
- re-run the systemd installer with the same scanner name to update an existing agent

For the agent install flow, continue with [Installing an Agent](installing-an-agent.md).
