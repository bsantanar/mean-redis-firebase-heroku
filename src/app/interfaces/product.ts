export interface Product {
    partNumber: string,
    name: string,
    fullImage: string,
    images: string[],
    prices: {
        priceRangeMin: number,
        priceRangeMax: number,
        offerPrice: number,
        listPrice: number,
        cardPrice: number,
        discount: number,
        discountPercentage: number,
        ripleyPuntos: number,
        formattedPriceRangeMin: string,
        formattedPriceRangeMax: string,
        formattedOfferPrice: string,
        formattedListPrice: string,
        formattedCardPrice: string,
        formattedDiscount: string
    },
    shortDescription: string,
    longDescription: string
}
