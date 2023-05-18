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
Environments generally provide the following functionallity.

- Move the simulation forward in time to the next block
- Provide observations, which serve as input for your policy. Observations in `dojo` are classes that proivde read methods to the protocol.
- Accept a list of actions, e.g. a trade, and execute them on the on-chain protocol

To get the definition of an enviroments observation and action, you can run
```python
from dojo.environments.uniswapV3 import UniV3Obs, UniV3Action
```
---
## Currently supported environments

### UniswapV3 environment
You can imort this enviroment as 
```python
from dojo.environments import UniV3Env
```

:::note
It is recommended to read the [whitepaper](https://uniswap.org/whitepaper-v3.pdf) if the concept of an automated market maker or conecentrated liquidity is unclear.
:::


#### Action Types
- **TRADE**
  - Trading one token for another token, without changing your invested liquidity
- **QUOTE**
  - Either providing or taking liquidity out of the pool
- **COLLECT**
  - Collect LP fees from an LP position
- **SET_FEE_PROTOCOL**
  - Set the protocol fee for the pool

#### Observations
The `UniV3Obs` contains the following useful methods:
- `block`: current block of the simulation.
- `chain`: the chain the environment is running on.
- `date`: current date of the simulation.
- `pools`: pool addresses included in the simulation.
- `pool_tokens(pool: str) -> Tuple[str, str]`: get the symbols of the tokens in a pool.
- `pool_positions(pool: str, owner: str, tick_lower: int, tick_upper: int) -> dict`: get the pool position of an owner in the specified tick range.
- `nft_positions(token_id: int) -> dict`: get the LP position data of an LP NFT.
- `get_tokens()`: get all the token symbols used in the environment.
- `get_quantities(pool: str, num_ticks: int) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]`: get the real quantities, virtual quantities, liquidities and lower ticks of a pool over `num_ticks` ticks. The active tick is given by `num_ticks // 2`.


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
from dojo.environments import UniV3Env


pools = ["0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"]  # WETH/USDC

env = UniV3Env(
    agents=[], #Of course, you'd want an agent here to actually do things
    pools=pools,
)
```