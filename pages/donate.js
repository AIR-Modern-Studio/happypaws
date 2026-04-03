import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getPageHero, getStats, getSiteSettings } from '../lib/strapi';
import styles from './donate.module.css';

export async function getStaticProps() {
  const [hero, stats, settings] = await Promise.all([
    getPageHero('donate').catch(() => null),
    getStats().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);
  return { props: { hero, stats, settings } };
}

export default function Donate({ hero, stats, settings }) {
  const h = hero?.attributes ?? {};
  const formspreeId = settings?.attributes?.formspreeId ?? 'your-formspree-id';

  return (
    <>
      <Nav />
      <main>
        <section className={styles.hero}>
          {h.badge && <span className={styles.badge}>{h.badge}</span>}
          <h1>{h.heading ?? 'Support Our Mission'}</h1>
          <p>{h.subtext ?? 'Your donation helps us rescue, rehabilitate, and rehome animals in need.'}</p>
        </section>

        {stats.length > 0 && (
          <div className={styles.statsBar}>
            {stats.map((s) => (
              <div key={s.id} className={styles.stat}>
                <strong>{s.attributes.value}</strong>
                <span>{s.attributes.label}</span>
              </div>
            ))}
          </div>
        )}

        <section className={styles.donateSection}>
          <div className={styles.formCol}>
            <h2>Make a Donation</h2>
            <div className={styles.amounts}>
              {['$25', '$50', '$100', '$250'].map((amt) => (
                <button key={amt} className={styles.amtBtn}>{amt}</button>
              ))}
            </div>
            <form action={`https://formspree.io/f/${formspreeId}`} method="POST" className={styles.form}>
              <input type="hidden" name="_subject" value="Donation from Happy Paws website" />
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <input type="text" name="amount" placeholder="Donation Amount ($)" required />
              <textarea name="message" rows={3} placeholder="Optional message" />
              <button type="submit" className={styles.submitBtn}>Donate Now</button>
            </form>
          </div>
          <div className={styles.impactCol}>
            <h3>Your Impact</h3>
            {[
              { amt: '$25', desc: 'Provides food for one animal for a month' },
              { amt: '$50', desc: 'Covers vaccination costs for one pet' },
              { amt: '$100', desc: 'Funds medical care for an injured animal' },
              { amt: '$250', desc: 'Sponsors a full rescue operation' },
            ].map((item) => (
              <div key={item.amt} className={styles.impactItem}>
                <span className={styles.impactAmt}>{item.amt}</span>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
