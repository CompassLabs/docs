---
sidebar_position: 7
---

import ImgGeneral from '../static/img/env4.png';
import CodeBlock from '../src/components/CodeBlock';

# Simulation Loop

The simulation loop in dojo brings everything together through an iterative process on a **per block basis**.  
At each step, the agent interacts with the environment by taking actions, receiving observations and rewards, and updating the agent & environment state. 

<img src={ImgGeneral} alt="aasd" width="40%" />


**This is the basic pattern of the simulation loop:**

<!-- <details><summary> 1. <b>Resetting</b> the environment to its initial state and returning the initial observation </summary><p>

```python
print("hello world!")
```
</p></details> -->






1. Firstly, the environment emits an initial observation to the agent, which represents the state of the  environment.
2. Then the agent takes in the observations and makes desicions based on its policy. It also computes it's reward based on observations.
3. If you are testing your strategy, this reward is simply a way of measuring your strategy performance
4. If you are training your strategy, the agent takes the reward function to optimize parameters based on the state-action-reward transition.
5. The environment executed the actions and moved forward in time to the next block
6. At each step in the loop, a termination condition is checked. This condition could be a terminal state, in this case, for example when the agent runs out of money. 
7. The simulation loop keeps repeating this cycle until a predefined stopping condition is met. 




If you want a reminder on some of the concepts here, take a longer peek at the [environment](./environments/UniswapV3#show-me-the-code), the [agent](./Agents#creating-your-own-agent) or the [policy](./Policies#training) as you see fit 🙂


## Example

<CodeBlock url="https://github.com/CompassLabs/dojo_examples/blob/main/run.py" snippet_name={"1"}/>


Th resulting plot looks like this  
![](/img/results.png)


<a href={ require("/img/results.png").default }>Download the full script here</a>
