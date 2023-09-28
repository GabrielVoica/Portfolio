import { Component, OnInit } from '@angular/core';
import { Node } from './node';
import { ExpressionType } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  nodes: Node[] = [];
  initialNode: Node;
  destinationNode: Node;
  currentNode: Node;
  stpSet = [];
  destinationFound = false;

  originSelectActive = false;
  destinationSelectActive = false;
  weight = -1;


  ngOnInit() {
    for (let i = 0; i < 1000; i++) {
      this.nodes.push(new Node(i, 1));
    }

    this.nodes.forEach((node) => {
      node.adjectentNodes = this.getSurroundingNodes(node.id);
    })
  }

  handleInitialButton() {
    if (this.originSelectActive) {
      this.originSelectActive = false;
    }
    else {
      this.originSelectActive = true;
      this.destinationSelectActive = false;

    }
  }

  handleDestinationButton() {
    if (this.destinationSelectActive) {
      this.destinationSelectActive = false;
    }
    else {
      this.destinationSelectActive = true;
      this.originSelectActive = false;
    }
  }

  handleClickedNode(id) {

    let selectedNode: Node = this.nodes.filter(node => node.id == id)[0]

    if (this.originSelectActive) {
      this.removeOrigin();
      this.restartWeights();
      selectedNode.isOrigin = true;
      selectedNode.weight = 0;
      this.initialNode = selectedNode;
      this.currentNode = selectedNode;
      this.getSurroundingNodes(id);
    }
    else if (this.destinationSelectActive) {
      this.removeDestination();
      selectedNode.isDestination = true;
      this.destinationNode = selectedNode;
    }


  }

  setInitialNode() {

  }

  setDestinationNode() {

  }


  removeOrigin() {
    this.nodes.forEach((node) => {
      node.isOrigin = false;
    });
  }

  removeDestination() {
    this.nodes.forEach((node) => {
      node.isDestination = false;
    });
  }


  getSurroundingNodes(node) {

    let adjecent = [];
    let id = node.id;

    if (this.nodes[id + 1] !== undefined && (id - 39) % 40 > 0) {
      adjecent.push(this.nodes[id + 1]);
    }

    if (this.nodes[id - 1] !== undefined && id % 40 > 0) {
      adjecent.push(this.nodes[id - 1]);
    }

    if (this.nodes[id + 40] !== undefined) {
      adjecent.push(this.nodes[id + 40]);
    }

    if (this.nodes[id - 40] !== undefined) {
      adjecent.push(this.nodes[id - 40]);
    }


    adjecent = adjecent.reverse();


    return adjecent;
  }

  adjecentNodesChecked(node) {
    let adjecentNodes = this.getSurroundingNodes(node.id).length;
    let checkedNodes = 0;

    node.adjectentNodes.forEach((item) => {
      if (item.alreadyChecked) {
        checkedNodes++;
      }
    })


    if (adjecentNodes == checkedNodes) {
      return true;
    }
    else {
      return false;
    }
  }


  minimumAdjacentWeight(node) {
    let minNode = null;
    let minWeight = 100000;


    this.getSurroundingNodes(node).forEach((child) => {
      if (child.weight <= minWeight && child.weight > 0 && !child.alreadyChecked) {
        minNode = child;
        minWeight = child.weight;
      }
    })


    return minNode;
  }


  minimunAdjacentCheckedNode(node){
    let minNode = null;
    let minWeight = 100000;


    this.getSurroundingNodes(node).forEach((child) => {
      if (child.weight <= minWeight && !child.isDestination) {
        minNode = child;
        minWeight = child.weight;
      }
    })

    console.log(minNode.id);

    return minNode;
  }



  restartWeights() {
    this.nodes.forEach(node => node.weight = 100000);
  }


  backTrackPath(){

   let backTrack =  setInterval(()=>{

    let surrounding = this.minimunAdjacentCheckedNode(this.destinationNode);

    if(this.weight === 2){
      clearInterval(backTrack);
    }

    surrounding.tracked = true;

    this.weight = surrounding.weight;

    this.destinationNode = surrounding;


   },1)

    
  }


  getFirstNoneUpdatedNode(){
    let nonNode = null;
    this.nodes.forEach((node)=>{
      if(!node.alreadyChecked){
        nonNode = node;
      }
    })

    return nonNode;
  }


  initHomeNodesChecked(){
    let nodes = this.getSurroundingNodes(this.initialNode);
    let checked = true;

    nodes.forEach((node)=>{
      if(!node.alreadyChecked){
       checked = false;
      }
    })

    return checked;
  }



  findPath() {

    this.stpSet.push(this.initialNode);


  let intv =  setInterval(()=>{
     
      if(this.destinationFound){
        this.destinationNode.weight = this.currentNode.weight;
        clearInterval(intv);
        this.backTrackPath();
      }


      if(this.currentNode == null && this.initHomeNodesChecked){
        this.currentNode = this.getFirstNoneUpdatedNode();
      }
      else if(this.currentNode == null){
        this.currentNode = this.getFirstNoneUpdatedNode();
      }

      let surroundingNodes = this.getSurroundingNodes(this.currentNode);

      surroundingNodes.forEach((node) => {

        if(node.isDestination){
          this.destinationFound = true;
        }

        else{
          if (node.weight > this.currentNode.weight) {
            node.weight = this.currentNode.weight + node.distance;
          }
        } 
      })

      this.currentNode.alreadyChecked = true;

      this.currentNode = this.minimumAdjacentWeight(this.currentNode);

    },0.1);
  }
}
