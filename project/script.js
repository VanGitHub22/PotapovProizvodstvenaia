function generateGraph(){
    let allColumns = document.querySelectorAll(".columnarGraph div")
    let i = 100
    for(let column of allColumns){
        i += 20
        column.style.height = i + "px"
    }
}

generateGraph()
