var renderer,
    scene,
    camera,
    myCanvas = document.getElementById('canvas');

// Renderer
renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
});
renderer.setClearColor(0xe6ebe0, 1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Camera
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
// Scene
scene = new THREE.Scene();
// Lights
var light = new THREE.AmbientLight(0xffffff, .5)
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, .5)
scene.add(light1);

// Geometry
var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshPhongMaterial({
    color: 0xeb6b5e,
	// roughness: .5,
	// metalness: .5,
	specular: 0xfce094,
	shininess: 3,
	map: new THREE.TextureLoader().load('tex/seat-color.jpg'),
	normalMap: new THREE.TextureLoader().load('tex/seat-bump.jpg'),
	//transparent: true,
	//opacity: .5,
	// wireframe: true,
	// wireframeLinewidth: 6
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -1000;

scene.add(mesh);

// Render Loop
render()

function render() {
    mesh.rotation.x += .01;
    mesh.rotation.y += .01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
