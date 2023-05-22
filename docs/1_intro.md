---
sidebar_position: 1
---

# Intro to dojo

Do you want to:
- Test your existing DeFi strategies?
- Optimize or train a new DeFi strategy?
- Stress test your new DeFi smart contracts?

[Compass Labs](https://compasslabs.ai/) has developed `dojo`, an agent-based DeFi simulation software with the goal of minimizing the [sim2real gap](https://developer.nvidia.com/blog/closing-the-sim2real-gap-with-nvidia-isaac-sim-and-nvidia-isaac-replicator/).

## Features

### **Simplicity**

-  **Runs locally on your machine ✅**  
`dojo` runs **fully locally** on your machine. No information about your strategies or simulations is shared with us (or with anyone else for that matter).

- Simple python interface ✅** 
The `dojo` interface allows you to experiment with your strategies fully in python! This way, you can take advantage of the ecosystem with packages such as `numpy`, `numpyro` or `jax`.


### Realism


-  **Protocol integrations ✅**  
Currently, `dojo` integrates with UniswapV3 and BalancerV2, but we also have more integrations planned for the future!

-  **Access to on-chain and CEX data ✅**   
No need to worry about getting your own data, `dojo` sources it's own on-chain data and, optionally, CEX price data (specifically from Binance right now).

-  **Transaction ordering ✅**   
You can edit the order in which transactions are executed directly, allowing you to simulate whatever MEV scenarios you can imagine! In the future, `dojo` will also include  models suggesting likelihoods for transaction ordering.

-  **Market impact model ✅**   
Simulate how the market might respond to your agent actions. With support from Seniror Fellows at the Alan Turing Institue, Imperial Collge London and the Oxford MAN Institute, `dojo` will have more complex models as we progress!

-  **Runs at smart-contract level ✅**  
`dojo` forks the actual blockchain and runs on the same smart contracts that would be run in real life.  
This means you don't need to worry about any potential bugs in your model of the protocol or whether you've missed any assumptions on how the protocol works. This also allows for the capture of micro-effects that could impact your simulation results; for example, how the protocol handles precision and rounding.







### Featureful





-  **Multi protocol/chain simulations 👀**  
Run simulations across multiple protocols/chains simultaneously.

-  **Execution Environment 👀**  
Because `dojo` [runs at the smart contract level](#runs-at-smart-contract-level-), your strategy can be easily ported from the `dojo` fork onto mainnet with zero modifications!

-  **Upcoming integrations 👀**   
   - Polygon
   - Arbitrum


<!-- 
### Run our first simulation

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes. -->
