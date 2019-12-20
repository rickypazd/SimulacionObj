/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//-------------------------IMPORTS THREE----------------------------
import * as THREE from '../threeModules/build/three.module.js';
import { OrbitControls } from '../threeModules/jsm/controls/OrbitControls.js';
import { ColladaLoader } from '../threeModules/jsm/loaders/ColladaLoader.js';
import Stats from '../threeModules/jsm/libs/stats.module.js';
import { GLTFLoader } from '../threeModules/jsm/loaders/GLTFLoader.js';
import { SkeletonUtils } from '../threeModules/jsm/utils/SkeletonUtils.js';

//-------------------------IMPORTS ELEMENTS----------------------------
import { Renderer } from './element/Renderer.js';
import { Light } from './element/Light.js';
import { Terreno } from './element/Terreno.js';
import { AnimateObject } from './element/AnimateObject.js';
import { AnimateRobot } from './element/AnimateRobot.js';

//-------------------------VARIABLES GLOBALES----------------------------
var container;//div padre
var renderer;// Three Render
var worldScene;
var camera;//camara
var controls;//camara
var light;
var clock;
var terreno;
var animatedObjects = [];
var animatedObjectsDelete = [];
var cantidadFilo = 5;
var raycaster;
var mouse;
var turno = 0;
//-------------------------CALL FUNCTION TO START----------------------------

init();
animate();

//-------------------------INIT -> FUNCTION ----------------------------

function init() {
    //Crear la camara
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
//    camera.position.set(1000, 50, 1500);
    camera.position.set(1000, 50, 1500);

    //Iiciar reloj
    clock = new THREE.Clock();

    //Crear Scena
    worldScene = new THREE.Scene();
    worldScene.background = new THREE.Color(0xcce0ff);
    worldScene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
    worldScene.add(new THREE.AmbientLight(0x666666));

    //crear renderer 
    container = document.getElementById('container');
    renderer = new Renderer(THREE, container).renderer;

    ///Crear Luz
    light = new Light(THREE, worldScene);
    //CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1000;
    controls.maxDistance = 5000;
    //
    terreno = new Terreno(THREE, worldScene);

    var loader = new ColladaLoader();
    loader.load('./models/mesa/model.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = -250;
        avatar.position.y = -270;
        avatar.position.z = 400;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 3;
        

        worldScene.add(avatar);
    });
    loader.load('./models/Ramen/model.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = -200;
        avatar.position.y = -70;
        avatar.position.z = 250;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 15;
        avatar.rotation.z = Math.PI/2;

        worldScene.add(avatar);
    });
    loader.load('./models/Ramen/model.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = -150;
        avatar.position.y = -70;
        avatar.position.z = 100;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 15;
        

        worldScene.add(avatar);
    });
    loader.load('./models/Ramen/model.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = 0;
        avatar.position.y = -70;
        avatar.position.z = 350;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 15;
                avatar.rotation.z = Math.PI;

        worldScene.add(avatar);
    });
    loader.load('./models/Ramen/model.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = 180;
        avatar.position.y = -70;
        avatar.position.z = 120;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 15;
        

        worldScene.add(avatar);
    });
    loader.load('./models/Ramen/model.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = 250;
        avatar.position.y = -70;
        avatar.position.z = 300;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 15;
        
        avatar.rotation.z = -Math.PI/2;
        worldScene.add(avatar);
    });

 loader.load('./models/silla/model_1.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = 150;
        avatar.position.y =-250;
        avatar.position.z = -100;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 7;
        avatar.scale.z=5;


        worldScene.add(avatar);
    });
 loader.load('./models/silla/model_1.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = 50;
        avatar.position.y =-250;
        avatar.position.z = 620;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 7;
        avatar.scale.z=5;
        avatar.rotation.z = Math.PI;


        worldScene.add(avatar);
    });
 loader.load('./models/silla/model_1.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = -550;
        avatar.position.y =-250;
        avatar.position.z = 290;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 7;
        avatar.scale.z=5;
avatar.rotation.z = Math.PI/2;

        worldScene.add(avatar);
    });
 loader.load('./models/silla/model_1.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = 550;
        avatar.position.y =-250;
        avatar.position.z = 250;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 7;
        avatar.scale.z=5;
avatar.rotation.z = -Math.PI/2;

        worldScene.add(avatar);
    });
 loader.load('./models/silla/model_1.dae', function (collada) {
        var animations = collada.animations;
        var avatar = collada.scene;
        avatar.traverse(function (node) {
            if (node.isSkinnedMesh) {
                node.frustumCulled = false;
            }
        });
        avatar.position.x = -200;
        avatar.position.y =-250;
        avatar.position.z = -200;
        avatar.scale.x = avatar.scale.y = avatar.scale.z = 7;
        avatar.scale.z=5;


        worldScene.add(avatar);
    });
//    var animateObject1 = new AnimateObject(THREE, worldScene, new GLTFLoader(), SkeletonUtils);
//    animatedObjects.push(animateObject1);

    var animateRobot1 = new AnimateRobot(
            THREE,
            worldScene,
            new GLTFLoader(),
            {x: 400, y: -250, z: 300}, //position
            {x: 0, y: -(Math.PI / 2), z: 0}//Rotation
    );
    animateRobot1.changeAnim("Idle", true);
    var animateRobot2 = new AnimateRobot(
            THREE,
            worldScene,
            new GLTFLoader(),
            {x: 0, y: -250, z: 500}, //position
            {x: 0, y: (Math.PI), z: 0}//Rotation
    );
    animateRobot2.changeAnim("Idle", true);
    var animateRobot3 = new AnimateRobot(
            THREE,
            worldScene,
            new GLTFLoader(),
            {x: -400, y: -250, z: 300}, //position
            {x: 0, y: (Math.PI / 2), z: 0}//Rotation
    );
    animateRobot3.changeAnim("Idle", true);
    var animateRobot4 = new AnimateRobot(
            THREE,
            worldScene,
            new GLTFLoader(),
            {x: -150, y: -250, z: -50}, //position
            {x: 0, y: 0, z: 0}//Rotation
    );
    animateRobot4.changeAnim("Idle", true);
    var animateRobot5 = new AnimateRobot(
            THREE,
            worldScene,
            new GLTFLoader(),
            {x: 150, y: -250, z: -50}, //position
            {x: 0, y: 0, z: 0}//Rotation
    );
    animateRobot5.changeAnim("Idle", true);

    animatedObjects.push(animateRobot1);
    animatedObjects.push(animateRobot2);
    animatedObjects.push(animateRobot3);
    animatedObjects.push(animateRobot4);
    animatedObjects.push(animateRobot5);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = -10000;
    mouse.y = -10000;
    window.addEventListener('resize', onWindowResize, false);

    document.addEventListener('click', onDocumentMouseMove, false);
    document.getElementById("btnCambiar").addEventListener("click", function () {





        if (turno >= animatedObjects.length) {
            turno = 0;
        }
        if (animatedObjects.length < cantidadFilo / 2) {

        }
        var turnotemp = turno + 2;
        if (turnotemp >= animatedObjects.length) {
            turnotemp = turnotemp - (animatedObjects.length);

        }
        for (var i = 0; i < animatedObjects.length; i++) {
            if (i == turno || i == turnotemp) {
                animatedObjects[i].resetTurnosPensando();
                animatedObjects[i].changeAnim("Sitting", false);

            } else {
                animatedObjects[i].increTurnosPensando();
                if (animatedObjects[i].getTurnosPensando() >= 2) {
                    animatedObjects[i].changeAnim("Death", false);
                    animatedObjectsDelete.push(animatedObjects[i]);
                    animatedObjects.splice(i, 1);
                } else {


                    animatedObjects[i].changeAnim("Idle", true);
                }

            }

        }

        document.getElementById("turno").innerHTML = turno;
        turno++;





    });

//    alert("Termino Init");
}






function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}
function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
//-------------------------RENDER----------------------------

function animate() {

    requestAnimationFrame(animate);
    controls.update();
    // Get the time elapsed since the last frame

    var mixerUpdateDelta = clock.getDelta();

    // Update all the animation frames
    raycaster.setFromCamera(mouse, camera);

    for (var i = 0; i < animatedObjects.length; ++i) {
        animatedObjects[i].animate(mixerUpdateDelta, raycaster);

    }
    for (var i = 0; i < animatedObjectsDelete.length; ++i) {
        animatedObjectsDelete[i].animate(mixerUpdateDelta, raycaster);

    }

    renderer.render(worldScene, camera);

}

