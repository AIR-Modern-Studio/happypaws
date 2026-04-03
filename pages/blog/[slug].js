import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { getBlogPosts, getBlogPostBySlug, getSiteSettings } from '../../lib/strapi';
import styles from './[slug].module.css';

export async function getStaticPaths() {
  const posts = await getBlogPosts().catch(() => []);
  return {
    paths: posts.map((p) => ({ params: { slug: p.attributes.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(params.slug).catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  if (!post) return { notFound: true };
  return { props: { post, settings } };
}

export default function BlogArticle({ post, settings }) {
  const { title, excerpt, body, author, category, coverImage, publishedAt } = post.attributes;
  const imgUrl = coverImage?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${coverImage.data.attributes.url}`
    : null;
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  return (
    <>
      <Nav />
      <main>
        <article className={styles.article}>
          <div className={styles.header}>
            {category && <span className={styles.category}>{category}</span>}
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.meta}>{author} · {date}</p>
          </div>
          {imgUrl && (
            <div className={styles.heroImg}>
              <img src={imgUrl} alt={title} className={styles.img} />
            </div>
          )}
          <div className={styles.body}>
            <p>{body ?? excerpt ?? ''}</p>
          </div>
        </article>
        <div className={styles.back}>
          <Link href="/blog">← Back to Blog</Link>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
