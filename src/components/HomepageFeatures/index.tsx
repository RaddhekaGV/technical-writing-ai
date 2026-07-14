import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AI Documentation Assistant',
    Svg: () => <div style={{fontSize: '64px'}}>🤖</div>,
    description: (
      <>
        Ask natural language questions and receive answers directly from your documentation.
      </>
    ),
  },
  {
    title: 'Technical Documentation',
    Svg: () => <div style={{fontSize: '64px'}}>📚</div>,
    description: (
      <>
        Access API documentation, user guides, style guides, and technical knowledge articles.
      </>
    ),
  },
  {
  title: 'Fast Knowledge Retrieval',
  Svg: () => <div style={{fontSize: '64px'}}>🔍</div>,
  description: (
    <>
      Quickly locate relevant information, reduce search time, and improve documentation productivity.
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
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
