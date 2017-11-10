import * as model from '../data.model';
export const lookup = (id, key) => {
  if (!!model[key]) {
      for(let e of model[key]){
          if(e.id === id) return e.value;
      }
  }
  return id;
}
