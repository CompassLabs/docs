---
sidebar_position: 5
---

# Agents

The agent is an executing and learning entity in dojo’s framework. The agent interacts with the environment, receives observations and takes actions.  
`dojo` allows you to have multiple agents interacting at once.

Agents serve two main purposes in `dojo`.

1. **They impersonate you as a trading actor** E.g. they have a portfolio of tokens to work with, and they keep track of their own metrics.
2. **They define a reward function** This function defines how you measure the "success" of your policy. For example you might want to track your total wealth, or impermanent loss, etc.  
**Importantly**, if you use dojo to optimize a parameterized policy, the reward can be designed in combination with the policy such that the policy tries to maximize it's value.


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

Here is a basic demo for creating your own agent, you just need to implement your reward function!
```python
from dojo.agents import BaseAgent
from dojo.environments.uniswapV3 import UniV3Obs

class WealthAgent(BaseAgent):
    def __init__(self, initial_portfolio: Portfolio = {"USDC": 10_000}) -> None:
        super().__init__(initial_portfolio=initial_portfolio)

    def reward(obs: UniV3Obs) -> float:
        return self.wealth(obs.date)
```

---