---
sidebar_position: 5
---

# Agents

Agents serve two main purposes in `dojo`.

1. **They define a reward function** This function defined how you measure "success" in your trading endeavours. For example you might want to track your total wealth. Or you might want to track impermanent loss.  
**Importantly**, if you use dojo to optimize a parameterized policy, the policy is optimized with regards to your reward.
2. **They impersonate you as a trading actor** E.g. they have a portfolio of tokens to work with, and they keep track of their own metrics.

:::note

Agents are NOT responsible for making decisions on how to act in the environment. That is the job of the Policies.

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

class WealthAgent(BaseAgent):
    def __init__(initial_portfolio: Portfolio = {"USDC": 10_000}) -> None:
        super().__init__(initial_portfolio=initial_portfolio)

    def reward(obs: UniV3Obs) -> float:
        return self.wealth(obs.date)
```

---