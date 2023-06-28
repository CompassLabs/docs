---
sidebar_position: 8
---

import ImgGeneral from '../static/img/env4.png';
import CodeBlock from '../src/components/CodeBlock';

# Visualization

Dojo provides an interactive simulation dashboard to visualize your runs 👓.

You can launch the simulation dashboard with separate Python script like this:
<CodeBlock file="start_dashboard.py" snippet_name={"1"}/>

Note that in this case the dashboard has been launched on port 8051. If you run multiple simulations at the same time, each dashboard must run on its own port.


Now, when you use on of our runners, specify the same port:
```python
sim_blocks, sim_rewards = backtest_run(env, [demo_policy], port=8051)
```

Here's a screenshot of the dashboard 📸
![](/img/simulation_full.png)