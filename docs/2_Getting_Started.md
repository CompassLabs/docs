---
sidebar_position: 2
---

# Getting Started

Let's discover `dojo` in **3 simple steps** 🏎️

## 📄 Licensing

You will need a **license key** to run `dojo`. To get started, you can request a **[trial license](mailto:elisabeth@compasslabs.ai?subject=Dojo%20trial%20license%20request&body=%3C%20Please%20let%20us%20know%20your%20name%20and%20the%20company%20you%20represent.%20We'll%20get%20back%20ASAP%20%3E)**.
:::info
The trial license is only valid for a couple of weeks on a single machine, but hopefully it's enough to get you excited about `dojo` 🥳
:::

## 🎬 Prerequisites
There's a few more things you need to set up for `dojo`. If you've done some coding in web3 before, chances are you're good to go already!

1. **RPC Node provider**: setup an account with a provider, such as [Infura](https://www.infura.io/), or use your own **archive node**. You'll need the RPC_URL it provides. e.g. `https://mainnet.infura.io/v3/ac8ee<...>961`
2. **A local ethereum development environment**: we recently switched from [hardhat](https://hardhat.org/) to [anvil](https://github.com/foundry-rs/foundry). Check out the installation guide [here](https://book.getfoundry.sh/getting-started/installation).

## 🏃 Setup

Setting up `dojo` shouldn't take more than **5 minutes**:

### 1️⃣ Install
`dojo` is provided as a Python package on PyPi.
To install, simply run  
```
pip install dojo-compass
```


### 2️⃣ Setup configuration
Create a `.env` file in your main directory, or export the environment variables:
```md title=".env" {1-4}
RPC_URL=<YOUR URL>
CHAIN=<chain> # for now only supports "ethereum"
LICENSE_KEY=<YOUR LICENSE KEY>
```

### 3️⃣ Verify install
If everything is set up correctly, the following command should throw no erros.
```
 python -c "from dojo.environments import UniV3Env"
```

:::success**Congrats 🥳**
You've got everything working as expected 🏁
:::