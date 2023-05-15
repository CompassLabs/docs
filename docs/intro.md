---
sidebar_position: 1
---

# Dojo Intro

Let's discover **Dojo in 3 simple steps**.

## Getting Started




### Licensing

You will need a license key, to run dojo.
To learn more abouyt plans and pricing click [here](https://www.TODO.com).

However, to get started, you can generate a **[trial license](https://www.TODO.com)**.  
The trial license comes with limitations and is only valid for one week on one machine, but it should be enough to get you excited about Dojo.🥳

### Prerequisites
There's a few more things you need to set up for Dojo. If you've done some coding in web3 before, chances are you're good to go already!

1. RPC Node provider
Setup and account with one of the provider, such as [Infura](https://www.infura.io/). You'll need the RPC_URL it provides. e.g. `https://mainnet.infura.io/v3/ac8ee<...>961`
2. A local ethereum development environment. We suggest Hardhat.
  `npm install --save-dev hardhat`

### Start using Dojo

#### 1. Install Dojo
Dojo is provided as a Python package on Pypi.
To install, simply run  
```python3 -m pip install -i http://54.90.104.158:8080 dojo --trusted-host 54.90.104.158```


#### 2. Setup Dojo configuration
Create a `.env` file in your main directory.
```md title=".env" {1-4}
---
RPC_URL=<YOUR URL>
CHAIN=<chain> # one of ethereum, polygon
LICENSE_KEY=<YOUR LICENSE KEY>
---
```

#### Verify install
if everything is set up correctly, the following command should throw no erros.
```
 python -c "import dojo"
```


:::info
**Congrats 🥳**. You'rve got everythin workign as expected. Let's get started using Dojo!
:::


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
