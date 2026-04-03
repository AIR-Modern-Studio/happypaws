import styles from './VolunteerRoleCard.module.css';

export default function VolunteerRoleCard({ role }) {
  const { title, icon, description, spotsAvailable } = role.attributes;
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      {spotsAvailable != null && (
        <p className={styles.spots}>{spotsAvailable} spots available</p>
      )}
    </div>
  );
}
