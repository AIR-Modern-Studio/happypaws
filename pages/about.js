import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TeamCard from '../components/TeamCard';
import { getPageHero, getTeamMembers, getSiteSettings } from '../lib/strapi';
import styles from './about.module.css';

export async function getStaticProps() {
  const [hero, team, settings] = await Promise.all([
    getPageHero('about').catch(() => null),
    getTeamMembers().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);
  return { props: { hero, team, settings } };
}

export default function About({ hero, team, settings }) {
  const h = hero?.attributes ?? {};
  return (
    <>
      <Nav />
      <main>
        <section className={styles.hero}>
          {h.badge && <span className={styles.badge}>{h.badge}</span>}
          <h1>{h.heading ?? 'About Happy Paws'}</h1>
          <p>{h.subtext ?? 'We are a non-profit animal shelter dedicated to rescuing and rehoming animals in need.'}</p>
        </section>

        <section className={styles.section}>
          <div className={styles.missionGrid}>
            <div>
              <h2>Our Mission</h2>
              <p>Happy Paws Animal Shelter is committed to providing a safe haven for animals in need. We rescue, rehabilitate, and rehome dogs, cats, and other small animals, working tirelessly to find them loving forever homes.</p>
              <p>Founded in 2010, we have helped over 5,000 animals find their perfect families. Our team of dedicated staff and volunteers work around the clock to ensure every animal receives the love and care they deserve.</p>
            </div>
            <div className={styles.imgPlaceholder}>🏠🐾</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.bgLight}`}>
          <h2 className={styles.centered}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {[
              { icon: '❤️', title: 'Compassion', desc: 'Every animal is treated with kindness and respect.' },
              { icon: '🔬', title: 'Expert Care', desc: 'Veterinary professionals on staff 7 days a week.' },
              { icon: '🏡', title: 'Community', desc: 'Building bonds between pets and their families.' },
              { icon: '♻️', title: 'Sustainability', desc: 'Responsible practices for a better future.' },
            ].map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.centered}>Meet Our Team</h2>
            <div className={styles.teamGrid}>
              {team.map((m) => <TeamCard key={m.id} member={m} />)}
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
