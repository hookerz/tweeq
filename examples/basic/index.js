import scene, { controls } from './scene';
import tweeq from '../../';

const $ = document.querySelector.bind(document);

controls.mount($('#controls'));

scene.attach($('#webgl'))
scene.start();
