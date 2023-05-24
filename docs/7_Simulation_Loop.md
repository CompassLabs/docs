---
sidebar_position: 7
---

# Simulation Loop

And to end, putting everything together in a simulation loop.

![sim-loop](./.tutorial-extras/img/dojo-loop.png)

The basic pattern is pretty simple:
- the envrionment provides the simulation steps and emits the observation and agent rewards
- the policy processes the observation and returns actions, e.g. trades
- the environment executes the actions and the cycle repeats

We are keeping track of the rewards for anylysis purposes. If you want a reminder on some of the concepts here, take a longer peek at the [environment](./environments/UniswapV3#show-me-the-code), the [agent](./Agents#creating-your-own-agent) or the [policy](./Policies#training) as you see fit 🙂

```python
import logging
# You can adjust the log level to different granularities
logging.basicConfig(format="%(asctime)s - %(message)s", level=20)

sim_start = datetime(2023, 1, 1)
sim_end = datetime(2023, 1, 2)

demo_agent = WealthAgent(initial_portfolio={"USDC": 10_000})
env = UniV3Env(
    agents=[demo_agent],
    date_range=(sim_start, sim_end)
    pools=["0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"],
    market_impact="replay", # "replay" by default, to replay history
)
policy = DynamicPriceWindowPolicy(
    agent=demo_agent, lower_limit=2000, upper_limit=2500
)

blocks=[]
rewards=[]
obs = env.reset()
for block in env.iter_block():
    policy.fit(obs) # train dynamic policy
    policy_actions = policy.predict(obs)
    market_actions = env.market_actions(policy_actions)
    actions = policy_actions + market_actions # control over action ordering
    obs, rewards, dones, infos = env.step(actions=actions)

    blocks.append(block)
    rewards.append(reward)

plt.plot(blocks, rewards)
```

Th resulting plot looks like this  
![](/img/results.png)


<a href={ require("/img/results.png").default }>Download the full script here</a>