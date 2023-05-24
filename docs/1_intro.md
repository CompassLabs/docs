---
sidebar_position: 1
---

# Intro to dojo

:::success Do you want to ...

- Test your existing DeFi strategies?
- Optimize or train a new DeFi strategy?
- Stress test your new DeFi smart contracts?

:::

[Compass Labs](https://compasslabs.ai/) has developed `dojo`, an agent-based DeFi simulation software with the goal of minimizing the [sim2real gap](https://developer.nvidia.com/blog/closing-the-sim2real-gap-with-nvidia-isaac-sim-and-nvidia-isaac-replicator/).


## Features
### Runs at smart-contract level ✅
   - Dojo forks the actual blockchain and runs on the same smart contracts that would be run in real life.
   - This eliminates concerns about bugs in the model or missed assumptions about the protocol, and enables capturing micro-effects that impact simulation results, such as precision and rounding.
 
### Runs locally on your machine ✅
   - Dojo operates fully on your local machine.
   - There is no sharing of information about your strategies or simulations with us or any other party.
 
### Simple Python interface ✅
   - Dojo’s interface allows full experimentation with strategies using Python.
   - Take advantage of Python's ecosystem with packages like numpy, numpyro, or jax.
 
### Access to on-chain and CEX data ✅
   - Dojo sources its own on-chain data for integrated DeFi protocols.
   - Dojo enables data ingestion of CEX price data sourced from Binance.
 
### Transaction ordering ✅
   - Directly edit the order of transaction execution for simulating various MEV scenarios.

___
## Upcoming 
### Market impact model 👀
Simulate the market's response to your agent actions. With support from Senior Fellows at the Alan Turing Institute, Imperial College London, and the Oxford MAN Institute, dojo will include more complex market scenario models.
### MEV models 👀
Simulate block inclusion probability and transaction ordering
### Multi protocol/chain simulations 👀
 Conduct simulations across multiple protocols and chains simultaneously.
### Execution Environment 👀
Transfer your strategy from the Dojo fork to mainnet without any modifications, since Dojo runs at the smart contract level. 

___
## Protocol integrations
Dojo currently integrates with **UniswapV3** on Ethereum. We are planning on adding BalancerV2 protocol and the Polygon chain next!  
If you want your chain or protocol to be integrated with Dojo, reach out! 
