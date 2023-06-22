import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";
import { createWalls } from "./walls.js";

let loaderEl = document.querySelector(".loader");
let mainEl = document.querySelector(".main");
//2 individual animation frames, cancel one before starting the other.

const renderer = new THREE.WebGLRenderer();
const renderer2 = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
loaderEl.appendChild(renderer.domElement);
renderer2.setSize(innerWidth, innerHeight);
renderer2.shadowMap.enabled = true;
mainEl.appendChild(renderer2.domElement);

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
const gridHelper = new THREE.GridHelper(40, 40);
scene2.add(gridHelper);

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

const camera2 = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  1,
  100,
  0.1
);
camera2.position.z = 20;
camera2.position.y = 2;

// camera.position.x = -4;
let glbScene;
let gltfLoader = new GLTFLoader();
gltfLoader.load("frontendbackground.glb", (img) => {
  scene.add(img.scene);
  glbScene = img.scene;
  // img.scene.position.x = 0;
  img.scene.rotation.y = -0.9;
  console.log(glbScene);
});

const oc = new OrbitControls(camera, renderer.domElement);
oc.update();

const oc2 = new OrbitControls(camera2, renderer2.domElement);
oc2.update();

let spotLight = new THREE.SpotLight();
spotLight.position.y = 10;
scene.add(spotLight);

let ambientLight = new THREE.AmbientLight("white", 0.2);
ambientLight.position.y = 10;
scene.add(ambientLight);

let movingSpotLight = new THREE.SpotLight("white", 5);
movingSpotLight.position.z = -3;
scene.add(movingSpotLight);
let isLowered = false;

let lastTime = 0;
let dt = 0;
function animation(time = 0) {
  let firstAF = requestAnimationFrame(animation);

  lastTime = time - lastTime;
  dt += lastTime;
  lastTime = time;

  if (dt > 6000) {
    document.querySelector(".app").removeChild(loaderEl);
    galleryAnimation();
    createWalls(scene2);

    cancelAnimationFrame(firstAF);
  }

  renderer.render(scene, camera);
  TWEEN.update();
  if (glbScene?.rotation) {
    glbScene.rotation.y += 0.01;
    if (glbScene.rotation.y > 1.75 && !isLowered) {
      isLowered = true;
      lowerScene();
    }
  }

  console.log("SHUTUP!!!");
}

animation();

onresize = (e) => {
  renderer.setSize(innerWidth, innerHeight);
};

let pos = { y: 0 };

function lowerScene() {
  new TWEEN.Tween(pos)
    .to({ y: 100 }, 2000)
    .start()
    .onUpdate(() => {
      // console.log(pos.y);
      loaderEl.style.transform = `translateY(${pos.y}vh)`;
      let opacity = 100 - pos.y;
      loaderEl.style.opacity = `${opacity}%`;
      //  camera.rotation.set(4, 5, 2);
    })
    .onComplete(() => {
      // console.log(loaderEl);
      // cancelAnimationFrame(firstAF);
      // galleryAnimation();
    });
}

function galleryAnimation() {
  renderer2.render(scene2, camera2);
  TWEEN.update();
  console.log("HELLO!");

  requestAnimationFrame(galleryAnimation);
}
