import moment from 'moment';
import jsPDF from 'jspdf';

export const generarPDF = ({ head, infoHead, datos, ids, ubiIndex }) => {
    let doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Razon Social: ' + infoHead.razon, 10, 20)
    doc.text('OC: ' + head.OC, 10, 30)
    doc.text('Domicilio: ' + infoHead.ubicacion[ubiIndex].direccion, 10, 40)
    doc.text('Localidad: ' + infoHead.ubicacion[ubiIndex].localidad, 10, 50)
    doc.text(head.remito, 150, 20)
    doc.setFontSize(10);
    doc.text(moment(head.fecha, 'YYYY-MM-DD').format('DD/MM/YYYY'), 150, 30 )
    for (let i = 0; i < ids.length; i++) { 
      if (datos[ids[i]]) {
        doc.text(datos[ids[i]].cantidad, 10, 70 + (i * 10))
      doc.text(datos[ids[i]].codigo, 25, 70 + (i * 10))
        doc.text(datos[ids[i]].descripcion, 50, 70 + (i * 10));
      const simbolo = datos[ids[i]].precio ? '$' : ''      
      doc.text(simbolo + datos[ids[i]].precio, 170, 70 + (i*10))
      }
    }
    
    // Convertir el documento a Blob
    doc.save(head.remito);
  }