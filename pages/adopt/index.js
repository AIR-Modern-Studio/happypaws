import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import AnimalCard from '../../components/AnimalCard';
import { getAnimals, getPageHero, getSiteSettings } from '../../lib/strapi';
import styles from './index.module.css';

export async function getStaticProps() {
  const [animals, hero, settings] = await Promise.all([
    getAnimals().catch(() => []),
    getPageHero('adopt').catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  return { props: { animals, hero, settings } };
}

export default function AdoptPage({ animals, hero, settings }) {
  const h = hero?.attributes ?? {};
  const [species, setSpecies] = useState('all');
  const [age, setAge] = useState('all');

  const filtered = animals.filter((a) => {
    const attrs = a.attributes;
    if (species !== 'all' && attrs.species !== species) return false;
    if (age === 'young' && !attrs.age?.toLowerCase().includes('month') && !attrs.age?.includes('1 year') && !attrs.age?.includes('2 year')) return false;
    return true;
  });

  return (
    <>
      <Nav />
      <main>
        <section className={styles.hero}>
          {h.badge && <span className={styles.badge}>{h.badge}</span>}
          <h1>{h.heading ?? 'Find Your Perfect Pet'}</h1>
          <p>{h.subtext ?? 'Browse all our available animals and find the one that steals your heart.'}</p>
        </section>

        <section className={styles.content}>
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <span>Species:</span>
              {['all', 'dog', 'cat', 'rabbit', 'other'].map((s) => (
                <button
                  key={s}
                  className={species === s ? styles.activeFilter : styles.filter}
                  onClick={() => setSpecies(s)}
                >
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <span>Age:</span>
              {['all', 'young', 'senior'].map((a) => (
                <button
                  key={a}
                  className={age === a ? styles.activeFilter : styles.filter}
                  onClick={() => setAge(a)}
                >
                  {a === 'all' ? 'All' : a.charAt(0).toUpperCase() + a.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((a) => <AnimalCard key={a.id} animal={a} />)}
            </div>
          ) : (
            <p className={styles.empty}>No animals match your filters. Try adjusting them!</p>
          )}
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
