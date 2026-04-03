import Link from 'next/link';
import styles from './AnimalCard.module.css';

export default function AnimalCard({ animal }) {
  const { slug, name, breed, age, species, photo } = animal.attributes;
  const imgUrl = photo?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${photo.data.attributes.url}`
    : null;

  return (
    <Link href={`/adopt/${slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        {imgUrl ? (
          <img src={imgUrl} alt={name} className={styles.img} />
        ) : (
          <div className={styles.placeholder}>🐾</div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.meta}>{breed} · {age}</p>
        <span className={styles.badge}>{species}</span>
      </div>
    </Link>
  );
}
