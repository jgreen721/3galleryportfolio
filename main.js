import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";

let loaderEl = document.querySelector(".loader");
let mainEl = document.querySelector(".main");

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
loaderEl.appendChild(renderer.domElement);

// setTimeout(() => {
//   document.querySelector(".app").removeChild(loaderEl);
//   mainEl.appendChild(renderer.domElement);
// }, 1500);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  1,
  100,
  0.1
);
camera.position.z = 20;
camera.position.y = 8;
console.log(camera.position);

// camera.position.x = -4;

let gltfLoader = new GLTFLoader();
gltfLoader.load("frontendbackground.glb", (img) => {
  scene.add(img.scene);
});

const oc = new OrbitControls(camera, renderer.domElement);
oc.update();

let spotLight = new THREE.SpotLight();
spotLight.position.y = 10;
scene.add(spotLight);

let ambientLight = new THREE.AmbientLight("white", 0.2);
ambientLight.position.y = 10;
scene.add(ambientLight);

let movingSpotLight = new THREE.SpotLight("white", 5);
movingSpotLight.position.z = -3;
scene.add(movingSpotLight);

function animation() {
  renderer.render(scene, camera);
  TWEEN.update();
  requestAnimationFrame(animation);
}

animation();

onresize = (e) => {
  renderer.setSize(innerWidth, innerHeight);
};

let originalCoords = movingSpotLight.position;

function introCamera() {
  new TWEEN.Tween(movingSpotLight.position)
    .to({ x: 11, y: 4, z: 3 }, 2000)
    .start()
    .onUpdate(() => {
      movingSpotLight.position.x = movingSpotLight.position.x;
      movingSpotLight.position.y = movingSpotLight.position.y;
      movingSpotLight.position.z = movingSpotLight.position.z;
      // movingSpotLight.rotation.y = 1.33;
    })
    .onComplete(() => {
      console.log("WTF??", camera.rotation);

      lowerScene();
    });
}

// let cameraRotation = { x: -2.26, y: 1.09, z: 2.32 };
let pos = { y: 0 };
function lowerScene() {
  new TWEEN.Tween(pos)
    .to({ y: 100 }, 2000)
    .start()
    .onUpdate(() => {
      console.log(pos.y);
      loaderEl.style.transform = `translateY(${pos.y}vh)`;
      let opacity = 100 - pos.y;
      loaderEl.style.opacity = `${opacity}%`;
      // camera.rotation.set(4, 5, 2);
    });
}

introCamera();