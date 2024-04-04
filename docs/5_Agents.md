---
sidebar_position: 5
---

# Agents

Agents serve two main purposes in `dojo`.

1. 🎥 **Metric tracking**. Each agent records the state of its cryptocurrency portfolio and other statistics at every block in the simulation.
2. 🥇 **Reward function**. This function defines how you measure the "success" of your policy. For example you might want to track your total wealth, or impermanent loss, etc. If you use dojo to **optimize a parameterized policy**, the reward can be designed in combination with the policy such that the policy tries to maximize it's value.


:::note
Agents are NOT responsible for making decisions on how to act in the environment. That is the job of the policies.
:::
---
## 🎥 In-built metrics tracking

The base class implements some pre-existing metrics tracking functionality:
- `quantity(token: str) -> float`: get the agent quantity of a token, can be either the address OR the symbol.
- `portfolio() -> Portfolio`: get the agent portfolio, e.g. `{"USDC": 1000, "ETH": 10, "UNI-V3-POS": 1}`.
- `erc20_portfolio() -> Portfolio`: get the agent portfolio of ERC20 tokens, e.g. `{USDC: 1000}`.
- `erc721_portfolio() -> Dict[str, list]`: get the agent portfolio of ERC721 NFTs, e.g. `{"UNI-V3-POS": [251300]}`.
- `done() -> bool`: get whether the agent is done or not, defaults to done if the agent goes broke.
- `reward(obs: BaseObs) -> float`: user defined reward metric
---
## 🧑‍💻 Creating your own agent

Here is a basic demo for creating your own agent, you just need to implement your reward function!
```python
from decimal import Decimal
from dojo.agents import BaseAgent
from dojo.environments.uniswapV3 import UniV3Obs

class ETHAgent(BaseAgent):
    def __init__(self, initial_portfolio: Portfolio = {"ETH": Decimal(10), "USDC": Decimal(10_000)}) -> None:
        super().__init__(initial_portfolio=initial_portfolio)

    def reward(obs: UniV3Obs) -> float:
        return float(self.quantity("ETH"))
```

---