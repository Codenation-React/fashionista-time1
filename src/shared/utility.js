export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};

export function formatText(s) {
  s = s.replace(/^\s+|\s+$/g, ''); //trim
  s = s.toLowerCase();

  // remover acentos
  var from = 'àáäâãèéëêìíïîòóöôõùúüûñç·/_,:;';
  var to = 'aaaaaeeeeiiiiooooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    s = s.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  s = s
    .replace(/[^a-z0-9 -]/g, '') // remove caracteres inválidos
    .replace(/\s+/g, '-') // substituir espaços por -
    .replace(/-+/g, '-'); // recolher os -

  return s;
}
