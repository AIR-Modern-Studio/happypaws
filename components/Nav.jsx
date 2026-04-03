import Link from 'next/link';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        🐾 Happy Paws
      </Link>
      <ul className={styles.links}>
        <li><Link href="/adopt">Adopt</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/volunteer">Volunteer</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <Link href="/donate" className={styles.donateBtn}>Donate</Link>
    </nav>
  );
}
