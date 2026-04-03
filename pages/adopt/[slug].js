import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import AnimalCard from '../../components/AnimalCard';
import { getAnimals, getAnimalBySlug, getSiteSettings } from '../../lib/strapi';
import styles from './[slug].module.css';

export async function getStaticPaths() {
  const animals = await getAnimals().catch(() => []);
  return {
    paths: animals.map((a) => ({ params: { slug: a.attributes.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [animal, allAnimals, settings] = await Promise.all([
    getAnimalBySlug(params.slug).catch(() => null),
    getAnimals().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);
  if (!animal) return { notFound: true };
  const related = allAnimals
    .filter((a) => a.attributes.slug !== params.slug && a.attributes.species === animal.attributes.species)
    .slice(0, 3);
  return { props: { animal, related, settings } };
}

export default function AnimalDetail({ animal, related, settings }) {
  const { name, breed, age, species, description, personality, healthStatus, photo } = animal.attributes;
  const imgUrl = photo?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${photo.data.attributes.url}`
    : null;

  return (
    <>
      <Nav />
      <main>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> / <Link href="/adopt">Adopt</Link> / {name}
        </div>

        <section className={styles.detail}>
          <div className={styles.imgWrap}>
            {imgUrl ? (
              <img src={imgUrl} alt={name} className={styles.img} />
            ) : (
              <div className={styles.imgPlaceholder}>🐾</div>
            )}
          </div>
          <div className={styles.info}>
            <span className={styles.badge}>{species}</span>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}><span>Breed</span><strong>{breed}</strong></div>
              <div className={styles.statItem}><span>Age</span><strong>{age}</strong></div>
              {healthStatus && <div className={styles.statItem}><span>Health</span><strong>{healthStatus}</strong></div>}
            </div>
            {personality && <p className={styles.personality}>{personality}</p>}
            {description && <p className={styles.desc}>{description}</p>}
            <Link href="/contact" className={styles.adoptBtn}>Inquire About {name}</Link>
          </div>
        </section>

        {related.length > 0 && (
          <section className={styles.related}>
            <h2>You Might Also Like</h2>
            <div className={styles.relatedGrid}>
              {related.map((a) => <AnimalCard key={a.id} animal={a} />)}
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
