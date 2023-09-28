export class Node{
    id: number;
    isOrigin: boolean = false;
    isDestination: boolean = false;
    weight: number = 100000;
    alreadyChecked = false;
    adjectentNodes = [];
    parentNode;
    distance = 1;
    tracked = false;

    constructor(id: number,distance:number){
        this.id = id;
        this.distance = distance;
    }
}