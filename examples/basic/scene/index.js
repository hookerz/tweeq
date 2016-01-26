import tweeq from '../../../';
import three from 'three';
import loop from 'raf-loop';

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new three.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x1a1a1a);

const options = { spin: 1.0, wireframes: false };

const cubefactory = function() {

  let geo = new three.BoxGeometry(1, 1, 1);
  let mat = new three.MeshBasicMaterial({ color: 0xff0050 })

  return new three.Mesh(geo, mat);

}

const cube = cubefactory();
scene.add(cube);

const render = function(time) {

  cube.material.wireframe = options.wireframes;

  cube.rotation.x += 0.005 * options.spin;
  cube.rotation.y += 0.005 * options.spin;
  cube.rotation.z += 0.010 * options.spin;

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

export default {

  attach: el => el.appendChild(renderer.domElement),
  start:  engine.start.bind(engine),
  stop:   engine.stop.bind(engine)

}

const controls = tweeq.container();

controls.add('spin', options.spin)
  .on('change', value => options.spin = value);

controls.add('wireframes', options.wireframes)
  .on('change', value => options.wireframes = value);

export { controls };
