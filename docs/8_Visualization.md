---
sidebar_position: 8
---

:::info
The `dojo.runners` module is still in beta, and currently only works with `UniV3Env` environments with a single agent ⚠️
:::

import ImgGeneral from '../static/img/env4.png';
import CodeBlock from '../src/components/CodeBlock';

# Visualization

## Dojo simulation dashboard



Dojo provides an interactive simulation dashboard to visualize your runs 👓.

You can launch the simulation dashboard with separate Python script like this:
<CodeBlock file="start_dashboard.py" snippet_name={"1"}/>

Note that in this case the dashboard has been launched on port `8051`. If you run multiple simulations at the same time, each dashboard must run on its own port.


Now, when you use one of our runners, specify the same port:
```python
sim_blocks, sim_rewards = backtest_run(env, [demo_policy], port=8051)
```


<details><summary>Here's a screenshot of the dashboard, running in the browser 📸</summary>


![](/img/simulation_full.png)

</details>


### Jupyter notebook support

The simulation dashboard works in jupyter as well.  

To launch within Jupyter, add `jupyter=True` to the arguments of `run_app`:


<details><summary>Here's a screenshot of the dashboard, running in the browser 📸</summary>


![](/img/jupyter_dashboard.png)

</details>

