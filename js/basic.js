var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true});

renderer.setClearColor(0xfafafa,.8);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
var scene = new THREE.Scene();

var light = new THREE.AmbientLight(0xffffff,.5)
scene.add(light);

var light1 = new THREE.PointLight(0xffffff,.5)
scene.add(light1);

var geometry = new THREE.BoxGeometry( 100,100,100 );
var material = new THREE.MeshLambertMaterial({ color: 0xf399fe2 });
var mesh = new THREE.Mesh(geometry,material);
mesh.position.set(0,0,-1000);

scene.add(mesh);
render();

function render() {
	mesh.rotation.x += .01;
	mesh.rotation.y += .01;
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}
