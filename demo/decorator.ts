function readonly(target: any, propertyKey: string) {
  let value = target[propertyKey];

  const getter = function() {
      return value;
  };

  const setter = function(newValue: any) {
      console.error(`Cannot assign new value '${newValue}' to readonly property '${propertyKey}'.`);
  };

  Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
  });
}

class MyClass {
  @readonly
  readonlyProperty = 'readonly';
}