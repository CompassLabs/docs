---
sidebar_position: 3
---

# BalancerV2
You can imort this enviroment as 
```python
from dojo.environments import BalV2Env
```


:::tip
It is recommended to read the [whitepaper](https://balancer.fi/whitepaper.pdf) if the concepts of the Balancer V2 exchange are unclear.
:::

## Observations

- `quantities`:  The real quantities for each token within each tick of every pool.
- `pool_fees`: The fees for all pools in the environment, represented as a number between `0.0` and `1.0`, e.g `[0.05, 0.01]`
- `protocol_fee`: TODO

**Please refer to the [code reference](https://readthedocs.compasslabs.ai/dojo.environments.html#dojo.environments.balancerV2.BalV2Obs) for more details.**

## Actions
In general, there are 3 actions you can perform on the Balancer V2 environment:

- **TRADE**
  - Trading one token for another token, without changing your invested liquidity
- **QUOTE**
  - Either providing or taking liquidity out of the pool


**Please refer to the [code reference](https://readthedocs.compasslabs.ai/dojo.environments.html#dojo.environments.balancerV2.BalV2Action) for more details.**



___
## Show me some code!

```python
import numpy as np
from dojo.environments.uniswapV3 import UniV3Env, UniV3Action
from datetime import datetime


TODO
```
