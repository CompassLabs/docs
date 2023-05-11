---
sidebar_position: 1
slug: basics
title: Basic Concepts
---


A quick overview of how Dojo works.


## Local simulations
Dojo aims to simulate your trading strategys as realisticly as possible, minimizing the [simulation gap](https://www.TODO.com).  
To do so, dojo creates forks of the actual blockchain. Simulations are run on the fork and all simulated trades are submitted to it.  
This means that e.g. simulated UniswapV3 transactions are executed by the actual Uniswap contract code. We can thus capture effects such as TODO and TODO.

:::note
Dojo runs **fully locally** on your machine. No information about your strategies or simulations is shared with us. (Or with anyone else for that matter).
:::


## Agents
Dojo is written as an [agent based framework](https://en.wikipedia.org/wiki/Agent-based_model).  
You can have multiple agents following multiple different strategys at any given time.  
The agents interact with environments to sumbit trades.

<img src="./img/AE_loop_light.png" alt="docusaurus mascot" width="60%"/>

:::tip

The general structure of Dojo is heavily inspired by OpenAI's gymnasium. Check out the [docs](https://gymnasium.farama.org/content/basic_usage/).

:::

See [here](./agents) for more details.


## Environments
In the context of Dojo, environments are DeFi exchanges.
The enviroment provides observations such as, TODO or TODO to the agent.
At any point can the agent decide to submit transactions to the environement which will then be executed in the current block.

See [here](./environments) for more details.

## Observations
Observations are measures of an environments state that the agent can base it's desicions on.
For example, on UniSwapV3, this could be the current trading price, or the total liquidity in the pool.

See [here](./observations) for more details.

## Policies
This is where you can get creative. It is where your trading policies are implemented.  
For example, a basic policy could be to passively provide liquidity to the active tick range.


See [here](./policies) for more details.

