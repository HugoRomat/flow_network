import * as d3 from 'd3'
import * as THREE from 'three';

import {Nodes} from './GraphicalElement/Nodes'
import {Links} from './GraphicalElement/Links'

export class LayoutManager{

    
    simulation
    nodes = [] 
    links = [];

    constructor(){
        this.initSimulation()
    }
    map_links_nodes(nodes, links){
        this.nodes = nodes;
        this.links = links;

       

        this.simulation.nodes(this.nodes);
        this.simulation.force("link").links(this.links);
    }
    initSimulation(){
        this.simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(-200).distanceMin(50).distanceMax(500))
            .force("collide", d3.forceCollide().strength(1).radius(function(d){ return d['r'] + 5; }).iterations(1))
            .force("link", d3.forceLink().id(function(d) { return d['id']; }).distance(30))
            .velocityDecay(0.85)
            // .on("tick", that.onTick.call(that));
            // .on("tick", function(){ that.onTick.call(that); });
    }
    
}

