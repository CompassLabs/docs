---
sidebar_position: 2
---

# UniswapV3
You can imort this enviroment as 
```python
from dojo.environments import UniV3Env
```

:::tip
It is recommended to read the [whitepaper](https://uniswap.org/whitepaper-v3.pdf) if the concept of an automated market maker or conecentrated liquidity is unclear.
:::

## Observations
Since UniswapV3 is based on tick ranges, many observations are on a per tick basis.  

**Please refer to the [code reference](https://readthedocs.compasslabs.ai/dojo.environments.html#dojo.environments.uniswapV3.UniV3Obs) for more details.**

## Actions

In general, there are 3 actions you can perform on the Uniswap V3 environment:

- **TRADE**
  - Trading one token for another token, without changing your invested liquidity
- **QUOTE**
  - Either providing or taking liquidity out of the pool
- **COLLECT**
  - Collect LP fees from an LP position
- **SET_FEE_PROTOCOL**
  - Set the protocol fee for the pool

Please refer to the [code reference](https://readthedocs.compasslabs.ai/dojo.environments.html#dojo.environments.uniswapV3.UniV3Action) for more details.

___
## Show me some code!

```python
import numpy as np
from dojo.environments.uniswapV3 import UniV3Env, UniV3Action
from datetime import datetime


pools = ["0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"]  # WETH/USDC
sim_start = datetime(2023, 1, 1)
sim_end = datetime(2023, 1, 2)

env = UniV3Env(
    agents=[], #Of course, you'd want an agent here to actually do things
    date_range=(sim_start, sim_end)
    pools=pools,
    market_impact_model=None, # defaults to None, simply replaying history
)

obs = env.obs

trade = UniV3Action(
  agent=...,
  type="trade",
  pool=obs.pools[0],
  quantities=np.ndarray([0, 1]), # one of the entries should be 0 for a trade
)

quote = UniV3Action(
  agent=...,
  type="quote",
  pool=obs.pools[0],
  quantities=np.ndarray([1, 1]), # mints if both quantities are positive, burns if both are negative
  tick_range=np.ndarray([200000, 205000]),
  owner="<QUOTE EVENT OWNER>",
)

collect = UniV3Action(
  agent=...,
  type="collect",
  pool=obs.pools[0],
  quantities=np.ndarray([1, 1]),
)

set_fee_protocol = UniV3Action(
  agent=...,
  type="set_fee_protocol",
  pool=obs.pools[0],
  quantities=np.ndarray([0.1, 0.1]),
  tick_range=np.ndarray([200000, 205000]),
)
```