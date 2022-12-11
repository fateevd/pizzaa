export const calcAllCount = (array: any) => {
  return array.reduce((acc: number, val: any) => acc + val.count, 0);
}
