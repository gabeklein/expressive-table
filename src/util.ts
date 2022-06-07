/** Select first value defined but bail on falsey. */
export function either(...from: any[]){
  for(const component of from){
    if(component === false)
      return null;

    if(typeof component == "function")
      return component;
  }
}

const UID_CACHE = new WeakMap();

export function uniqueId(object: any){
  if(typeof object !== "object")
    return object;

  let uid = UID_CACHE.get(object);

  if(!uid)
    UID_CACHE.set(object, uid = Math.random());
    
  return uid;
}