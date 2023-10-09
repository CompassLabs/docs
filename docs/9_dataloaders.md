---
sidebar_position: 9
title: Dataloaders
---
:::tip question
What if you want to run a simulation on an environment for which we don't natively have data for?
:::

Luckily, you can implement your own dataloader ⬇️ to read in protocol events data, or make use of one we have already implemented 😎. You can find out more about these in the [code reference](https://readthedocs.compasslabs.ai/dojo.dataloaders.html#dojo.dataloaders.S3Loader).

These objects can all be found under `dojo.dataloaders`.

## 🧑‍💻 Making your own dataloader

Creating your own dataloader is pretty simple. We've designed the base class `BaseLoader` to handle all format checking, so you only need to concentrate on actually loading your data by overriding the method `_load_data()` ✅

### 🤔 What should `_load_data()` return?

In short, `_load_data()` should return a list of dictionaries where each dictionary in the list represents an event/log from the blockchain.

However, the dictionaries also need to be in the **correct format**. Each event for the protocols we support has a specific format defined in the code reference. For example, the format for a swap event on UniswapV3 can be found [here](https://readthedocs.compasslabs.ai/dojo.dataloaders.html#dojo.dataloaders.formats.UniV3Swap). Each dictionary you pass should obey one of the formats under `dojo.dataloaders.formats` depending on the type of event it represents.

:::note
`dojo` will automatically check each dictionary has ***at least*** the same keys as in the expected format and that the type of the data is correct 🔎
:::

### 🤔 How does dojo know which format to check against each dictionary in my list?

This is done through the `action` key which should be present in each dictionary in your list. This should correspond to the name of the event the dictionary represents. For example, for UniswapV3 events, this can take values `["swap", "mint", "burn", "collect"]` which correspond to the same events on the [Uniswap docs](https://docs.uniswap.org/contracts/v3/reference/core/interfaces/pool/IUniswapV3PoolEvents).
