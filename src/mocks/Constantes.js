export const ObtenerConstantes = ident => {
    const PRECIO = `${ident}.precio`
    const CODIGO = `${ident}.codigo`
    const DESC = `${ident}.descripcion`
    const CANT = `${ident}.cantidad`

    return {PRECIO, CODIGO, DESC, CANT}
}
