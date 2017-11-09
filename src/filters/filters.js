import * as model from '../dataModel';
export const lookup = (id, key) => {
  if (!!model[key]) {
      for(let e of model[key]){
          if(e.id === id) return e.value;
      }
  }
  return id;
}
