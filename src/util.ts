/** Select first value defined but bail on falsey. */
export function either(...from: any[]){
  for(const component of from){
    if(component === false)
      return null;

    if(typeof component == "function")
      return component;
  }
}