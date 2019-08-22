(function(win, doc){
    "use strict"

    let items = doc.querySelectorAll(".produto")
    let selected = doc.querySelector(".selected")
    let total = doc.querySelector(".total")
    let tot = 0
    let cont = 0

    for(let i=0; i < items.length; i++) {
        let description = doc.createElement("p")
        let btn = doc.createElement("input")

        // Adicionando atributos a btn
        btn.setAttribute("type", "button")
        btn.setAttribute("class", "buy")
        btn.setAttribute("value", "Buy")
        btn.setAttribute("data-price", items[i].id)
        btn.setAttribute("data-nome", items[i].dataset.nome)

        // Adicionando atributos a description
        description.innerHTML = `Model: ${items[i].dataset.nome}<br>Price: R$${parseInt(items[i].id).toFixed(2)}`

        // Colocando os elementos na div de produtos
        items[i].appendChild(description)
        items[i].appendChild(btn)
    }

    let btns = doc.querySelectorAll(".buy")
    window.btns = btns

    // Adiciona os itens ao carrinho
    function addItemSelected(event) {
        let itemSelected = doc.createElement("div")
        let price = event.target.dataset.price
        let name = event.target.dataset.nome
        let remove = doc.createElement("input")
        
        
        // itemSelected
        itemSelected.setAttribute("class", "itemSelected")
        itemSelected.setAttribute("id", `${name}${cont}`)
        itemSelected.setAttribute("data-price", price)
        tot += parseInt(price)
        total.innerHTML = `Total Price: ${tot.toFixed(2)}`  
        itemSelected.innerHTML = `Model: ${name}<br>Price: R$${price}`
        
        // Remove
        remove.setAttribute("type", "button")
        remove.setAttribute("class", "remove")
        remove.setAttribute("id", `${name}${cont}`)
        remove.setAttribute("data-price", price)
        remove.setAttribute("value", "Remove")

        itemSelected.appendChild(remove)
        selected.appendChild(itemSelected)

        let getRemoves = doc.querySelectorAll(".remove")

        // Percorre todos os botões de remove e verifica se foi clickado
        for(let i=0; i<getRemoves.length; i++) {
            getRemoves[i].addEventListener("click", function(event){
                let priceProduct = event.target.dataset.price
                let idProduct = event.target.id
                let value = 0
                
                let product = doc.getElementById(idProduct)
                product.parentNode.removeChild(product)
                
                let is = doc.querySelectorAll(".itemSelected")

                for(let i=0; i<is.length; i++) {
                    value += parseInt(is[i].dataset.price)
                }
                tot = value
                total.innerHTML = `Total Price: ${tot.toFixed(2)}`
            })
        }
        cont++;
    }
    // Percorre os botões e Verifica se clickou em comprar
    for(let i=0; i<btns.length; i++) {
        btns[i].addEventListener("click", addItemSelected)
    }
    
})(window, document)
