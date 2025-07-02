// Función para comparar dos objetos por una propiedad de id
export const compareObjectsById = (obj1: any, obj2: any): boolean => {
  return obj1 && obj2 && obj1.id === obj2.id;
};
