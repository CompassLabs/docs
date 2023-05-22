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

## Observation
The `UniV3Obs` contains the following useful methods:
- `block: int`: current block of the simulation.
- `chain: str`: the chain the environment is running on.
- `date: datetime`: current date of the simulation.
- `pools: List[str]`: pool addresses included in the simulation.
- `pool_tokens(pool: str) -> Tuple[str, str]`: get the symbols of the tokens in a pool.
- `pool_positions(pool: str, owner: str, tick_lower: int, tick_upper: int) -> dict`: get the pool position of an owner in the specified tick range.
- `nft_positions(token_id: int) -> dict`: get the LP position data of an LP NFT.
- `get_tokens()`: get all the token symbols used in the environment.
- `get_quantities(pool: str, num_ticks: int) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]`: get the real quantities, virtual quantities, liquidities and lower ticks of a pool over `num_ticks` ticks. The active tick is given by `num_ticks // 2`.
- `get_price(self, token: str, unit: str, pool: str) -> float`: get the price of a token in a pool in the units of another token.
- `get_pool_fee(self, pool: str) -> float` get a pool's trade fee.
- `def get_protocol_fee(self, pool: str) -> np.ndarray` get a pool's protocol fee per token.

## Action
The `UniV3Action` contains the following parameters:
- `agent: BaseAgent`: the agent executing the transaction.
- `type: Union[str, UniV3EventType]`: the action type, if a string can be one of 'trade', 'quote', 'collect' or 'set_fee_protocol'.
- `pool: str`: pool address.
- `quantities: np.ndarray`: quantities of tokens in action.
- `tick_range: np.ndarray`: pool tick range of action, only needed for QUOTE and COLLECT.
- `owner: str`: owner in solidity event, only needed for QUOTE.

### Action Types
- **TRADE**
  - Trading one token for another token, without changing your invested liquidity
- **QUOTE**
  - Either providing or taking liquidity out of the pool
- **COLLECT**
  - Collect LP fees from an LP position
- **SET_FEE_PROTOCOL**
  - Set the protocol fee for the pool

## Show me the code!

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