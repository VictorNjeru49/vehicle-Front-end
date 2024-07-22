
const Rate = ((ratings: number) =>{
    if(ratings === 5){
        return <span>★★★★★</span>
    }else if(ratings === 4){
        return <span>★★★★☆</span>
    }else if(ratings === 3){
        return <span>★★★☆☆</span>
    }else if(ratings === 2){
        return <span>★★☆☆☆</span>
    }else if(ratings === 1){
        return <span>★☆☆☆☆</span>
    }else{
    return <span>☆☆☆☆☆</span>
    }})
    
    export default Rate