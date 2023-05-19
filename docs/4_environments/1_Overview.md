---
sidebar_position: 1
---

# Overview

Enviroments in `dojo` are reprensentations of different DeFi exchanges/protocols agents can interact with.
We currently support
- [UniswapV3](./UniswapV3)
- [BalancerV2](./BalancerV2)

## Purpose
Environments generally provide the following functionallity.

- Move the simulation forward in time to the next block
- Emit observations and agent rewards which can be processed by the policies
- Accept a list of actions, e.g. a trade, and execute them on the on-chain protocol

Each environmnet module contains information on the observations, actions and environment object for that environment. For example, to get this information for UniswapV3:
```python
from dojo.environments.uniswapV3 import UniV3Obs, UniV3Action, UniV3Env
```

## Market Impact

Market impact describes how your policy actions will affect the behaviour of the other agents in the simulation. Each environment in `dojo` allows you to select different market impact models for your simulation. 

By default, the simulation will simply replay the historical actions as close as possible whilst ensuring no transactions revert.
