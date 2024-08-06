const Currency_Formater = new Intl.NumberFormat("en-us",{
    currency:"USD",
    style:"currency",
})

export function formatCurrency(number:number){
  return Currency_Formater.format(number)
}