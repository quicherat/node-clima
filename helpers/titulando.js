

  export function titulando (str) {
    const texto = str.toLowerCase().split(' ')
    const capital = texto.map( p => p.replace(p[0], p[0].toUpperCase()))
    return capital.join(' ')
  }