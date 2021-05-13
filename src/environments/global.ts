
export const getDate = function(idadeMinima: number = 0): string {
  let date = new Date();
  
  let mesAtual = (date.getMonth()+1 < 10) ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
  let diaAtual = (date.getDate() < 10) ? '0'+(date.getDate()) : (date.getDate());

  return `${date.getFullYear()-idadeMinima}-${mesAtual}-${diaAtual}`;
};