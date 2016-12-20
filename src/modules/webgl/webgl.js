/**
 * Class: Webgl
 * Description: Her goes description
 */
import {
	m,
	utils
} from '../../js/main';

import * as THREE from './three.min.js'
import dat from './dat.gui.min.js'
import Detector from './Detector.js'

// GLOBAL
var EightBitMode = false;

export default class Webgl {
	/**
	 * @param {number} param this is param.
	 * @return {number} this is return.
	 */
	constructor(config) { // put in defaults here
		//defaults
		this.config = $.extend({
			el: '#snow'
		}, config);

		this.$el = $(this.config.el);

		this.renderer,
			this.scene,
			this.camera,
			this.cameraRadius = 50.0,
			this.cameraTarget,
			this.cameraX = 0,
			this.cameraY = 0,
			this.cameraZ = this.cameraRadius,
			this.particleSystem,
			this.particleSystemHeight = 100.0,
			this.wind = 2.5,
			this.clock,
			this.controls,
			this.parameters,
			this.onParametersUpdate,
			this.texture,
			this.loader;

		this.init();

	}
	init() {

		var self = this;


		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.sortObjects = false;

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
		this.cameraTarget = new THREE.Vector3(0, 0, 0);

		this.loader = new THREE.TextureLoader();
		this.loader.crossOrigin = '';
		this.texture = this.loader.load(
			'../assets/textures/snowflake.png',
			// Resource is loaded
			function(texture) {
				// create the particles with the texture
				self.createParticles(texture);
			},
			// Download progress
			function(xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			// Download errors
			function(xhr) {
				console.log('An error happened during the loading of the texture ');
			}
		);

	}
	createParticles(tex) {

			var numParticles = 2000,
				width = 70,
				height = this.particleSystemHeight,
				depth = 80,
				parameters = {
					// color: 0xffffff,
					color: 0xffffff,
					height: this.particleSystemHeight,
					radiusX: this.wind,
					radiusZ: 2.5,
					size: 100,
					scale: 4.0,
					opacity: 1,
					speedH: 1.0,
					speedV: 1.0
				},
				systemGeometry = new THREE.Geometry(),
				systemMaterial = new THREE.ShaderMaterial({
					uniforms: {
						color: {
							type: 'c',
							value: new THREE.Color(parameters.color)
						},
						height: {
							type: 'f',
							value: parameters.height
						},
						elapsedTime: {
							type: 'f',
							value: 0
						},
						radiusX: {
							type: 'f',
							value: parameters.radiusX
						},
						radiusZ: {
							type: 'f',
							value: parameters.radiusZ
						},
						size: {
							type: 'f',
							value: parameters.size
						},
						scale: {
							type: 'f',
							value: parameters.scale
						},
						opacity: {
							type: 'f',
							value: parameters.opacity
						},
						texture: {
							type: 't',
							value: tex
						},
						speedH: {
							type: 'f',
							value: parameters.speedH
						},
						speedV: {
							type: 'f',
							value: parameters.speedV
						}
					},
					vertexShader: document.getElementById('snow_vs').textContent,
					fragmentShader: document.getElementById('snow_fs').textContent,
					blending: THREE.AdditiveBlending,
					transparent: true,
					depthTest: false
				});

			// Less particules for mobile
			if (this.isMobileDevice) {
				numParticles = 200;
			}

			for (var i = 0; i < numParticles; i++) {
				var vertex = new THREE.Vector3(
					this.rand(width),
					Math.random() * height,
					this.rand(depth)
				);

				systemGeometry.vertices.push(vertex);
			}

			this.particleSystem = new THREE.Points(systemGeometry, systemMaterial);
			this.particleSystem.position.y = -height / 2;

			this.scene.add(this.particleSystem);

			this.clock = new THREE.Clock();

			document.getElementById("snow").appendChild(this.renderer.domElement);

			this.bindEvents();

		}
		// Events --------------------------------------------------------------------------
	bindEvents() {

		// bind your events here.
		var self = this;

		document.addEventListener('mousemove', function(e) {
			var mouseX = e.clientX,
				mouseY = e.clientY,
				width = window.innerWidth,
				halfWidth = width >> 1,
				height = window.innerHeight,
				halfHeight = height >> 1;

			var targetX = self.cameraRadius * (mouseX - halfWidth) / halfWidth;
			self.cameraX = targetX / 10;
			//self.cameraY = self.cameraRadius * ( mouseY - halfHeight ) / halfHeight;

		}, false);

		// Activat e8 bit mode button
		document.getElementById("eightbitmodebutton").addEventListener('click', function(e){
            e.preventDefault();
            self.activateEightBitMode();
        }, false);


		// handle resize
		this.handleWindowResize();

		// Animate snow
		this.animate();

	}
	activateEightBitMode() {

		var self = this;

		if (!EightBitMode) {
			EightBitMode = true;
			$('#activate-text').html("DEACTIVATE</br>X-MAS MODE");
			this.createEightBitElements();
		} else {
			EightBitMode = false;
			$('#activate-text').html("ACTIVATE</br>X-MAS MODE");
		}

	}
	handleWindowResize() {

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

	}
	animate() {

			requestAnimationFrame(this.animate.bind(this));


			if (EightBitMode) {

				var delta = this.clock.getDelta(),
					elapsedTime = this.clock.getElapsedTime();

				this.particleSystem.material.uniforms.elapsedTime.value = elapsedTime * 10;

				this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ);
				this.camera.lookAt(this.cameraTarget);

				this.renderer.clear();
				this.renderer.render(this.scene, this.camera);

			} else {
				this.renderer.clear();
			}

		}
		// Getters / Setters --------------------------------------------------------------------------
	addWind() {

			this.particleSystem.material.uniforms.radiusX.value = this.wind;

			m.TweenMax.from(
				this.particleSystem.material.uniforms.radiusX,
				3, {
					value: 30,
					ease: Quad.easeOut
				}
			);

		}
		// Utils --------------------------------------------------------------------------
	rand(v) {
			return (v * (Math.random() - 0.5));
		}
		// easy mobile device detection
	isMobileDevice() {

			if (navigator === undefined || navigator.userAgent === undefined) {

				return true;

			}

			var s = navigator.userAgent;

			if (s.match(/iPhone/i) ||
				s.match(/iPod/i) ||
				s.match(/webOS/i) ||
				s.match(/BlackBerry/i) ||
				(s.match(/Windows/i) && s.match(/Phone/i)) ||
				(s.match(/Android/i) && s.match(/Mobile/i))) {

				return true;

			}

			return false;

		}
		// 8 Bit Mode --------------------------------------------------------------------------
	createEightBitElements() {

		console.log('hello');

		var part, container, numParts = 20;
		var prefix = '/assets/textures/';
		var bitmaps = [{
			img: 'moose.gif',
			w: 64,
			h: 64
		}, {
			img: 'santa.gif',
			w: 128,
			h: 128
		}]

		var context = document.getElementById('eightbits').getContext('2d');

		console.log(context);
		var self = this;

		var imageObj = new Image();

		imageObj.onload = function() {
			context.drawImage(imageObj, 100, 100);
		};
		imageObj.src = prefix + bitmaps[0].img;

		m.TweenMax.to(
			imageObj,
			20, {
				x: 0
			}
		);




	}

}
