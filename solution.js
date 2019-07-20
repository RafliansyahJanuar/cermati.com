require('es6-promise').polyfill()
require('isomorphic-fetch')

function getAssets(symbols) {
    return fetch(`//api.coinmarket.com/v2/listings/`)//anything api you want 
    .then(resp => resp.json())
    .then(json=>{
        return Object.values(json.data).reduce((acc, asset) =>{
            if(symbols.find(symbol => symbol === asset.symbol)) acc.push(asset)
            return acc
        }, [])
    })
}

function getPrices(assets){
    console.log(assets)
    const promises = assets.map(async asset =>{
        return await fetch(`//api.coinmarket.com/v2/ticker/${asset.id}`)
        .then(resp => resp.json)
    })

    return Promise.all(promises)
}

symbols = ['BTC', 'BCH', 'ETH', 'XMR', 'EOS']

getAssets(symbols)
    .then(assets =>{
        return getPrices(assets)
        .then(Prices => console.log(prices))
    })
    