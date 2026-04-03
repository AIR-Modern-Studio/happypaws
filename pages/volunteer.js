import Nav from '../components/Nav';
import Footer from '../components/Footer';
import VolunteerRoleCard from '../components/VolunteerRoleCard';
import { getPageHero, getVolunteerRoles, getSiteSettings } from '../lib/strapi';
import styles from './volunteer.module.css';

export async function getStaticProps() {
  const [hero, roles, settings] = await Promise.all([
    getPageHero('volunteer').catch(() => null),
    getVolunteerRoles().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);
  return { props: { hero, roles, settings } };
}

export default function Volunteer({ hero, roles, settings }) {
  const h = hero?.attributes ?? {};
  const formspreeId = settings?.attributes?.formspreeId ?? 'your-formspree-id';

  return (
    <>
      <Nav />
      <main>
        <section className={styles.hero}>
          {h.badge && <span className={styles.badge}>{h.badge}</span>}
          <h1>{h.heading ?? 'Volunteer With Us'}</h1>
          <p>{h.subtext ?? 'Join our team of passionate volunteers and make a difference in the lives of animals.'}</p>
        </section>

        {roles.length > 0 && (
          <section className={styles.section}>
            <h2>Volunteer Opportunities</h2>
            <div className={styles.grid}>
              {roles.map((r) => <VolunteerRoleCard key={r.id} role={r} />)}
            </div>
          </section>
        )}

        <section className={styles.formSection}>
          <h2>Sign Up to Volunteer</h2>
          <form action={`https://formspree.io/f/${formspreeId}`} method="POST" className={styles.form}>
            <div className={styles.row}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <input type="tel" name="phone" placeholder="Phone Number" />
            <textarea name="message" rows={4} placeholder="Why do you want to volunteer?" />
            <button type="submit" className={styles.submitBtn}>Submit Application</button>
          </form>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
