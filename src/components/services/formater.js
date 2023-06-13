export const formatear = (input) => {
  // Eliminar cualquier carácter que no sea un número
  let numbers = input.replace(/\D/g, '');

  // Asegurarse de que no haya más de 8 números
    numbers = numbers.split("").reverse().join("");
    numbers = numbers.slice(0, 8);
    numbers = numbers.split("").reverse().join("") 
  

  // Autocompletar con ceros a la izquierda hasta tener 8 números
  while (numbers.length < 8) {
    numbers = '0' + numbers;
  }

  // Formatear el número completo
    let formattedNumber = '0001-' + numbers;
    return formattedNumber;
}