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


var AnimateObject = function (THREE, worldScene, loader, SkeletonUtils) {
    var modelName = "Soldier";
    var meshName = "vanguard_Mesh";
    var animationName = "Idle";
    var currentAnimation = "idle";
    var position = {x: 10, y: -250, z: -100};
    var rotation = {x: 0, y: 0, z: 0};
    var scale = 200;
    var scene;
    var animations;
    var mesh;
    var clonedScene;
    var mixer;
    var selected = false;
    var cube2;
    var src = "./models/gltf/" + modelName + ".glb";
    loader.load(src, function (gltf) {

        scene = gltf.scene;
        animations = gltf.animations;
        // Enable Shadows

        gltf.scene.traverse(function (object) {

            if (object.isMesh) {

                object.castShadow = true;
            }

        });
        clonedScene = SkeletonUtils.clone(scene);
        if (clonedScene) {
            var clonedMesh = clonedScene.getObjectByName(meshName);
            if (clonedMesh) {


                mixer = new THREE.AnimationMixer(clonedMesh);
                var clip = THREE.AnimationClip.findByName(animations, animationName);

                if (clip) {

                    var action = mixer.clipAction(clip);
                    action.play();

                }

                mesh = clonedMesh;
                // Save the animation mixer in the list, will need it in the animation loop

            }

            worldScene.add(clonedScene);
            var cubeGeometry2 = new THREE.BoxGeometry(20, 20, 20);
            var cubeMaterial2 = new THREE.MeshBasicMaterial({color: 0xffff00});
            cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);

            cube2.position.set(position.x, 300, position.z);
            worldScene.add(cube2);
            clonedScene.position.set(position.x, position.y, position.z);
            clonedScene.scale.set(scale, scale, scale);
            clonedScene.rotation.x = rotation.x;
            clonedScene.rotation.y = rotation.y;
            clonedScene.rotation.z = rotation.z;
        }
    });


    this.animate = function (delta, raycaster) {
        if (mesh) {
            var intersects = raycaster.intersectObject(mesh);
            if (intersects.length > 0) {
                if (selected) {
                    animationName = "Idle";
                    selected = true;
                } else {
                    animationName = "Walk";
                    selected = false;
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

            }
        }



        if (mixer) {
            mixer.update(delta);
            switch (currentAnimation) {
                case "Run":
                    rotation.y += Math.PI / 360;
                    if (rotation.y > Math.PI * 2) {
                        rotation.y = 0;

                        console.log(rotation.y);
                    }
                    var Zap = position.z - 10 * Math.cos(rotation.y);
                    var Xap = position.x - 10 * Math.sin(rotation.y);
                    position.x = Xap;
                    position.z = Zap;
                    break;
                case "Walk":
//                    rotation.y += Math.PI / 180;
                    if (rotation.y > Math.PI * 2) {
                        rotation.y = 0;

                        console.log(rotation.y);
                    }
                    var Zap = position.z - 2 * Math.cos(rotation.y);
                    var Xap = position.x - 2 * Math.sin(rotation.y);
                    position.x = Xap;
                    position.z = Zap;
                    break;
                case "Idle":
//                    rotation.y += Math.PI / 180;
                    break;
            }
            clonedScene.position.set(position.x, position.y, position.z);
            clonedScene.scale.set(scale, scale, scale);
            clonedScene.rotation.x = rotation.x;
            clonedScene.rotation.y = rotation.y;
            clonedScene.rotation.z = rotation.z;
            if (selected) {
                cube2.position.set(position.x, 150, position.z);
            } else {
                cube2.position.set(position.x, -300, position.z);
            }

        }

    };
};

AnimateObject.prototype.constructor = AnimateObject;
export { AnimateObject };