export default class Piece{
  #type;
  #position;
  constructor(type, position){
    this.#type = type;
    this.#position = position;
  }
  Move(newPosition){
    this.#position = newPosition;
  }
  GetPosition(){
    return this.#position;
  }
  GetType(){
    return this.#type;
  }
}
