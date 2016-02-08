import tweeq from '../../../';
import three from 'three';
import loop from 'raf-loop';

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new three.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x1a1a1a);

let geo = new three.BoxGeometry(1, 1, 1);
let mat = new three.MeshBasicMaterial({ color: 0xff0050 })

const cube = new three.Mesh(geo, mat);
scene.add(cube);

// Multiplies the cube motion.
let spinrate = 1.0;

const render = function(time) {

  cube.rotation.x += 0.005 * spinrate;
  cube.rotation.y += 0.005 * spinrate;
  cube.rotation.z += 0.010 * spinrate;

  renderer.render(scene, camera);

}

const resize = function() {

  let width = window.innerWidth;
  let height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

}

// Resize to the window.
window.addEventListener('resize', resize);

// Do the initial sizing.
resize();

// Construct the render loop.
const engine = loop(render);

window.cube = cube;

export const controls = tweeq.container();

controls
  .add('color', { pink: 0xff0050, red: 0xff0000, green: 0x00ff00, blue: 0x0000ff })
  .changed(val => cube.material.color.setHex(val));

controls
  .add('spin', spinrate, { min: 0, max: 2 })
  .changed(val => spinrate = val);

controls
  .add('position', cube.position)
  .changed(val => cube.position.set(val));

controls
  .add('wireframes', cube.material.wireframe)
  .changed(val => cube.material.wireframe = val);

export default {

  attach: el => el.appendChild(renderer.domElement),
  start:  engine.start.bind(engine),
  stop:   engine.stop.bind(engine)

}
