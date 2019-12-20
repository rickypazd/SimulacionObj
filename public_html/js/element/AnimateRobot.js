/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AnimateRobot = function (THREE, worldScene, loader, position, rotation) {
    var states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
    var emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];
    var modelName = "RobotExpressive";
    var animationName = "Sitting";
    var currentAnimation = "Sitting";
    var position = position;
    var rotation = rotation;
    var scale = 90;
    var scene;
    var animations;
    var mesh;
    var clonedScene;
    var mixer;
    var turnosPensando = 0;
    var selected = false;
    var cube2;
    var repeat = true;
    var texto;
    this.changeAnim = function (name, rep) {
        repeat = rep;
        animationName = name;
    };
    this.getAnim = function (name) {

        return animationName;
    };
    this.getTurnosPensando = function () {

        return turnosPensando;
    };
    this.increTurnosPensando = function () {
        turnosPensando++;
    };
    this.resetTurnosPensando = function () {
        turnosPensando = 0;
    };
    var src = "./models/gltf/RobotExpressive/" + modelName + ".glb";

    loader.load(src, function (gltf) {

        scene = gltf.scene;

        animations = gltf.animations;
        // Enable Shadows

        gltf.scene.traverse(function (object) {

            if (object.isMesh) {

                object.castShadow = true;
            }

        });





        mixer = new THREE.AnimationMixer(scene);
        var clip = THREE.AnimationClip.findByName(animations, animationName);

        if (clip) {

            var action = mixer.clipAction(clip);
            action.play();
            if (!repeat) {
                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;
            }


        }


        // Save the animation mixer in the list, will need it in the animation loop



        worldScene.add(scene);
        var cubeGeometry2 = new THREE.BoxGeometry(20, 20, 20);
        var cubeMaterial2 = new THREE.MeshBasicMaterial({color: 0xffff00});
        cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);

        cube2.position.set(position.x, 300, position.z);
        worldScene.add(cube2);


        scene.position.set(position.x, position.y, position.z);
        scene.scale.set(scale, scale * 2, scale);
        scene.rotation.x = rotation.x;
        scene.rotation.y = rotation.y;
        scene.rotation.z = rotation.z;
    });



    this.animate = function (delta, raycaster) {
        if (mesh) {
            var intersects = raycaster.intersectObject(mesh);
            if (intersects.length > 0) {
                if (selected) {
                    animationName = "Jump";
                    alert();
                    selected = true;
                } else {
//                    animationName = "Walking";
//                    selected = false;
                }

            }

        }

        if (currentAnimation != animationName) {
            currentAnimation = animationName;
            var clip = THREE.AnimationClip.findByName(animations, animationName);

            if (clip) {
                mixer.stopAllAction();
                var action = mixer.clipAction(clip);
                action.play();
                if (!repeat) {
                    action.clampWhenFinished = true;
                    action.loop = THREE.LoopOnce;
                }

            }
        }



        if (mixer) {
            mixer.update(delta);
            switch (currentAnimation) {

                case "Walking":
//                    rotation.y += Math.PI / 180;
                    if (rotation.y > Math.PI * 2) {
                        rotation.y = 0;

                        console.log(rotation.y);
                    }
                    var Zap = position.z + 2 * Math.cos(rotation.y);
                    var Xap = position.x + 2 * Math.sin(rotation.y);
                    position.x = Xap;
                    position.z = Zap;
                    break;

            }
            scene.position.set(position.x, position.y, position.z);
            scene.scale.set(scale, scale, scale);
            scene.rotation.x = rotation.x;
            scene.rotation.y = rotation.y;
            scene.rotation.z = rotation.z;
            if (turnosPensando == 0) {
                cube2.position.set(position.x, 150, position.z);
            } else {
                cube2.position.set(position.x, -400, position.z);
            }
            
            


        }

    };
};

AnimateRobot.prototype.constructor = AnimateRobot;
export { AnimateRobot };