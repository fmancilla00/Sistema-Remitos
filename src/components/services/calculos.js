export const subTotal = (cant, precio) => {
    let precioNum = Number(precio)
    let cantNum = Number(cant)
    let subTot = precioNum * cantNum;
    let subTotalString = `${subTot}`;
    let numFloat = parseFloat(subTotalString);
    let moneda = numFloat.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    return moneda;
}