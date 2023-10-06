import Table from '@/components/table/table'
import styles from './page.module.scss'
import { QueryClient } from '@tanstack/react-query'

export default function Home() {
  const queryClient = new QueryClient()

  return (
      <main className={styles.main}>
        <h1>Prueba técnica Clasing</h1>
        <Table/>
      </main>
  )
}
