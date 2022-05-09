/* Data */
let rates = {
    Carrot: 10,
    Apple: 200,
    Guava: 50,
};

let discounts = {
    // values are in percentages.
    Apple: 10,
};

let taxes = {
    // values are in percentages.
    Carrot: 5,
    Guava: 10,
};

let purchases = [
    {
        item: 'Carrot',
        units: 20,
    },
    {
        item: 'Apple',
        units: 2,
    },
    {
        item: 'Guava',
        units: 1,
    },
];

/* Functions */
const getDiscountPercent = (productName) => {
    let discount = discounts[productName];

    return (discount ? (discount / 100) : 0);
};

const getTaxPercent = (productName) => {
    let tax = taxes[productName];

    return (tax ? (tax / 100) : 0);
}

const getUnitPrice = (itemName) => {
    let unitPrice = rates[itemName];
    let discountPercent = getDiscountPercent(itemName);
    let itemDiscount = unitPrice * discountPercent;
    let discountedPrice = unitPrice - itemDiscount;
    let taxPercent = getTaxPercent(itemName);
    let tax = discountedPrice * taxPercent;
    unitPrice = discountedPrice + tax;

    return unitPrice;
};

const getLineItemPrice = (lineItem) => {
    let itemName = lineItem['item'];
    let units = lineItem['units'];
    let unitPrice = getUnitPrice(itemName);
    lineItemPrice = unitPrice * units;
    let itemPriceObj = {
        Item: itemName,
        price: lineItemPrice
    }
    return itemPriceObj;
};

// const getSum = () => {
//     lineItemPrice = purchases.map(getLineItemPrice);
//     let sum = 0;
//     let itemLength = lineItemPrice.length;
//     for (let i = 0; i < itemLength; i++){
//         sum = sum + lineItemPrice[i].price;
//     }
//     console.log("Total Sum :" + sum);
//     console.table(lineItemPrice);
// }
const getCartDetails = () => (purchases.map(getLineItemPrice));

const getSum = () => ((getCartDetails().map(item=>item.price)).reduce((total,price)=>total+price));
// Do not change below this line.
/* Main Function */
const main = () => {
    console.table("Total Sum : " + getSum());
    console.table(getCartDetails());
}
main();
