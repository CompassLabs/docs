---
sidebar_position: 2
---

# Environments

And intro into simulation environments.

## Overview

Enviroments in Dojo are reprensentations of different DeFi exchanges/protocols agents can interact with.
We currently support
- [UniswapV3](#uniswapv3-environment)
- [BalancerV2](#balancerv3-environment)

## Functions
Environments genreally provide the following functionallity.

- Move the simulation forward in time/to the next block
- Provide [observations](./basics#observations) which serve as input for your policy
- Accept a list of actions, e.g. a trade, and execute them on the simulated exchange.

To get the definition of an enviroments observation space, you can run
```python
from dojo.environments import UniV3Env
UniV3Env.obhservation_space
```
---
## Currently supported environments

### UniswapV3 environment
You can imort this enviroment as 
```python
from dojo.environments import UniV3Env
```

:::note
UniswapV3 incorporates the concpet of [concentrated liquidity](TODO). In short, it means you can provide liquidity within certain price ranges, indicated via "ticks" `i`, where
$$
p(i) = 1.0001^i
$$
:::

All actions and observations are per tick-range in this environment.



#### Actions
- **TRADE**
  - Trading one token for another token, without changing your invested liquidity
- **QUOTE**
  - Either providing or taking liquidity out of the pool

#### Observations
The observations space of UniswapV3 contains the following variables
- `real_quantities`: The real[^1] quantities for each token within each tick of every pool.
- `virtual_quantities`: The virtual[^1] quantities for each token within each tick of every pool.
- `lower_ticks`: For each pool, gives the lower boundaries of tick ranges. e.g. []  Ticks are spaced such that an increase or decrease of 1 tick represents a 0.01% increase or decrease in price at any point in price space.
- `pool_fees`: The fees for all pools in the environment, represented as a number between `0.0` and `1.0`, e.g `[0.05, 0.01]`
- `protocol_fees`: TODO

[^1]: See here for the difference between real and virtual quantities.

---
### BalancerV2 enviroment


#### Actions
- **TRADE**
  - Trading one token for another token, without changing your invested liquidity
- **QUOTE**
  - Either providing or taking liquidity out of the pool

#### Observations

- `quantities`:  The real quantities for each token within each tick of every pool.
- `pool_fees`: The fees for all pools in the environment, represented as a number between `0.0` and `1.0`, e.g `[0.05, 0.01]`
- `protocol_fee`: TODO

---
## Show me some code!
Here's how to instatiate a UniswapV3 environment
```python
from demo.agents import WealthAgent
from dojo.environments import UniV3Env
pools = ["0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"]  # WETH/USDC

env = UniV3Env(
    agents=[], #Of course, you'd want an agent here to actually do things
    agent_params=agent_params,
    pools=pools,
    num_ticks=1,
)
```