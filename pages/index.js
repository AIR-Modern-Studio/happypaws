import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AnimalCard from '../components/AnimalCard';
import StepCard from '../components/StepCard';
import { getAnimals, getAdoptionSteps, getPageHero, getStats, getSiteSettings } from '../lib/strapi';
import styles from './index.module.css';

export async function getStaticProps() {
  const [animals, steps, hero, stats, settings] = await Promise.all([
    getAnimals().catch(() => []),
    getAdoptionSteps().catch(() => []),
    getPageHero('home').catch(() => null),
    getStats().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  return {
    props: {
      animals: animals.slice(0, 4),
      steps,
      hero,
      stats,
      settings,
    },
  };
}

export default function Home({ animals, steps, hero, stats, settings }) {
  const h = hero?.attributes ?? {};

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {h.badge && <span className={styles.badge}>{h.badge}</span>}
            <h1 className={styles.heading}>{h.heading ?? 'Every Pet Deserves a Loving Home'}</h1>
            <p className={styles.subtext}>{h.subtext ?? 'We rescue, rehabilitate, and rehome animals in need. Find your perfect companion today.'}</p>
            <div className={styles.heroBtns}>
              <Link href="/adopt" className={styles.btnPrimary}>Adopt a Pet</Link>
              <Link href="/donate" className={styles.btnSecondary}>Donate</Link>
            </div>
            {stats.length > 0 && (
              <div className={styles.stats}>
                {stats.map((s) => (
                  <div key={s.id} className={styles.stat}>
                    <strong>{s.attributes.value}</strong>
                    <span>{s.attributes.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.heroImg}>
            <div className={styles.heroImgPlaceholder}>🐶🐱</div>
          </div>
        </section>

        {/* Featured Animals */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Meet Our Animals</h2>
          <p className={styles.sectionSub}>Looking for a new best friend? These wonderful pets are waiting for their forever home.</p>
          {animals.length > 0 ? (
            <div className={styles.grid4}>
              {animals.map((a) => <AnimalCard key={a.id} animal={a} />)}
            </div>
          ) : (
            <p className={styles.empty}>No animals available right now. Check back soon!</p>
          )}
          <div className={styles.center}>
            <Link href="/adopt" className={styles.btnPrimary}>View All Animals</Link>
          </div>
        </section>

        {/* How It Works */}
        <section className={`${styles.section} ${styles.bgSteps}`}>
          <h2 className={styles.sectionTitle}>How Adoption Works</h2>
          {steps.length > 0 ? (
            <div className={styles.grid4}>
              {steps.map((s) => <StepCard key={s.id} step={s} />)}
            </div>
          ) : (
            <div className={styles.grid4}>
              {[
                { id: 1, attributes: { number: 1, icon: '🔍', title: 'Browse Pets', description: 'Explore our available animals and find the right match for your family.' } },
                { id: 2, attributes: { number: 2, icon: '📋', title: 'Apply', description: 'Fill out our simple adoption application online.' } },
                { id: 3, attributes: { number: 3, icon: '🤝', title: 'Meet & Greet', description: 'Schedule a visit to meet your potential new companion.' } },
                { id: 4, attributes: { number: 4, icon: '🏠', title: 'Welcome Home', description: 'Complete the adoption and bring your new pet home!' } },
              ].map((s) => <StepCard key={s.id} step={s} />)}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaCard}>
            <h3>Make a Difference Today</h3>
            <p>Your donation helps us rescue more animals and provide them with the care they deserve.</p>
            <Link href="/donate" className={styles.btnPrimary}>Donate Now</Link>
          </div>
          <div className={styles.ctaCard}>
            <h3>Volunteer With Us</h3>
            <p>Give your time and skills to help care for animals waiting for their forever homes.</p>
            <Link href="/volunteer" className={styles.btnSecondary}>Get Involved</Link>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
