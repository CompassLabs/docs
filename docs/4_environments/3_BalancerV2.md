---
sidebar_position: 3
---

# BalancerV2
TODO

## Observations

- `quantities`:  The real quantities for each token within each tick of every pool.
- `pool_fees`: The fees for all pools in the environment, represented as a number between `0.0` and `1.0`, e.g `[0.05, 0.01]`
- `protocol_fee`: TODO

## Actions
- **TRADE**
  - Trading one token for another token, without changing your invested liquidity
- **QUOTE**
  - Either providing or taking liquidity out of the pool
