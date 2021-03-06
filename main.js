import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRM } from '@pixiv/three-vrm';

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

// camera
const camera = new THREE.PerspectiveCamera( 30.0, window.innerWidth / window.innerHeight, 0.1, 20.0 );
camera.position.set( 0.0, 1.0, 5.0 );

const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load(

	// URL of the VRM you want to load
	'../firsto.vrm',

	// called when the resource is loaded
	( gltf ) => {

		// generate a VRM instance from gltf
		VRM.from( gltf ).then( ( vrm ) => {

			// add the loaded vrm to the scene
			scene.add( vrm.scene );

			// deal with vrm features
			console.log( vrm );

		} );

	},

	// called while loading is progressing
	( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),

	// called when loading has errors
	( error ) => console.error( error )

);

// controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.screenSpacePanning = true;
controls.target.set( 0.0, 1.0, 0.0 );
controls.update();

// light
const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1.0, 1.0, 1.0 ).normalize();
scene.add( light );

// helpers
const gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();