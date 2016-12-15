/**
 * Class: Webgl
 * Description: Her goes description
 */
import {m, utils} from '../../js/main';

import * as THREE from './three.min.js'
import dat from './dat.gui.min.js'
import Detector from './Detector.js'

var renderer,
	scene,
	camera,
	cameraRadius = 50.0,
	cameraTarget,
	cameraX = 0,
	cameraY = 0,
	cameraZ = cameraRadius,
	particleSystem,
	particleSystemHeight = 100.0,
	clock,
	controls,
	parameters,
	onParametersUpdate,
  texture,
  loader;

export default class Webgl {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  constructor(config) { // put in defaults here
      //defaults
    this.config = $.extend({
      el:'.webgl'
    },config);

    this.$el = $(this.config.el);

    this.init();

  }
  init() {

    var self = this;

    console.log('Snow initated');

		renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0x000000, 0 );
    renderer.sortObjects = false;

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		cameraTarget = new THREE.Vector3( 0, 0, 0 );

    loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    texture = loader.load(
      '../assets/textures/snowflake.png',
      // Resource is loaded
      function ( texture ) {
          // create the particles with the texture
          console.log('Texture loaded');
          self.createParticles( texture );
      },
      // Download progress
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
      // Download errors
      function ( xhr ) {
        console.log( 'An error happened' );
      }
    );


  }
  createParticles( tex ) {

  		var numParticles = 200,
  			width = 100,
  			height = particleSystemHeight,
  			depth = 100,
  			parameters = {
  				color: 0xFF0000,
  				height: particleSystemHeight,
  				radiusX: 2.5,
  				radiusZ: 2.5,
  				size: 100,
  				scale: 4.0,
  				opacity: 0.8,
  				speedH: 1.0,
  				speedV: 1.0
  			},
  			systemGeometry = new THREE.Geometry(),
  			systemMaterial = new THREE.ShaderMaterial({
  				uniforms: {
  					color:  { type: 'c', value: new THREE.Color( parameters.color ) },
  					height: { type: 'f', value: parameters.height },
  					elapsedTime: { type: 'f', value: 0 },
  					radiusX: { type: 'f', value: parameters.radiusX },
  					radiusZ: { type: 'f', value: parameters.radiusZ },
  					size: { type: 'f', value: parameters.size },
  					scale: { type: 'f', value: parameters.scale },
  					opacity: { type: 'f', value: parameters.opacity },
  					texture: { type: 't', value: tex },
  					speedH: { type: 'f', value: parameters.speedH },
  					speedV: { type: 'f', value: parameters.speedV }
  				},
  				vertexShader: document.getElementById( 'snow_vs' ).textContent,
  				fragmentShader: document.getElementById( 'snow_fs' ).textContent,
  				blending: THREE.AdditiveBlending,
  				transparent: true,
  				depthTest: false
  			});

    		for( var i = 0; i < numParticles; i++ ) {
    			var vertex = new THREE.Vector3(
    					this.rand( width ),
    					Math.random() * height,
    					this.rand( depth )
    				);

    			systemGeometry.vertices.push( vertex );
    		}

    		particleSystem = new THREE.Points( systemGeometry, systemMaterial );
    		particleSystem.position.y = -height/2;

    		scene.add( particleSystem );

    		clock = new THREE.Clock();

        document.getElementById("snow").appendChild( renderer.domElement );

    		onParametersUpdate = function( v ) {
    			systemMaterial.uniforms.color.value.set( parameters.color );
    			systemMaterial.uniforms.height.value = parameters.height;
    			systemMaterial.uniforms.radiusX.value = parameters.radiusX;
    			systemMaterial.uniforms.radiusZ.value = parameters.radiusZ;
    			systemMaterial.uniforms.size.value = parameters.size;
    			systemMaterial.uniforms.scale.value = parameters.scale;
    			systemMaterial.uniforms.opacity.value = parameters.opacity;
    			systemMaterial.uniforms.speedH.value = parameters.speedH;
    			systemMaterial.uniforms.speedV.value = parameters.speedV;
    		}

    		controls = new dat.GUI();
    		controls.close();

    		controls.addColor( parameters, 'color' ).onChange( onParametersUpdate );
    		controls.add( parameters, 'height', 0, particleSystemHeight * 2.0 ).onChange( onParametersUpdate );
    		controls.add( parameters, 'radiusX', 0, 10 ).onChange( onParametersUpdate );
    		controls.add( parameters, 'radiusZ', 0, 10 ).onChange( onParametersUpdate );
    		controls.add( parameters, 'size', 1, 400 ).onChange( onParametersUpdate );
    		controls.add( parameters, 'scale', 1, 30 ).onChange( onParametersUpdate );
    		controls.add( parameters, 'opacity', 0, 1 ).onChange( onParametersUpdate );
    		controls.add( parameters, 'speedH', 0.1, 3 ).onChange( onParametersUpdate );
    		controls.add( parameters, 'speedV', 0.1, 3 ).onChange( onParametersUpdate );

        this.bindEvents();

  }
  bindEvents() {

    // bind your events here.
		document.addEventListener( 'mousemove', function( e ) {
			var mouseX = e.clientX,
				mouseY = e.clientY,
				width = window.innerWidth,
				halfWidth = width >> 1,
				height = window.innerHeight,
				halfHeight = height >> 1;

			cameraX = ( cameraRadius * ( mouseX - halfWidth ) / halfWidth ) / 5;
			//cameraY = ( cameraRadius * ( mouseY - halfHeight ) / halfHeight ) / 10;
		}, false );

		// document.addEventListener( 'mousewheel', this.onMouseWheel, false );
		// document.addEventListener( 'DOMMouseScroll', this.onMouseWheel, false );

    this.animate();


  }
	onMouseWheel( e ) {
		e.preventDefault();

		if( e.wheelDelta ) {
			cameraZ += e.wheelDelta * 0.05;
		} else if( e.detail ) {
			cameraZ += e.detail * 0.5;
		}
	}
	rand( v ) {
		return (v * (Math.random() - 0.5));
	}
	animate() {

    requestAnimationFrame(this.animate.bind(this));

		var delta = clock.getDelta(),
			elapsedTime = clock.getElapsedTime();

		particleSystem.material.uniforms.elapsedTime.value = elapsedTime * 10;

		camera.position.set( cameraX, cameraY, cameraZ );
		camera.lookAt( cameraTarget );

		renderer.clear();
		renderer.render( scene, camera );

	}

}
