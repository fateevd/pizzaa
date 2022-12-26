export const calcAllCount = (array: any) => {
  return array.reduce((acc: number, val: any) => acc + val.count, 0);
}

export const saveLocalStorage = (obj: any) => {
  localStorage.setItem("cart", JSON.stringify(obj));
}

export const calculateTotalPrice = (array: any): number => {
  return array.reduce((sum: number, obj: any) => {
    return (obj.price * obj.count) + sum
  }, 0);
}