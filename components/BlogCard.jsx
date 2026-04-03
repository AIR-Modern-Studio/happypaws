import Link from 'next/link';
import styles from './BlogCard.module.css';

export default function BlogCard({ post }) {
  const { slug, title, excerpt, author, category, coverImage, publishedAt } = post.attributes;
  const imgUrl = coverImage?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${coverImage.data.attributes.url}`
    : null;
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <Link href={`/blog/${slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        {imgUrl ? (
          <img src={imgUrl} alt={title} className={styles.img} />
        ) : (
          <div className={styles.placeholder}>📰</div>
        )}
      </div>
      <div className={styles.info}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.title}>{title}</h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        <p className={styles.meta}>{author} · {date}</p>
      </div>
    </Link>
  );
}
