import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

export class Visualisation {

    camera;
    scene:THREE.Scene;
    light:THREE.Light;
    renderer:THREE.WebGLRenderer;
    raycaster:THREE.Raycaster;

    WIDTH;// = window.innerWidth;
    HEIGHT;// = window.innerHeight;
    div_element;
    bg_color = 0xffffff;
    alpha;
    mapping;


    number_frame = 0;
    delay_time_due_to_stop;
    delta;
    then = Date.now();
    refreshIntervalId;
    controls;


    constructor(div_element, width, height, bg_color, alpha, mapping){
        this.WIDTH = width;
        this.HEIGHT = height;
        this.div_element = div_element;
        this.bg_color = bg_color;
        this.alpha = alpha;
        this.mapping = mapping;
        this.init();
    } 
    init(){

        this.camera = new THREE.OrthographicCamera(
            this.WIDTH/-2,
            this.WIDTH/2,
            this.HEIGHT/2,
            this.HEIGHT/-2,
            0.0001, 100000)
        
        
        // this.camera = new THREE.PerspectiveCamera(40,this.WIDTH/this.HEIGHT,1,10000);
        this.camera.position.z = 900;
        
        // this.camera.aspect = this.WIDTH / this.HEIGHT;
        // this.camera.updateProjectionMatrix();
    
        // this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.scene = new THREE.Scene();
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(0, 1, 1).normalize();



        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
        
        //Pour avoir la meme taille de particule partout
        this.renderer.setPixelRatio( 1 );
        this.renderer.setSize(this.WIDTH,this.HEIGHT)

        // console.log("pixel", window.devicePixelRatio )
        //this.renderer.setClearColor( 0x34495e , 1);
        this.renderer.setClearColor( this.bg_color , this.alpha);
        //this.renderer.sortObjects = true;

        //$(this.div_element).append(this.renderer.domElement);
        var new_container = this.div_element.substring(1);
        this.renderer.domElement.id = "particleCanvas";
        document.getElementById(new_container).appendChild(this.renderer.domElement);
        //console.log("HEY",this.div_element)
        
        this.raycaster = new THREE.Raycaster();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableRotate = false;
        this.controls.enablePan = true;

        // this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        // this.controls.dampingFactor = 0.25;
        // // this.controls.panningMode = new THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
        // this.controls.minDistance = 100;
        // this.controls.maxDistance = 500
        // this.controls.maxPolarAngle = Math.PI / 2;
        // console.log(this.controls)
    }
    add(elements){
        // this.scene.add(elements)
    }
    animate() {

        this.delay_time_due_to_stop = new Date().getTime();
        this.delta = (new Date().getTime() - this.then)/1000;
        // this.number_frame = 60 * this.delta;

        // JE PARCOURS 60px par seconde de BASE / 50 = 12
        this.number_frame = 60 * this.delta;
        
        //console.log("ElementsNeedUpdate :" + this.sparkiz.tube[0].children[0].geometry.elementsNeedUpdate);
        //this.sparkiz.tube[0].children[0].geometry.elementsNeedUpdate = true;

        this.render(this.number_frame);
        // this.frame++;
        // console.log(this.number_frame)
        this.refreshIntervalId = requestAnimationFrame(this.animate.bind(this));
        // console.log(this)
        // setInterval(()=>{
        //     this.render()
        // }, 1000);
    }
    render(number_frame){
        // this.number_frame ++;
        // console.log(this.mapping)
        this.renderer.render( this.scene, this.camera );
        this.updateParticle(this.number_frame)
        this.controls.update();
    }
     /**
     * Permet d'updater mes particules en choisissant la frame ou elle devrait se trouver
     * Permet d'avancer ou de reculer la position de toutes mes particules
     * @param {Number} number_frame frame ou elle doivent se trouver
     */
    updateParticle(number_frame){
        var numParticles; 
        var my_frame = 0;
        var links = this.mapping.linksObject.links;
        for ( var j = 0;  j < links.length; j ++ ){  
            //  console.log(number_frame)
            if (links[j].particleSystems.length != 0 && links[j].particleSystems.material.__webglShader != undefined){
                var uniforms = links[j].particleSystems.material.__webglShader.uniforms;
                // console.log(uniforms)
                uniforms.uTime.value = number_frame;
            }
        }
    } 
    

}

