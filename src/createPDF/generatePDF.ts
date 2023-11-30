import jsPDF from "jspdf";
import "jspdf-autotable";
import imgRandstad from "../assets/randstad.jpg";
type AutoTable = /*unresolved*/ any;
interface CustomJsPDF extends jsPDF {
  autoTable?: AutoTable;
}
export function generatePDF({
  data,
  month,
  datiUser,
  active,
}: {
  data: any;
  month: any;
  datiUser: any;
  active: boolean;
}) {
  console.log("genera ", data, month, datiUser.current, active);

  const currentDate = new Date();

  
    const doc: CustomJsPDF = new jsPDF();
    const options = {
      x: 10, // Posizione orizzontale dell'immagine nel PDF
      y: 10, // Posizione verticale dell'immagine nel PDF
      width: 45, // Larghezza dell'immagine nel PDF
      height: 15, // Altezza dell'immagine nel PDF
    };
    doc.addImage(
      imgRandstad,
      "JPG",
      options.x,
      options.y,
      options.width,
      options.height
    );
    // Testo non tabellare
    doc.setFontSize(8);
    doc.text(`CCNL DI RIFERIMENTO:${datiUser.current.ccnlRiferimento}`, 80, 10); //000135
    doc.text(`ANNO: ${currentDate.getFullYear()}`, 80, 20);
    doc.text(`MESE: ${month??currentDate.getMonth() + 1}`, 80, 30);
    doc.text(`FILIALE: ${datiUser.current.filiale}`, 100, 30); //TECU0405
    doc.text("RAGIONE SOCIALE AZIENDA:", 15, 40);
    doc.text(datiUser.current.ragioneSociale, 80, 40); //"ACCENTURE SPA"
    doc.text("COGNOME E NOME DIPENDENTE:", 15, 50);
    doc.text(datiUser.current.fullName, 80, 50); //"PAPA FRANCESCO"
    doc.text("ORE SETTIMANALI: 40", 155, 50);
    // ... Altri campi non tabellari ...

    // Dati tabellari
    const tableData = [
      [
        "DATA",
        "GIORNO SETTIMANA",
        "ORE ORDINARIE",
        "SOLO PER I TURNISTI (*)",
        "STRAORDINARIO",
        "TRATT. MENSA (SI/NO)",
        "BUONO PASTO (SI/NO)",
        "ASSENZA (ORE)",
        "TIPO DI ASSENZA",
      ],
      // ... Altre righe di dati ...
    ];

    doc.autoTable({
      // margin: { top: 80 }, // Margine iniziale
      headStyles: { fillColor: "#2980ba" }, // Colore sfondo intestazione
      styles: { fontSize: 7 }, // Dimensione testo
      columnStyles: {},

      startY: 60, // Posizione verticale in cui iniziare la tabella
      head: [tableData[0]], // Intestazione della tabella
      body: [
        ...data.map((ced: any) => {
          return [
            ced.day,
            ced.dayWeek,
            ced.hours,
            ced.onlyTurn,
            ced.extraHours,
            ced.cafeteriaBenefit ? "SI" : "NO",
            ced.ticketRestaurant ? "SI" : "NO",
            ced.hoursAbsance,
            ced.typeOfAbsance,
          ];
        }),
      ],
      // Dati della tabella escludendo l'intestazione
      theme: "striped",
    });

    // Firme e avvertenze
    // doc.setFontSize(8);
    // doc.text("FIRME SETTIMANALI A CURA DEL RESPONSABILE DELL’AZIENDA", 50, doc.autoTable.previous.finalY + 10);
    // doc.text("1° SETTIMANA\t2° SETTIMANA\t3° SETTIMANA\t4° SETTIMANA\t5° SETTIMANA\t6° SETTIMANA", 10, doc.autoTable.previous.finalY + 20);
    // doc.text("AVVERTENZE", 10, doc.autoTable.previous.finalY + 30);
    // doc.text("1) Trasmettere via fax al n.   ogni fine settimana ed ultimo giorno del mese.", 10, doc.autoTable.previous.finalY + 40);
    // doc.text("2) Utilizzare un nuovo foglio a partire dal 1° giorno del mese successivo.", 10, doc.autoTable.previous.finalY + 50);
    // doc.text("3) Compilare in ogni sua parte con particolare attenzione alle ore ordinarie, straordinarie ed assenze.", 10, doc.autoTable.previous.finalY + 60);
    // doc.text("4) Per chiarimenti contattare il numero telefonico 0298981 oppure l’indirizzo email", 10, doc.autoTable.previous.finalY + 70);
    doc.setFontSize(4);
    doc.text("ATTENZIONE: IL FOGLIO PRESENZE NON E' VALIDO SENZA FIRMA DEL LAVORATORE E TIMBRO E FIRMA DELL'AZIENDA.", 60, doc.autoTable.previous.finalY + 5);
    doc.setFontSize(8);
    doc.text("Firma del lavoratore:", 20, doc.autoTable.previous.finalY + 15);
    doc.text(
      "Timbro e firma dell’azienda",
      150,
      doc.autoTable.previous.finalY + 15
    );
    
    doc.save(
      `Cedolino ${datiUser.current.fullName}_${month??currentDate.getMonth() + 1}-${currentDate.getFullYear()}.pdf`
    );
 
}
