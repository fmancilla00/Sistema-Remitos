export const registrarProovedor = (prov) => { 
    let proveedores = localStorage.getItem('proveedores')
    const nombre = prov.razon;
    if (proveedores == null) {
        proveedores = '{}';
    }
    let objetoProvs = JSON.parse(proveedores);
    objetoProvs[nombre] = prov;
    localStorage.setItem('proveedores', JSON.stringify(objetoProvs));
}

export const obtenerProveedores = () => {
    const proveedores = localStorage.getItem('proveedores');
    if (proveedores == null) { 
        return [];
    }
    const obj = JSON.parse(proveedores);
    return Object.values(obj)           //devuelvo array de proveedores
}

export const obtenerObjetoProveedores = (name) => {
    const proveedores = localStorage.getItem('proveedores');
    if (proveedores != null) {
        const obj = JSON.parse(proveedores);
        return obj[name];
    } else {
        return null;
    }
}