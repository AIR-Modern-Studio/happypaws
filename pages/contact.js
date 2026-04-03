import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { getSiteSettings } from '../lib/strapi';
import styles from './contact.module.css';

export async function getStaticProps() {
  const settings = await getSiteSettings().catch(() => null);
  return { props: { settings } };
}

export default function Contact({ settings }) {
  const s = settings?.attributes ?? {};
  const formspreeId = s.formspreeId ?? 'your-formspree-id';

  return (
    <>
      <Nav />
      <main>
        <section className={styles.hero}>
          <h1>Contact Us</h1>
          <p>Have questions? We are here to help. Reach out any time.</p>
        </section>

        <div className={styles.infoCards}>
          {[
            { icon: '📍', title: 'Visit Us', value: s.address ?? '123 Shelter Lane, Portland, OR' },
            { icon: '📞', title: 'Call Us', value: s.phone ?? '(555) 123-4567' },
            { icon: '✉️', title: 'Email Us', value: s.email ?? 'hello@happypaws.org' },
          ].map((card) => (
            <div key={card.title} className={styles.infoCard}>
              <span className={styles.icon}>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </div>

        <section className={styles.contactSection}>
          <div className={styles.formCol}>
            <h2>Send a Message</h2>
            <form action={`https://formspree.io/f/${formspreeId}`} method="POST" className={styles.form}>
              <div className={styles.row}>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Email Address" required />
              </div>
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" rows={5} placeholder="Your message..." required />
              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </div>
          <div className={styles.sideCol}>
            <div className={styles.mapPlaceholder}>🗺️ Map</div>
            <div className={styles.hours}>
              <h3>Hours</h3>
              <p>{s.hoursWeekday ?? 'Mon–Fri: 9am–6pm'}</p>
              <p>{s.hoursSaturday ?? 'Sat: 10am–5pm'}</p>
              <p>{s.hoursSunday ?? 'Sun: 11am–4pm'}</p>
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <h2>FAQ</h2>
          {[
            { q: 'How do I adopt a pet?', a: 'Browse our available animals, fill out the adoption form, and our team will contact you within 24 hours.' },
            { q: 'What is the adoption fee?', a: 'Adoption fees vary by animal but typically range from $50–$200, which covers vaccinations, microchipping, and spaying/neutering.' },
            { q: 'Can I surrender my pet?', a: 'Yes. Please contact us first to discuss availability and the surrender process.' },
            { q: 'How can I volunteer?', a: 'Visit our Volunteer page to learn about available roles and submit an application.' },
          ].map((item) => (
            <details key={item.q} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
