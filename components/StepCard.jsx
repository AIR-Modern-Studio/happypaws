import styles from './StepCard.module.css';

export default function StepCard({ step }) {
  const { number, icon, title, description } = step.attributes;
  return (
    <div className={styles.card}>
      <div className={styles.num}>{number}</div>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
    </div>
  );
}
