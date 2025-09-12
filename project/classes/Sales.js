class Sales {
    constructor(params){
        if(params.hasOwnProperty('name')) this.name = name
        else this.name = NULL
        if(params.hasOwnProperty('price')) this.price = price
        else this.price = NULL
        if(params.hasOwnProperty('costPrice')) this.costPrice = costPrice
        else this.costPrice = NULL
        if(params.hasOwnProperty('date')) this.date = date
        else this.date = NULL
        if(params.hasOwnProperty('count')) this.count = count
        else this.count = NULL
        if(params.hasOwnProperty('price') && params.hasOwnProperty('costPrice')) 
            this.revenue = price - costPrice
        else 
            this.revenue = NULL
    }

    
}