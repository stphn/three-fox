if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer, objects, particle1, particle2,
    light1, light2, light3, light4, dae ;

var NEAR = 10,
    FAR = 1000;
var FLOOR = -30;
var SHADOW_MAP_WIDTH = 2048,
    SHADOW_MAP_HEIGHT = 1024;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);

var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
loader.load('/model/fox.dae', function (collada) {

    dae = collada.scene;

    dae.traverse(function (child) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child instanceof THREE.SkinnedMesh) {

            var animation = new THREE.Animation(child, child.geometry.animation);
            animation.play();

        }

    });

    dae.scale.x = dae.scale.y = dae.scale.z = .06;

    dae.updateMatrix();

    init();
    animate();

});



function init() {

    container = document.querySelector('#world');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(2, 2, 3);

    scene = new THREE.Scene();

    // GROUND
    var geometry = new THREE.PlaneBufferGeometry(300, 300);
    var planeMaterial = new THREE.MeshPhongMaterial({
        //color: 0xcccc,
        transparent: true,
		opacity: .03
    });
    var ground = new THREE.Mesh(geometry, planeMaterial);
    ground.position.set(0, 0, FLOOR);
    ground.rotation.z = -Math.PI / 2;
    ground.scale.set(300, 300, 300);
    ground.castShadow = false;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid

    var size = 10,
        step = 1;

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
        color: 0xcccccc
    });

    for (var i = -size; i <= size; i += step) {

        geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
        geometry.vertices.push(new THREE.Vector3(size, -0.04, i));

        geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
        geometry.vertices.push(new THREE.Vector3(i, -0.04, size));

    }

    var line = new THREE.LineSegments(geometry, material);
    //scene.add( line );

    // Add the COLLADA

    scene.add(dae);


    // Lights
    // var sphere = new THREE.SphereGeometry(1, 20, 20);
	//
    // light1 = new THREE.PointLight(0xf78ae0, 1, 50);
    // light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    //     color: 0xf78ae0
    // })));
    // scene.add(light1);
    // light2 = new THREE.PointLight(0x563ffb, 1, 50);
    // light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    //     color: 0x563ffb
    // })));
    // scene.add(light2);
    // light3 = new THREE.PointLight(0xa9fecc, 1, 50);
    // light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    //     color: 0xa9fecc
    // })));
    // scene.add(light3);
    // light4 = new THREE.PointLight(0xeb6b5e, 1, 50);
    // light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    //     color: 0xeb6b5e
    // })));
    // scene.add(light4);

    // scene.add( new THREE.AmbientLight( 0xffffff ) );
	//
    // var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
    // directionalLight.position.x = Math.random() - 0;
    // directionalLight.position.y = Math.random() - 0;
    // directionalLight.position.z = Math.random() - 0;
    // directionalLight.position.normalize();
    // directionalLight.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 1200, 2500 ) );
    // directionalLight.shadow.bias = 0.0001;
    // directionalLight.castShadow = true;
    // directionalLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    // directionalLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    // scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer({
        alpha: true
    }); // alpha transparency
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    // LIGHTS
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    light = new THREE.SpotLight(0xf2e8d1, 1, 0, Math.PI / 2);
    light.position.set(0, 0, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(60, 1, 2, 190));
    //light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    scene.add(light);

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) * 1;
    mouseY = (event.clientY - windowHalfY) * 1;

}

var clock = new THREE.Clock();

function render() {

    var timer = Date.now() * 0.0005;

    camera.position.x = 0;
    camera.position.y = 0
    camera.position.z = 80;

    camera.position.x += (-mouseX - camera.position.x) * .05;
    //camera.position.y += (- mouseX - camera.position.y) * .0005;
    camera.position.z += (mouseY - camera.position.z) * .08;
    camera.position.y += (mouseY - camera.position.y) * .08;
    dae.position.y = (mouseY - dae.position.y) * .00008;
    dae.position.x = (-mouseX - dae.position.x) * .00008;
    camera.lookAt(scene.position);

    THREE.AnimationHandler.update(clock.getDelta());

    // light1.position.x = Math.sin(timer * .7) * 20;
    // light1.position.y = Math.cos(timer * .5) * 30;
    // light1.position.z = Math.cos(timer * .3) * 20;
    // light2.position.x = Math.cos(timer * .3) * 20;
    // light2.position.y = Math.sin(timer * .5) * 30;
    // light2.position.z = Math.sin(timer * .7) * 20;
    // light3.position.x = Math.sin(timer * .7) * 20;
    // light3.position.y = Math.cos(timer * .3) * 30;
    // light3.position.z = Math.sin(timer * .5) * 20;
    // light4.position.x = Math.sin(timer * .3) * 20;
    // light4.position.y = Math.cos(timer * .7) * 30;
    // light4.position.z = Math.sin(timer * .5) * 20;

    renderer.render(scene, camera);

}
