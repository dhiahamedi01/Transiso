import DemandesTable from "@/Components/Dahsboard/Demande/DemandesTable";
import styles from '@/Components/Dahsboard/Employe/Liste_employe/ListeEmp.module.css';


export default function PageDemandes() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Liste des demandes</h3>
      </div>
      <DemandesTable/>
    </div>
  );
}
