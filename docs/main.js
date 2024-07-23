/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var cannon_es__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cannon-es */ "./node_modules/cannon-es/dist/cannon-es.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");




class ThreeJSContainer {
    scene;
    cubes = [];
    cubeBodies = [];
    isStopped = false;
    world;
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x495ed));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update(); // アニメーションの更新
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        //ライトの設定
        const lves = [
            new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize(),
            new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(-1, 1, 1).clone().normalize(),
            new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, -1).clone().normalize(),
            new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(-1, 1, -1).clone().normalize(),
        ];
        for (let i = 0; i < lves.length; i++) {
            const light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0x797979);
            light.position.set(lves[i].x, lves[i].y, lves[i].z);
            this.scene.add(light);
        }
        //重力の設定
        this.world = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.World({ gravity: new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Vec3(0, -9.82, 0) });
        this.world.defaultContactMaterial.friction = 0.1;
        this.world.defaultContactMaterial.restitution = 0.0;
        //画像読み込み
        const loader = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader();
        const materials = [
            new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ map: loader.load('assets/dicenome_1.png') }),
            new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ map: loader.load('assets/dicenome_6.png') }),
            new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ map: loader.load('assets/dicenome_2.png') }),
            new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ map: loader.load('assets/dicenome_5.png') }),
            new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ map: loader.load('assets/dicenome_3.png') }),
            new three__WEBPACK_IMPORTED_MODULE_2__.MeshLambertMaterial({ map: loader.load('assets/dicenome_4.png') }),
        ];
        //立方体の作成
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(1, 1, 1);
        for (let i = 0; i < 3; i++) {
            const cube = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geometry, materials);
            cube.position.set(Math.random() * 5 - 2.5, Math.random() * 5 + 1, Math.random() * 5 - 2.5);
            cube.rotation.set(Math.random() * Math.PI * 2, // x軸の回転
            Math.random() * Math.PI * 2, // y軸の回転
            Math.random() * Math.PI * 2 // z軸の回転
            );
            cube.position.set(Math.random() * 5 - 2.5, Math.random() * 5 + 1, Math.random() * 5 - 2.5);
            this.scene.add(cube);
            this.cubes.push(cube);
            const cubeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Vec3(0.5, 0.5, 0.5));
            const cubeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Body({ mass: 1 });
            cubeBody.addShape(cubeShape);
            cubeBody.position.set(cube.position.x, cube.position.y, cube.position.z);
            cubeBody.quaternion.set(cube.quaternion.x, cube.quaternion.y, cube.quaternion.z, cube.quaternion.w);
            // 回転の初速を設定（ランダムな値を設定する例）
            const initialAngularVelocity = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Vec3(Math.random() * 10 - 5, // x軸の角速度
            Math.random() * 10 - 5, // y軸の角速度
            Math.random() * 10 - 5 // z軸の角速度
            );
            cubeBody.angularVelocity.set(initialAngularVelocity.x, initialAngularVelocity.y, initialAngularVelocity.z);
            this.world.addBody(cubeBody);
            this.cubeBodies.push(cubeBody);
        }
        const phongMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhongMaterial();
        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(10, 10);
        const planeMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(planeGeometry, phongMaterial);
        planeMesh.material.side = three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide; // 両面
        planeMesh.rotateX(-Math.PI / 2);
        this.scene.add(planeMesh);
        const planeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Plane();
        const planeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_3__.Body({ mass: 0 });
        planeBody.addShape(planeShape);
        planeBody.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);
        planeBody.quaternion.set(planeMesh.quaternion.x, planeMesh.quaternion.y, planeMesh.quaternion.z, planeMesh.quaternion.w);
        this.world.addBody(planeBody);
        let update = (time) => {
            this.world.fixedStep();
            this.isStopped = true; // Assume stopped unless we find motion
            for (let i = 0; i < this.cubes.length; i++) {
                const cube = this.cubes[i];
                const body = this.cubeBodies[i];
                cube.position.copy(this.cannonVec3ToThreeVec3(body.position));
                cube.quaternion.copy(this.cannonQuatToThreeQuat(body.quaternion));
                if (body.velocity.length() > 0.01 || body.angularVelocity.length() > 0.01) {
                    this.isStopped = false;
                }
            }
            if (this.isStopped) {
                console.log("ダイスが停止しました。目の取得を実行します。");
                this.getDiceFaces();
                return;
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    cannonVec3ToThreeVec3 = (cannonVec) => {
        return new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(cannonVec.x, cannonVec.y, cannonVec.z);
    };
    cannonQuatToThreeQuat = (cannonQuat) => {
        return new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion(cannonQuat.x, cannonQuat.y, cannonQuat.z, cannonQuat.w);
    };
    //ダイスの目の取得
    getDiceFaces = () => {
        let faces = []; // 各サイコロの面のインデックスを格納する配列
        this.cubes.forEach((cube, index) => {
            const cubeBody = this.cubeBodies[index];
            const worldQuat = new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion().copy(cube.quaternion);
            const worldMatrix = new three__WEBPACK_IMPORTED_MODULE_2__.Matrix4();
            worldMatrix.makeRotationFromQuaternion(worldQuat);
            const faceNormals = [
                new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, -1),
                new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 0, 0),
                new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 1),
                new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(-1, 0, 0),
                new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 1, 0),
                new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, -1, 0) // Bottom
            ];
            let maxDot = -1;
            let faceIndex = -1;
            faceNormals.forEach((normal, i) => {
                const worldNormal = normal.clone().clone().applyMatrix4(worldMatrix).clone().normalize();
                const dot = worldNormal.dot(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 1, 0));
                if (dot > maxDot) {
                    maxDot = dot;
                    faceIndex = i;
                }
            });
            faces[index] = faceIndex; // 各サイコロの面のインデックスを保存
        });
        // すべてのサイコロが同じ面を表示しているかを確認
        const allSame = faces.every(face => face === faces[0]);
        if (allSame) {
            console.log("すべてのサイコロが同じ面を表示しています！");
            // パーティクルエフェクトを表示
            this.createParticleSystem(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 1, 0)); // 必要に応じて位置を調整
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update();
        }
        else {
            console.log("サイコロの面は一致していません。");
        }
    };
    //花火をあげる処理
    createParticleSystem = (position) => {
        const generateSprite = () => {
            //新しいキャンバスの作成
            let canvas = document.createElement('canvas');
            canvas.width = 4;
            canvas.height = 4;
            //円形のグラデーションの作成
            let context = canvas.getContext('2d');
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.5, 'rgba(0,0,255,1)');
            gradient.addColorStop(1, 'rgba(0,0,255,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            //テクスチャの生成
            const texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 0.4,
            map: generateSprite(),
            transparent: true
        });
        const numPoints = 300; // 点の数
        const radius = 5; // 球の半径
        const positions = new Float32Array(numPoints * 3);
        for (let i = 0; i < numPoints; i++) {
            // Fibonacci スパイラルに基づいて均等に点を配置
            const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
            const theta = Math.sqrt(numPoints * Math.PI) * phi;
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions, 3));
        const points = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry, material);
        this.scene.add(points);
        let tweeninfo = { scale: 0.0, posY: 0.0 };
        let updateScale = () => {
            points.scale.set(tweeninfo.scale, tweeninfo.scale, tweeninfo.scale);
            points.position.y = tweeninfo.posY;
        };
        const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo)
            .to({ scale: 0.0, posY: 6 }, 1000)
            .onUpdate(updateScale);
        const tweenBack = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfo)
            .to({ scale: 1.0 }, 1000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Elastic.Out)
            .onUpdate(updateScale).onComplete(() => {
            this.scene.remove(points); // シーンからパーティクルを削除
            geometry.dispose(); // ジオメトリのリソースを解放
            material.dispose(); // マテリアルのリソースを解放
        });
        tween.chain(tweenBack);
        tween.start();
    };
    // キーボードイベントリスナーを追加
    addKeyboardEvents = () => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'r' || event.key === 'R') {
                this.createScene(); // サイコロを新しく作成して振る
            }
        });
    };
}
window.addEventListener("DOMContentLoaded", init);
// init 関数の修正
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(8, 14, 8));
    document.body.appendChild(viewport);
    container.addKeyboardEvents(); // キーボードイベントの追加
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_cannon-es_dist_cannon-es-180163"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCAqIGFzIENBTk5PTiBmcm9tICdjYW5ub24tZXMnO1xuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5cblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBjdWJlczogVEhSRUUuTWVzaFtdID0gW107XG4gICAgcHJpdmF0ZSBjdWJlQm9kaWVzOiBDQU5OT04uQm9keVtdID0gW107XG4gICAgcHJpdmF0ZSBpc1N0b3BwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHdvcmxkOiBDQU5OT04uV29ybGQ7XG5cbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSgpOyAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjga7mm7TmlrBcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIGNvbnN0IGx2ZXMgPSBbXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAxLCAxKS5ub3JtYWxpemUoKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIC0xKS5ub3JtYWxpemUoKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAxLCAtMSkubm9ybWFsaXplKCksXG4gICAgICAgIF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbHZlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweDc5Nzk3OSk7XG4gICAgICAgICAgICBsaWdodC5wb3NpdGlvbi5zZXQobHZlc1tpXS54LCBsdmVzW2ldLnksIGx2ZXNbaV0ueik7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChsaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL+mHjeWKm+OBruioreWumlxuICAgICAgICB0aGlzLndvcmxkID0gbmV3IENBTk5PTi5Xb3JsZCh7IGdyYXZpdHk6IG5ldyBDQU5OT04uVmVjMygwLCAtOS44MiwgMCkgfSk7XG4gICAgICAgIHRoaXMud29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5mcmljdGlvbiA9IDAuMTtcbiAgICAgICAgdGhpcy53b3JsZC5kZWZhdWx0Q29udGFjdE1hdGVyaWFsLnJlc3RpdHV0aW9uID0gMC4wO1xuXG4gICAgICAgIC8v55S75YOP6Kqt44G/6L6844G/XG4gICAgICAgIGNvbnN0IGxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFscyA9IFtcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgnYXNzZXRzL2RpY2Vub21lXzEucG5nJykgfSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ2Fzc2V0cy9kaWNlbm9tZV82LnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCdhc3NldHMvZGljZW5vbWVfMi5wbmcnKSB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgnYXNzZXRzL2RpY2Vub21lXzUucG5nJykgfSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ2Fzc2V0cy9kaWNlbm9tZV8zLnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCdhc3NldHMvZGljZW5vbWVfNC5wbmcnKSB9KSxcbiAgICAgICAgXTtcblxuICAgICAgICAvL+eri+aWueS9k+OBruS9nOaIkFxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAxLCAxKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICAgICAgICAgIGN1YmUucG9zaXRpb24uc2V0KE1hdGgucmFuZG9tKCkgKiA1IC0gMi41LCBNYXRoLnJhbmRvbSgpICogNSArIDEsIE1hdGgucmFuZG9tKCkgKiA1IC0gMi41KTtcbiAgICAgICAgICAgIGN1YmUucm90YXRpb24uc2V0KFxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMiwgLy8geOi7uOOBruWbnui7olxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMiwgLy8geei7uOOBruWbnui7olxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMiAgLy8geui7uOOBruWbnui7olxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGN1YmUucG9zaXRpb24uc2V0KE1hdGgucmFuZG9tKCkgKiA1IC0gMi41LCBNYXRoLnJhbmRvbSgpICogNSArIDEsIE1hdGgucmFuZG9tKCkgKiA1IC0gMi41KTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1YmUpO1xuICAgICAgICAgICAgdGhpcy5jdWJlcy5wdXNoKGN1YmUpO1xuICAgICAgICAgICAgY29uc3QgY3ViZVNoYXBlID0gbmV3IENBTk5PTi5Cb3gobmV3IENBTk5PTi5WZWMzKDAuNSwgMC41LCAwLjUpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMSB9KTtcbiAgICAgICAgICAgIGN1YmVCb2R5LmFkZFNoYXBlKGN1YmVTaGFwZSk7XG4gICAgICAgICAgICBjdWJlQm9keS5wb3NpdGlvbi5zZXQoY3ViZS5wb3NpdGlvbi54LCBjdWJlLnBvc2l0aW9uLnksIGN1YmUucG9zaXRpb24ueik7XG4gICAgICAgICAgICBjdWJlQm9keS5xdWF0ZXJuaW9uLnNldChjdWJlLnF1YXRlcm5pb24ueCwgY3ViZS5xdWF0ZXJuaW9uLnksIGN1YmUucXVhdGVybmlvbi56LCBjdWJlLnF1YXRlcm5pb24udyk7XG5cbiAgICAgICAgICAgIC8vIOWbnui7ouOBruWInemAn+OCkuioreWumu+8iOODqeODs+ODgOODoOOBquWApOOCkuioreWumuOBmeOCi+S+i++8iVxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbEFuZ3VsYXJWZWxvY2l0eSA9IG5ldyBDQU5OT04uVmVjMyhcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAgLSA1LCAvLyB46Lu444Gu6KeS6YCf5bqmXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwIC0gNSwgLy8geei7uOOBruinkumAn+W6plxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMCAtIDUgIC8vIHrou7jjga7op5LpgJ/luqZcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjdWJlQm9keS5hbmd1bGFyVmVsb2NpdHkuc2V0KGluaXRpYWxBbmd1bGFyVmVsb2NpdHkueCwgaW5pdGlhbEFuZ3VsYXJWZWxvY2l0eS55LCBpbml0aWFsQW5ndWxhclZlbG9jaXR5LnopO1xuXG4gICAgICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkoY3ViZUJvZHkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlQm9kaWVzLnB1c2goY3ViZUJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGhvbmdNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCgpO1xuICAgICAgICBjb25zdCBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTAsIDEwKTtcbiAgICAgICAgY29uc3QgcGxhbmVNZXNoID0gbmV3IFRIUkVFLk1lc2gocGxhbmVHZW9tZXRyeSwgcGhvbmdNYXRlcmlhbCk7XG4gICAgICAgIHBsYW5lTWVzaC5tYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTsgLy8g5Lih6Z2iXG4gICAgICAgIHBsYW5lTWVzaC5yb3RhdGVYKC1NYXRoLlBJIC8gMik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBsYW5lTWVzaCk7XG4gICAgICAgIGNvbnN0IHBsYW5lU2hhcGUgPSBuZXcgQ0FOTk9OLlBsYW5lKClcbiAgICAgICAgY29uc3QgcGxhbmVCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMCB9KVxuICAgICAgICBwbGFuZUJvZHkuYWRkU2hhcGUocGxhbmVTaGFwZSlcbiAgICAgICAgcGxhbmVCb2R5LnBvc2l0aW9uLnNldChwbGFuZU1lc2gucG9zaXRpb24ueCwgcGxhbmVNZXNoLnBvc2l0aW9uLnksIHBsYW5lTWVzaC5wb3NpdGlvbi56KTtcbiAgICAgICAgcGxhbmVCb2R5LnF1YXRlcm5pb24uc2V0KHBsYW5lTWVzaC5xdWF0ZXJuaW9uLngsIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnksIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnosIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLncpO1xuICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkocGxhbmVCb2R5KVxuXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMud29ybGQuZml4ZWRTdGVwKCk7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7IC8vIEFzc3VtZSBzdG9wcGVkIHVubGVzcyB3ZSBmaW5kIG1vdGlvblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmN1YmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZSA9IHRoaXMuY3ViZXNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuY3ViZUJvZGllc1tpXTtcbiAgICAgICAgICAgICAgICBjdWJlLnBvc2l0aW9uLmNvcHkodGhpcy5jYW5ub25WZWMzVG9UaHJlZVZlYzMoYm9keS5wb3NpdGlvbikpO1xuICAgICAgICAgICAgICAgIGN1YmUucXVhdGVybmlvbi5jb3B5KHRoaXMuY2Fubm9uUXVhdFRvVGhyZWVRdWF0KGJvZHkucXVhdGVybmlvbikpO1xuICAgICAgICAgICAgICAgIGlmIChib2R5LnZlbG9jaXR5Lmxlbmd0aCgpID4gMC4wMSB8fCBib2R5LmFuZ3VsYXJWZWxvY2l0eS5sZW5ndGgoKSA+IDAuMDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi44OA44Kk44K544GM5YGc5q2i44GX44G+44GX44Gf44CC55uu44Gu5Y+W5b6X44KS5a6f6KGM44GX44G+44GZ44CCXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljZUZhY2VzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbm5vblZlYzNUb1RocmVlVmVjMyA9IChjYW5ub25WZWM6IENBTk5PTi5WZWMzKTogVEhSRUUuVmVjdG9yMyA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyhjYW5ub25WZWMueCwgY2Fubm9uVmVjLnksIGNhbm5vblZlYy56KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbm5vblF1YXRUb1RocmVlUXVhdCA9IChjYW5ub25RdWF0OiBDQU5OT04uUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRIUkVFLlF1YXRlcm5pb24oY2Fubm9uUXVhdC54LCBjYW5ub25RdWF0LnksIGNhbm5vblF1YXQueiwgY2Fubm9uUXVhdC53KTtcbiAgICB9XG5cbiAgICAvL+ODgOOCpOOCueOBruebruOBruWPluW+l1xuICAgIHByaXZhdGUgZ2V0RGljZUZhY2VzID0gKCkgPT4ge1xuICAgICAgICBsZXQgZmFjZXMgPSBbXTsgLy8g5ZCE44K144Kk44Kz44Ot44Gu6Z2i44Gu44Kk44Oz44OH44OD44Kv44K544KS5qC857SN44GZ44KL6YWN5YiXXG5cbiAgICAgICAgdGhpcy5jdWJlcy5mb3JFYWNoKChjdWJlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3ViZUJvZHkgPSB0aGlzLmN1YmVCb2RpZXNbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3Qgd29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5jb3B5KGN1YmUucXVhdGVybmlvbik7XG4gICAgICAgICAgICBjb25zdCB3b3JsZE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgICAgICB3b3JsZE1hdHJpeC5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbih3b3JsZFF1YXQpO1xuXG4gICAgICAgICAgICBjb25zdCBmYWNlTm9ybWFscyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSksIC8vIEJhY2tcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKSwgLy8gUmlnaHRcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKSwgLy8gRnJvbnRcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtMSwgMCwgMCksIC8vIExlZnRcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgLy8gVG9wXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApIC8vIEJvdHRvbVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgbGV0IG1heERvdCA9IC0xO1xuICAgICAgICAgICAgbGV0IGZhY2VJbmRleCA9IC0xO1xuICAgICAgICAgICAgZmFjZU5vcm1hbHMuZm9yRWFjaCgobm9ybWFsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd29ybGROb3JtYWwgPSBub3JtYWwuY2xvbmUoKS5hcHBseU1hdHJpeDQod29ybGRNYXRyaXgpLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvdCA9IHdvcmxkTm9ybWFsLmRvdChuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSk7XG4gICAgICAgICAgICAgICAgaWYgKGRvdCA+IG1heERvdCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhEb3QgPSBkb3Q7XG4gICAgICAgICAgICAgICAgICAgIGZhY2VJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmYWNlc1tpbmRleF0gPSBmYWNlSW5kZXg7IC8vIOWQhOOCteOCpOOCs+ODreOBrumdouOBruOCpOODs+ODh+ODg+OCr+OCueOCkuS/neWtmFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyDjgZnjgbnjgabjga7jgrXjgqTjgrPjg63jgYzlkIzjgZjpnaLjgpLooajnpLrjgZfjgabjgYTjgovjgYvjgpLnorroqo1cbiAgICAgICAgY29uc3QgYWxsU2FtZSA9IGZhY2VzLmV2ZXJ5KGZhY2UgPT4gZmFjZSA9PT0gZmFjZXNbMF0pO1xuXG4gICAgICAgIGlmIChhbGxTYW1lKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuOBmeOBueOBpuOBruOCteOCpOOCs+ODreOBjOWQjOOBmOmdouOCkuihqOekuuOBl+OBpuOBhOOBvuOBme+8gVwiKTtcbiAgICAgICAgICAgIC8vIOODkeODvOODhuOCo+OCr+ODq+OCqOODleOCp+OCr+ODiOOCkuihqOekulxuICAgICAgICAgICAgdGhpcy5jcmVhdGVQYXJ0aWNsZVN5c3RlbShuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSk7IC8vIOW/heimgeOBq+W/nOOBmOOBpuS9jee9ruOCkuiqv+aVtFxuICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuOCteOCpOOCs+ODreOBrumdouOBr+S4gOiHtOOBl+OBpuOBhOOBvuOBm+OCk+OAglwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v6Iqx54Gr44KS44GC44GS44KL5Yem55CGXG4gICAgcHJpdmF0ZSBjcmVhdGVQYXJ0aWNsZVN5c3RlbSA9IChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZVNwcml0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8v5paw44GX44GE44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSA0O1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDQ7XG5cbiAgICAgICAgICAgIC8v5YaG5b2i44Gu44Kw44Op44OH44O844K344On44Oz44Gu5L2c5oiQXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgbGV0IGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgMCwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIGNhbnZhcy53aWR0aCAvIDIpO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyk7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAncmdiYSgwLDAsMjU1LDEpJyk7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDI1NSwwKScpO1xuXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgLy/jg4bjgq/jgrnjg4Hjg6Pjga7nlJ/miJBcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpO1xuICAgICAgICAgICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGV4dHVyZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBzaXplOiAwLjQsXG4gICAgICAgICAgICBtYXA6IGdlbmVyYXRlU3ByaXRlKCksXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBudW1Qb2ludHMgPSAzMDA7IC8vIOeCueOBruaVsFxuICAgICAgICBjb25zdCByYWRpdXMgPSA1OyAvLyDnkIPjga7ljYrlvoRcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShudW1Qb2ludHMgKiAzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVBvaW50czsgaSsrKSB7XG4gICAgICAgICAgICAvLyBGaWJvbmFjY2kg44K544OR44Kk44Op44Or44Gr5Z+644Gl44GE44Gm5Z2H562J44Gr54K544KS6YWN572uXG4gICAgICAgICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoMSAtIDIgKiAoaSArIDAuNSkgLyBudW1Qb2ludHMpO1xuICAgICAgICAgICAgY29uc3QgdGhldGEgPSBNYXRoLnNxcnQobnVtUG9pbnRzICogTWF0aC5QSSkgKiBwaGk7XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSByYWRpdXMgKiBNYXRoLmNvcyh0aGV0YSkgKiBNYXRoLnNpbihwaGkpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHJhZGl1cyAqIE1hdGguc2luKHRoZXRhKSAqIE1hdGguc2luKHBoaSk7XG4gICAgICAgICAgICBjb25zdCB6ID0gcmFkaXVzICogTWF0aC5jb3MocGhpKTtcblxuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzXSA9IHg7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDMgKyAxXSA9IHk7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDMgKyAyXSA9IHo7XG4gICAgICAgIH1cblxuICAgICAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwb2ludHMpO1xuXG4gICAgICAgIGxldCB0d2VlbmluZm8gPSB7IHNjYWxlOiAwLjAsIHBvc1k6IDAuMCB9O1xuICAgICAgICBsZXQgdXBkYXRlU2NhbGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBwb2ludHMuc2NhbGUuc2V0KHR3ZWVuaW5mby5zY2FsZSwgdHdlZW5pbmZvLnNjYWxlLCB0d2VlbmluZm8uc2NhbGUpO1xuICAgICAgICAgICAgcG9pbnRzLnBvc2l0aW9uLnkgPSB0d2VlbmluZm8ucG9zWTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAudG8oeyBzY2FsZTogMC4wLCBwb3NZOiA2IH0sIDEwMDApXG4gICAgICAgICAgICAub25VcGRhdGUodXBkYXRlU2NhbGUpXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgY29uc3QgdHdlZW5CYWNrID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mbylcbiAgICAgICAgICAgIC50byh7IHNjYWxlOiAxLjAgfSwgMTAwMClcbiAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0KVxuICAgICAgICAgICAgLm9uVXBkYXRlKHVwZGF0ZVNjYWxlKS5vbkNvbXBsZXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShwb2ludHMpOyAvLyDjgrfjg7zjg7PjgYvjgonjg5Hjg7zjg4bjgqPjgq/jg6vjgpLliYrpmaRcbiAgICAgICAgICAgICAgICBnZW9tZXRyeS5kaXNwb3NlKCk7IC8vIOOCuOOCquODoeODiOODquOBruODquOCveODvOOCueOCkuino+aUvlxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmRpc3Bvc2UoKTsgLy8g44Oe44OG44Oq44Ki44Or44Gu44Oq44K944O844K544KS6Kej5pS+XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdHdlZW4uY2hhaW4odHdlZW5CYWNrKTtcbiAgICAgICAgdHdlZW4uc3RhcnQoKTtcbiAgICB9XG5cbiAgICAvLyDjgq3jg7zjg5zjg7zjg4njgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLov73liqBcbiAgICBwdWJsaWMgYWRkS2V5Ym9hcmRFdmVudHMgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAncicgfHwgZXZlbnQua2V5ID09PSAnUicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7IC8vIOOCteOCpOOCs+ODreOCkuaWsOOBl+OBj+S9nOaIkOOBl+OBpuaMr+OCi1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuLy8gaW5pdCDplqLmlbDjga7kv67mraNcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMyg4LCAxNCwgOCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xuICAgIGNvbnRhaW5lci5hZGRLZXlib2FyZEV2ZW50cygpOyAvLyDjgq3jg7zjg5zjg7zjg4njgqTjg5njg7Pjg4jjga7ov73liqBcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdHdlZW5qc190d2Vlbl9qc19kaXN0X3R3ZWVuX2VzbV9qcy1ub2RlX21vZHVsZXNfY2Fubm9uLWVzX2Rpc3RfY2Fubm9uLWVzLTE4MDE2M1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==