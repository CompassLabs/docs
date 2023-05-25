---
sidebar_position: 6
---

# Policies


The agent follows "policies" to make decisions.  

The policy defines the mapping from the environment-observations to the actions that are being taken.  
Within `dojo`, **the *policy* can be referred to as the *agent’s DeFi strategy***. This is where you can get creative by implementing your own strategy!


## Purpose
Policies generally provide the following functionality.

- **"Predict"**
  When you’re **testing** your DeFi strategy, the agent provides you with a user-defined metric, tracking how well you are doing at each step.  
- **"Fit"**
  If you’re interested in **training** your DeFi strategy, the agent tracks the same metric as above, but then keeps tweaking your model parameters until it finds the optimal setting.



## Strategy Implementation
To test out your own DeFi strategy, all you need to do is implement the `predict` method.   
It takes the observations from the environment as input and returns a list of actions as output.  



### Example 1: Test your DeFi strategy! 
In this example, we consider a basic policy for trading on UniswapV3, where we define an *upper and lower spot-price* and once the price reaches the upper or lower limit, all tokens are converted to the currently lower value token: 

<details><summary>Click to see the code</summary>
<p>

```python
class PriceWindowPolicy(BasePolicy):
    def __init__(self, agent: BaseAgent, lower_limit: float, upper_limit: float) -> None:
        super().__init__(agent=agent)
        self.upper_limit = upper_limit
        self.lower_limit = lower_limit

    # derive actions from observations
    def predict(self, obs: UniV3Obs) -> List[UniV3Action]:
        pool = obs.pools[0]
        x_token, y_token = obs.pool_tokens(pool)
        spot_price = obs.get_price(
            token=x_token, unit=y_token, pool=pool
        )

        if spot_price>self.upper_limit:
            y_quantity = self.agent.quantity(y_token)
            action = UniV3Action(
                agent=self.agent
                type="trade",
                pool=pool,
                quantities=np.array([0, y_quantity])
            )
            return [action]

        if spot_price<self.lower_limit:
            x_quantity = self.agent.quantity(x_token)
            action = self.env.make_action(
                event_type="trade",
                pool=self.pool,
                quantities=np.array([x_quantity, 0])
            )
            return [action]

        return []
```

</p>
</details>

### Example 2: Train your DeFi strategy! 
If you want to take it one step further, dojo allows you to encode a parameteric model in your policy and optimize it however you want!   
To show you how, we take the static policy from Example 1 but let you train your strategy to tune the upper and lower limit parameter to improve the performance of your strategy.

To start with, we might think that when volatility is high, the spread between limits should be further apart. Let’s implement the simplest way of doing this: 

<details><summary>Click to see the code</summary>
<p>

```python
class DynamicPriceWindowPolicy(PriceWindowPolicy):

    # upper and lower limit are now parameters of the policy
    def __init__(self, agent: BaseAgent, lower_limit: float, upper_limit: float) -> None:
        super().__init__(agent=agent, lower_limit=lower_limit, upper_limit=upper_limit)
        self.old_price = 0
        self.spread = self.upper_limit - self.lower_limit
        self.center = (self.upper_limit + self.lower_limit) / 2
        self.returns = []

    def fit(self, obs: UniV3Obs) -> None:
        pool = obs.pools[0]
        x_token, y_token = obs.pool_tokens(pool)
        spot_price = obs.get_price(
            token=x_token, unit=y_token, pool=pool
        )
        if len(self.returns) == 0:
            self.old_price = spot_price

        new_return = spot_price / old_price
        returns.append(new_return)
        vol = np.std(self.returns)
        self.vols.append(vol)
        vol_diff = vol / np.mean(self.vols)
        self.spread = self.spread * vol_diff
        self.lower_limit = max(0, self.center - (self.spread / 2))
        self.upper_limit = self.center + (self.spread / 2)
```

</p>
</details>





**Note:** These are just examples of testing and training policies to get you started. You can get a lot more creative and sophisticated! 













