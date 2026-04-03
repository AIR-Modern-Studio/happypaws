import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer({ settings }) {
  const s = settings?.attributes ?? {};
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.logo}>🐾 Happy Paws</span>
          <p>{s.brandDescription ?? 'Giving every animal a second chance at a loving home.'}</p>
        </div>
        <div className={styles.col}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/adopt">Adopt</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/volunteer">Volunteer</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/donate">Donate</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Contact</h4>
          <p>{s.email ?? 'hello@happypaws.org'}</p>
          <p>{s.phone ?? '(555) 123-4567'}</p>
          <p>{s.address ?? '123 Shelter Lane, Portland, OR'}</p>
        </div>
        <div className={styles.col}>
          <h4>Hours</h4>
          <p>{s.hoursWeekday ?? 'Mon–Fri: 9am–6pm'}</p>
          <p>{s.hoursSaturday ?? 'Sat: 10am–5pm'}</p>
          <p>{s.hoursSunday ?? 'Sun: 11am–4pm'}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Happy Paws Animal Shelter. All rights reserved.</p>
      </div>
    </footer>
  );
}
