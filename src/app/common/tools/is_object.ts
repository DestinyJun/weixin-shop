export function is_object(obj_a, obj_b): boolean {
  const a = [];
  for (const prop in obj_a) {
    if (obj_a[prop] === obj_b[prop]) {
      a.push(true);
    } else {
      a.push(false);
    }
  }
  console.log(a);
  for (let i = 0; i < a.length; i++) {
    if (!a[i]) {
      return false;
    }
  }
  return true;
}
