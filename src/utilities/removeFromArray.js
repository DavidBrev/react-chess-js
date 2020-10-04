export default function removeFromArray(array, elementToRemove){
  if(array.includes(elementToRemove)){
    let newArray = [];
    for(let i=0; i<array.length; i++){
      if(array[i] !== elementToRemove){
        newArray.push(array[i]);
      }
    }
    return newArray;
  }
  else{
    return array;
  }
}
