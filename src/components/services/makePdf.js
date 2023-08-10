import moment from 'moment';
import jsPDF from 'jspdf';

export const generarPDF = ({ infoHead, OC, remito, fecha, mats, ubiIndex, dolar }) => {
    let doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Razon Social: ' + infoHead.razon, 10, 20)
    doc.text('OC: ' + OC, 10, 30)
    doc.text('Domicilio: ' + infoHead.ubicacion[ubiIndex].direccion, 10, 40)
    doc.text('Localidad: ' + infoHead.ubicacion[ubiIndex].localidad, 10, 50)
    doc.text(remito, 150, 20)
    doc.setFontSize(10);
    doc.text(moment(fecha, 'YYYY-MM-DD').format('DD/MM/YYYY'), 150, 30 )
    for (let i = 0; i < mats.length; i++) { 
      if (mats[i]) {
        doc.text(mats[i].cantidad, 10, 70 + (i * 10))
      doc.text(mats[i].codigo, 25, 70 + (i * 10))
        doc.text(mats[i].desc, 50, 70 + (i * 10));
      const simbolo = mats[i].precio ? '$' : ''      
      doc.text(simbolo + mats[i].precio, 170, 70 + (i*10))
      }
    }
  
    //Guardo archivo json para facturacion
    const local = infoHead.ubicacion[ubiIndex].localidad
    const cliente = infoHead.razon
    const cuit = infoHead.cuit
    const head = { remito, OC, ubiIndex, local, fecha, cliente, cuit, dolar}
    const datos = { mats, head }
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(datos)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = remito + ".json";
    element.click();
    
    // Convertir el documento a Blob
    doc.save(remito);
  }