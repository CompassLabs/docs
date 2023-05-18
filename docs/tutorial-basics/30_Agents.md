---
sidebar_position: 3
---

# Agents

An intro to `dojo` agents.

## Overview

Agents represent the state of the various agents interacting with the environment within the `dojo` simulation

## Purpose
Agents generally provide the following functionallity.

- Metrics tracking (e.g. tracking the agent portoflio)
- Reward definition

:::note

Agents are NOT responsible for making decisions on how to act in the environment.

:::
---
## In-built metrics tracking

The base class implements some pre-existing metrics tracking functionality:
- `quantity(token: str) -> float`: get the agent quantity of a token, can be either the address OR the symbol.
- `portfolio() -> Portfolio`: get the agent portfolio, e.g. `{"USDC": 1000, "ETH": 10, "UNI-V3-POS": 1}`.
- `erc20_portfolio() -> Portfolio`: get the agent portfolio of ERC20 tokens, e.g. `{USDC: 1000}`.
- `erc721_portfolio() -> Dict[str, list]`: get the agent portfolio of ERC721 NFTs, e.g. `{"UNI-V3-POS": [251300]}`.
- `done() -> bool`: get whether the agent is done or not, defaults to done if the agent goes broke.
- `wealth(date: datetime) -> float`: get the agent wealth in $ (based on Binance).
- `erc20_wealth(date: datetime) -> float`: get the agent wealth of ERC20 tokens owned in $ (based on Binance).
- `reward(obs: BaseObs) -> float`: user defined reward metric
---
## Creating your own agent

Here is a super basic demo for creating your own agent, you just need to implement your reward function!
```python
from dojo.agents import BaseAgent
from dojo.environments.uniswapV3 import UniV3Obs

class TutorialUniV3Agent(BaseAgent):
    def __init__(initial_portfolio: Portfolio = {"USDC": 10_000}) -> None:
        super().__init__(initial_portfolio=initial_portfolio)

    def reward(obs: UniV3Obs) -> float:
        if self.wealth(obs.date) > 10_000:
            return 1
        else:
            return -1
```

---