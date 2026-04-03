import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import BlogCard from '../../components/BlogCard';
import { getBlogPosts, getSiteSettings } from '../../lib/strapi';
import styles from './index.module.css';

export async function getStaticProps() {
  const [posts, settings] = await Promise.all([
    getBlogPosts().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);
  return { props: { posts, settings } };
}

export default function BlogPage({ posts, settings }) {
  const [featured, ...rest] = posts;
  return (
    <>
      <Nav />
      <main>
        <div className={styles.header}>
          <h1>Our Blog</h1>
          <p>Stories, tips, and news from Happy Paws Animal Shelter.</p>
        </div>

        {featured && (
          <section className={styles.featured}>
            <BlogCard post={featured} />
          </section>
        )}

        {rest.length > 0 && (
          <section className={styles.grid}>
            {rest.map((p) => <BlogCard key={p.id} post={p} />)}
          </section>
        )}

        {posts.length === 0 && (
          <p className={styles.empty}>No blog posts yet. Check back soon!</p>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
