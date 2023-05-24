---
sidebar_position: 6
---

# Policies


Policies implement the decision-making logic for how the associated agent should interact with the environment. This is where you can get creative by implementing your own strategy!

## Purpose
Policies generally provide the following functionality.

- Create actions which are processed by the environment to calculate the agent reward
- Optionally optimize model parameters to generate better actions

---
## Action Generation

Your policy needs to implement the following method:
```python
def predict(self, obs: BaseObs) -> List[BaseAction]:
```
This method takes the observations taken from the environment and derives some actions.

Let's consider a very basic policy. We define an upper and a lower spot-price. Once the price reaches that threshold, we convert all tokens to the currently lower-value token.
```python
class PriceWindowPolicy(BasePolicy):
    def __init__(self, agent: BaseAgent, lower_limit: float, upper_limit: float) -> None:
        super().__init__(agent=agent)
        self.upper_limit = upper_limit
        self.lower_limit = lower_limit

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

---

## Training

Additionally, this framework allows you to encode a paramter based model in your policy and optimize it in whatever way you want!!

Let's take the static policy above and try to find a way to tune the `upper_limit` and `lower_limit` parameters to get better performance. As a start, we might think that when volatily is high, the 'spread' between the limits should be further apart. Let's implement the simplest possible way of doing this:

```python
class DynamicPriceWindowPolicy(PriceWindowPolicy):
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

Now, in the simulation loop, we can simply call the policy `fit()` method to calculate the new price limits ✅


:::note
Obviouly, this is not a great strategy and you can get a lot more creative/sophisticated. But we hope it's a good point to get you started 🙂
:::
