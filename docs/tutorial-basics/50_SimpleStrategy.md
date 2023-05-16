---
sidebar_position: 5
---

# Testing a basic strategy

An end to end example. Putting it all together.



## **Step 1:** Imports and definitions
Let's get the boring stuff out of the way and import all relevant libraries.
Notice that you can adjust the log level to different granularities.

```python
import logging
from argparse import ArgumentParser
from datetime import datetime

from demo.policies import MovingAveragePolicy, PassiveConcentratedLPPolicy
from dojo.buffers import DictSeqBuffer
from dojo.environments import UniV3Env
from dojo.network import chain_utils
from dojo.policies import UniV3ReplayPolicy

from matplotlib import pyplot as plt

logging.basicConfig(format="%(asctime)s - %(message)s", level=20)
```



## **Step 2:** Define the simulation environment
The central piece of a Dojo simulation run is the Environment.
In this example, we are using UniswapV3, and the "WETH/USDC 0.01" pool.
We do not use a [market_impact_model](TODO) and we are measuring rewards in terms of total_wealth.
```
env = UniV3Env(
    mode="replay",
    starttime=datetime(2023, 1, 1, 1),
    endtime=datetime(2023, 1, 1, 11),
    pools=[UniV3Env.Pools['WETH/USDC-0.01']],
    num_ticks=1,
    marekt_impact_model="None", # "None" by default, can also be "arbitrage or others
    reward_fn="total_wealth" # can also be dollar_pnl"| "pnl" or others
)
```

## **Step 3:** Define your policy
Let's use our basic window function policy from [before](TODO).
```python
class BasicSpotPriceWindowPolicy(BasePolicy):

    def __init__(self, env: BalancerV2Env, lower_limit: float, upper_limit: float) -> None:
        super().__init__(agent=agent)
        self.env: BalancerV2Env = env
        self.upper_limit = upper_limit
        self.lower_limit = lower_limit

    def predict(self, obs: Observation) -> Action:
        # price of asset x in units of asset y
        spot_price = obs["virtual_quantities"][0][0][1] / obs["virtual_quantities"][0][0][0]

        if spot_price>self.upper_limit:
            return self.env.make_action(
                    event_type="trade",
                    pool=self.pool,
                    quantities=np.array([0, y_quantity]))

        if spot_price<self.lower_limit:
            return self.env.make_action(
                    event_type="trade",
                    pool=self.pool,
                    quantities=np.array([x_quantity, 0]))
        return ()
```


## **Step 4:** Run the simulation

Now, with everything in place, let's run the simulation.  
The basic pattern is pretty simple
- the envrionment provides the simulation steps and returns observation
- the policy reacts to the observations with actions, e.g. trades
- the environment executes the actions and the cycle repeats

We are keeping track of the rewards for anylysis purposes.

```python
policy = MovingAveragePolicy(
    env=env, short_window=20, long_window=50
)

blocktimes=[]
rewards=[]
for block in env.iter_block(batch_size=0):
    action = policy.predict(obs)
    next_obs, reward, done, info = env.step(action=action)
    blocktimes.append(block.timestamp)
    rewards.append(reward)

plt.plot(blocktimes,rewards)
```

Th resulting plot looks like this  
![](/img/results.png)


<a href={ require("/img/results.png").default }>Download the full script here</a>