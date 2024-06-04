import styles from './index.module.css';

export default function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}
