import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Data Sourcing',
    Svg: require('@site/static/img/data1.svg').default,
    description: (
      <>
        Utilize Dojo’s on- and off-chain data capabilities for data ingestion and strategy evaluation.
      </>
    ),
  },
  {
    title: 'Simulation',
    Svg: require('@site/static/img/simulation2.svg').default,
    description: (
      <>
        Run strategies through Dojo’s agent-based simulator to simulate transactions at the EVM smart contract level.
      </>
    ),
  },
  // {
  //   title: 'Intelligence',
  //   Svg: require('@site/static/img/intelligence.svg').default,
  //   description: (
  //     <>
  //       Meet strategy goals through parameter optimization at every time step.
  //     </>
  //   ),
  // },
  {
    title: 'Analysis',
    Svg: require('@site/static/img/analysis1.svg').default,
    description: (
      <>
        Gain insights into strategy performance through tailored agent metric tracking implementation.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* <div className="row, center">
          Dojo, and end to end research platform
        </div>
        <div className="row, center">
          Designed to provide the infrastructure to scale research and productionisation DeFi strategies 
        </div> */}
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
