import * as THREE from "three";

export const createWalls = (scene) => {
  let floorGeo = new THREE.BoxGeometry(20, 20, 2);
  let floorMaterial = new THREE.MeshBasicMaterial({ color: "red" });
  let floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = Math.PI * 0.5;
  scene.add(floor);
};
