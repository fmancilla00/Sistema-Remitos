import { html2pdf } from "html2pdf.js";
import jsPDF from 'jspdf';


const guardarPDF = () => {
  const element = document.getElementById('root'); // Obtén el elemento root donde se monta tu componente App

  html2pdf()
    .set({ filename: 'mi_archivo.pdf' }) // Configura el nombre del archivo PDF
    .from(element)
    .save('ruta/que/indiques/mi_archivo.pdf'); // Reemplaza 'ruta/que/indiques' con la ruta deseada
};