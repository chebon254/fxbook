import * as THREE from "https://cdn.skypack.dev/three@0.140.0/build/three.module";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/geometries/RoundedBoxGeometry.js";

const texture = {
	matcap:
		"https://images.unsplash.com/photo-1626908013943-df94de54984c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2673&q=80",
	skin:
		"https://images.unsplash.com/photo-1560780552-ba54683cb263?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
	env:
		"https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
};

const config = {
	scene: {
		speed: 0.2
	},
	object: {
		speed: 0
	}
};



class Control {
	constructor(props) {
		this.controls = new OrbitControls(props.camera, props.canvas);
		this.init();
	}
	init() {
		this.controls.target.set(0, 0, 0);
		this.controls.rotateSpeed = 0.9;
		this.controls.enableZoom = false;
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.02;
		//this.controls.minPolarAngle = 1.8;
		//this.controls.maxPolarAngle = 1.8;
		this.update();
	}
	update() {
		this.controls.update();
	}
}

class LightBar {
	constructor(props) {
		this.geometry(props.scene, props.uid);
	}
	geometry(e, i) {
		const amp = 1;
		const c_mat = new THREE.MeshBasicMaterial();
		const c_geo = new THREE.CapsuleGeometry(0.02, 0.5 + Math.random(), 5, 16);
		this.c_mes = new THREE.Mesh(c_geo, c_mat);
		this.c_mes.position.y =
			-Math.random() * (amp / 2) + Math.random() * (amp / 2);
		this.c_mes.position.x = -Math.sin(i * 0.3) * Math.PI;
		this.c_mes.position.z = -Math.cos(i * 0.3) * Math.PI;
		e.add(this.c_mes);
	}
}

class Space {
	constructor(props) {
		this.name = props.name ? props.name : "Null";
		this.canvas = props.canvas ? props.canvas : null;
		this.main();
	}
	main() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true
		});
		this.clock = new THREE.Clock();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(35);
		//this.camera.position.set(0, -1.7, 5);
		this.camera.position.set(0, -1.7, 5);
		this.scene.background = new THREE.Color(0x000a0b);
		this.control = new Control({ camera: this.camera, canvas: this.canvas });
		//--
		this.axesHelper = new THREE.AxesHelper(2);
		this.axesHelper.position.y = -1.5;
		//this.scene.add(this.axesHelper);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShoftSHadowMap;
		this.init();
	}
	init() {
		//this.lights();
		this.object();
		this.capsule();
		this.render();
		this.loop();
		this.resize();
	}
	lights() {
		this.h_light = new THREE.HemisphereLight(0xffffff, 0xaaaacc, 1);
		this.p_light = new THREE.PointLight(0xffffff, 0.2);
		this.p_light.castShadow = true;
		this.p_light.position.set(1, 5, 1);
		this.scene.add(this.h_light, this.p_light);
	}
	capsule() {
		for (let i = 0; i <= 20; i++) {
			const lightbar = new LightBar({ scene: this.scene, uid: i });
		}
	}
	object() {
		const o_geo = new RoundedBoxGeometry(1, 1, 1, 5, 0.05);
		const c_geo = new THREE.CircleGeometry(5, 5);
		const o_mat = new THREE.MeshMatcapMaterial({
			color: 0xffffff,
			//side: THREE.DoubleSide,
			matcap: new THREE.TextureLoader().load(texture.matcap),
			map: new THREE.TextureLoader().load(texture.env)
		});

		this.c_mes = new THREE.Mesh(c_geo, o_mat);
		this.o_mes = new THREE.Mesh(o_geo, o_mat);
		this.c_mes.rotateX(Math.PI / 2);
		this.c_mes.position.y = -1;
		this.scene.add(this.o_mes);
	}
	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	render() {
		this.scene.rotation.y = this.clock.getElapsedTime() * config.scene.speed;
		this.o_mes.rotation.y = -this.clock.getElapsedTime() * config.object.speed;
		this.o_mes.rotation.z = this.clock.getElapsedTime() * config.object.speed;
		this.o_mes.rotation.x = this.clock.getElapsedTime() * config.object.speed;
		this.o_mes.position.y =
			Math.sin(this.clock.getElapsedTime() * config.object.speed) * 0.2;
		this.camera.lookAt(this.scene.position);
		this.camera.updateMatrixWorld();
		this.renderer.render(this.scene, this.camera);
		this.control.update();
	}
	loop() {
		this.render();
		requestAnimationFrame(this.loop.bind(this));
	}
}

const canvas = document.querySelector("canvas");
const world = new Space({ canvas });
const panel = new Panel();
window.addEventListener("resize", () => world.resize());
window.addEventListener("load", () => world.resize());
world.resize();