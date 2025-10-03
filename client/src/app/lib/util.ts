export function currencyFormat(amount: number) {
    return '$'+(amount/100).toFixed(2);
}


export const filteredParams = (productParams: object) => {
    const filterParams = Object.fromEntries(Object.entries(productParams).filter(([,value])=>value!=='' && value!==null
        && value!==undefined && value.length !==0
    ))
    return filterParams;
}