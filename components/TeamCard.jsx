import styles from './TeamCard.module.css';

export default function TeamCard({ member }) {
  const { name, role, bio, avatar } = member.attributes;
  const imgUrl = avatar?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${avatar.data.attributes.url}`
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        {imgUrl ? (
          <img src={imgUrl} alt={name} className={styles.img} />
        ) : (
          <div className={styles.placeholder}>👤</div>
        )}
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
      {bio && <p className={styles.bio}>{bio}</p>}
    </div>
  );
}
