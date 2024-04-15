Build with [docusaurus](https://docusaurus.io/).


```mermaid
flowchart TD
    main[main]
    release[🔒release]
    main_website[/<a href='https://dojo.compasslabs.ai'>dojo.compasslabs.ai</a>/]
    dev_website[/<a href='https://dev.dojo.compasslabs.ai'>dev.dojo.compasslabs.ai</a>/]
    developer((Developer))
    feature_branches[feature_branches]

    main --> dev_website
    release --> main_website

    main --> |merge into| release
    feature_branches --> |merge into| main

    developer --> |push| feature_branches
    developer --> |push| main
````
