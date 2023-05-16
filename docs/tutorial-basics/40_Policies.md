---
sidebar_position: 4
---

# Policies

How to implement a trading policy?

Before jumping into implementation deatails, let get a bit of terminology out of the way,


## Defining a policy
Policies are defined as classes in Dojo.  
Any policy you define needs to inherit from [dojo.policies.BasePolicy](TODO).

Your policy needs to implement the following method:
```python
    def predict(self, obs: Observation) -> Action:
            # price of asset x in units of asset y
```
This method takes the observations returned from the environment and derives some actions.
E.g. Your action could be to trade, once the price reaches some threshold



## Show me some code!
Let's consider a very basic policy. We define an upper and a lower spot-price. Once the price reaches that threshold, be convert all tokens to the currently lower value token.
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


:::note
Obviouly, this is not a great strategy and you can get a lot more creative/sophisticated. But we hope it's a good point to get you started.
:::
