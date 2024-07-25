/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var cannon_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cannon-es */ "./node_modules/cannon-es/dist/cannon-es.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var three_examples_jsm_loaders_FontLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/FontLoader */ "./node_modules/three/examples/jsm/loaders/FontLoader.js");
/* harmony import */ var three_examples_jsm_geometries_TextGeometry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/geometries/TextGeometry */ "./node_modules/three/examples/jsm/geometries/TextGeometry.js");






class ThreeJSContainer {
    scene;
    cubes = [];
    cubeBodies = [];
    isStopped = false;
    world;
    font;
    textMeshes = [];
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x495ed));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_1__.PCFSoftShadowMap; // シャドウの種類も設定できます
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.update(); // アニメーションの更新
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    loadFont = (callback) => {
        const loader = new three_examples_jsm_loaders_FontLoader__WEBPACK_IMPORTED_MODULE_3__.FontLoader();
        loader.load('assets/helvetiker_regular.typeface.json', callback);
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        //重力の設定
        this.world = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.World({ gravity: new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Vec3(0, -9.82, 0) });
        this.world.defaultContactMaterial.friction = 0.1;
        this.world.defaultContactMaterial.restitution = 0.0;
        // フォントの読み込み
        this.loadFont((font) => {
            this.font = font;
        });
        //ライトの設定
        const lves = [
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(10, 10, 10).clone().normalize(),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-10, 10, 10).clone().normalize(),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(10, 10, -10).clone().normalize(),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-10, 10, -10).clone().normalize(),
        ];
        for (let i = 0; i < lves.length; i++) {
            const light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff, 1); // 強さを1に設定
            light.position.set(lves[i].x, lves[i].y, lves[i].z);
            light.castShadow = true;
            this.scene.add(light);
        }
        let light = new three__WEBPACK_IMPORTED_MODULE_1__.PointLight(0xffffff, 1.0);
        light.position.set(5, 5, 5);
        light.castShadow = true;
        //画像読み込み
        const loader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const materials = [
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: loader.load('assets/dicenome_1.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: loader.load('assets/dicenome_6.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: loader.load('assets/dicenome_2.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: loader.load('assets/dicenome_5.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: loader.load('assets/dicenome_3.png') }),
            new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: loader.load('assets/dicenome_4.png') }),
        ];
        //立方体の作成
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 1, 1);
        // 三角形の頂点の座標を設定
        const triangleVertices = [
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 5, -2.5),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(2.5, 5, Math.sqrt(3) * 2.5 - 2),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-2.5, 5, Math.sqrt(3) * 2.5 - 2) // 頂点C
        ];
        for (let i = 0; i < 3; i++) {
            const cube = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, materials);
            // 三角形の頂点の位置に立方体を配置
            const vertex = triangleVertices[i];
            cube.position.set(vertex.x, vertex.y, vertex.z);
            cube.rotation.set(Math.random() * Math.PI * 2, // x軸の回転
            Math.random() * Math.PI * 2, // y軸の回転
            Math.random() * Math.PI * 2 // z軸の回転
            );
            cube.castShadow = true;
            cube.receiveShadow = true;
            this.scene.add(cube);
            this.cubes.push(cube);
            const cubeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Vec3(0.5, 0.5, 0.5));
            const cubeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Body({ mass: 1 });
            cubeBody.addShape(cubeShape);
            cubeBody.position.set(cube.position.x, cube.position.y, cube.position.z);
            cubeBody.quaternion.set(cube.quaternion.x, cube.quaternion.y, cube.quaternion.z, cube.quaternion.w);
            // 回転の初速を設定（ランダムな値を設定する例）
            const initialAngularVelocity = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Vec3(Math.random() * 10, // x軸の角速度
            Math.random() * 10, // y軸の角速度
            Math.random() * 10 // z軸の角速度
            );
            cubeBody.angularVelocity.set(initialAngularVelocity.x, initialAngularVelocity.y, initialAngularVelocity.z);
            this.world.addBody(cubeBody);
            this.cubeBodies.push(cubeBody);
        }
        const phongMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial();
        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(10, 10);
        const planeMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(planeGeometry, phongMaterial);
        planeMesh.material.side = three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide; // 両面
        planeMesh.rotateX(-Math.PI / 2);
        this.scene.add(planeMesh);
        const planeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Plane();
        const planeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Body({ mass: 0 });
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
        return new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(cannonVec.x, cannonVec.y, cannonVec.z);
    };
    cannonQuatToThreeQuat = (cannonQuat) => {
        return new three__WEBPACK_IMPORTED_MODULE_1__.Quaternion(cannonQuat.x, cannonQuat.y, cannonQuat.z, cannonQuat.w);
    };
    //ダイスの目の取得
    getDiceFaces = () => {
        let faces = []; // 各サイコロの面のインデックスを格納する配列
        this.cubes.forEach((cube, index) => {
            const cubeBody = this.cubeBodies[index];
            const worldQuat = new three__WEBPACK_IMPORTED_MODULE_1__.Quaternion().copy(cube.quaternion);
            const worldMatrix = new three__WEBPACK_IMPORTED_MODULE_1__.Matrix4();
            worldMatrix.makeRotationFromQuaternion(worldQuat);
            const faceNormals = [
                new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 0, 0),
                new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0),
                new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 1),
                new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, -1),
                new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0),
                new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1, 0, 0), // Left
            ];
            let maxDot = -1;
            let faceIndex = -1;
            faceNormals.forEach((normal, i) => {
                const worldNormal = normal.clone().clone().applyMatrix4(worldMatrix).clone().normalize();
                const dot = worldNormal.dot(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0));
                if (dot > maxDot) {
                    maxDot = dot;
                    faceIndex = i;
                }
            });
            faces[index] = faceIndex; // 各サイコロの面のインデックスを保存
        });
        // サイコロの面の表示をコンソールに出力
        faces.forEach((face, index) => {
            console.log(`サイコロ ${index + 1}: ${face + 1}`); // インデックスを1から始める
        });
        this.showDiceFaces(faces);
        // すべてのサイコロが同じ面を表示しているかを確認
        const allSame = faces.every(face => face === faces[0]);
        if (allSame) {
            console.log("すべてのサイコロが同じ面を表示しています！");
            // パーティクルエフェクトを表示
            this.createParticleSystem(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0)); // 必要に応じて位置を調整
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.update();
        }
        else {
            console.log("サイコロの面は一致していません。");
        }
        faces = [];
    };
    //ダイスの目を表示するテキストを作成する
    showDiceFaces = (faces) => {
        this.textMeshes.forEach(mesh => this.scene.remove(mesh));
        this.textMeshes = [];
        faces.forEach((face, index) => {
            const textGeometry = new three_examples_jsm_geometries_TextGeometry__WEBPACK_IMPORTED_MODULE_5__.TextGeometry(`${face + 1}`, {
                font: this.font,
                size: 0.5,
                height: 0.1,
            });
            const textMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(textGeometry, textMaterial);
            textMesh.position.set(-5, 8 - index, 0); // 適切な位置にテキストを配置
            this.scene.add(textMesh);
            this.textMeshes.push(textMesh);
        });
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
            const texture = new three__WEBPACK_IMPORTED_MODULE_1__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
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
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(positions, 3));
        const points = new three__WEBPACK_IMPORTED_MODULE_1__.Points(geometry, material);
        this.scene.add(points);
        let tweeninfo = { scale: 0.0, posY: 0.0 };
        let updateScale = () => {
            points.scale.set(tweeninfo.scale, tweeninfo.scale, tweeninfo.scale);
            points.position.y = tweeninfo.posY;
        };
        const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(tweeninfo)
            .to({ scale: 0.0, posY: 6 }, 1000)
            .onUpdate(updateScale);
        const tweenBack = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(tweeninfo)
            .to({ scale: 1.0 }, 2000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
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
            if (this.isStopped) {
                if (event.key === 'r' || event.key === 'R') {
                    this.isStopped = false;
                    this.createScene(); // サイコロを新しく作成して振る
                }
            }
        });
    };
}
window.addEventListener("DOMContentLoaded", init);
// init 関数の修正
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 10, 10));
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_cannon-es_dist_cannon-es-04b2ee"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XG5pbXBvcnQgKiBhcyBDQU5OT04gZnJvbSAnY2Fubm9uLWVzJztcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuaW1wb3J0IHsgRm9udExvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0ZvbnRMb2FkZXInO1xuaW1wb3J0IHsgVGV4dEdlb21ldHJ5IH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2dlb21ldHJpZXMvVGV4dEdlb21ldHJ5JztcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBjdWJlczogVEhSRUUuTWVzaFtdID0gW107XG4gICAgcHJpdmF0ZSBjdWJlQm9kaWVzOiBDQU5OT04uQm9keVtdID0gW107XG4gICAgcHJpdmF0ZSBpc1N0b3BwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHdvcmxkOiBDQU5OT04uV29ybGQ7XG4gICAgcHJpdmF0ZSBmb250OiBUSFJFRS5Gb250O1xuICAgIHByaXZhdGUgdGV4dE1lc2hlczogVEhSRUUuTWVzaFtdID0gW107XG5cbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7IC8vIOOCt+ODo+ODieOCpuOBrueorumhnuOCguioreWumuOBp+OBjeOBvuOBmVxuXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSgpOyAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjga7mm7TmlrBcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRm9udCA9IChjYWxsYmFjazogKGZvbnQ6IFRIUkVFLkZvbnQpID0+IHZvaWQpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IEZvbnRMb2FkZXIoKTtcbiAgICAgICAgbG9hZGVyLmxvYWQoJ2Fzc2V0cy9oZWx2ZXRpa2VyX3JlZ3VsYXIudHlwZWZhY2UuanNvbicsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgLy/ph43lipvjga7oqK3lrppcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBDQU5OT04uV29ybGQoeyBncmF2aXR5OiBuZXcgQ0FOTk9OLlZlYzMoMCwgLTkuODIsIDApIH0pO1xuICAgICAgICB0aGlzLndvcmxkLmRlZmF1bHRDb250YWN0TWF0ZXJpYWwuZnJpY3Rpb24gPSAwLjE7XG4gICAgICAgIHRoaXMud29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5yZXN0aXR1dGlvbiA9IDAuMDtcblxuICAgICAgICAvLyDjg5Xjgqnjg7Pjg4jjga7oqq3jgb/ovrzjgb9cbiAgICAgICAgdGhpcy5sb2FkRm9udCgoZm9udCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy/jg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgY29uc3QgbHZlcyA9IFtcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEwLCAxMCwgMTApLm5vcm1hbGl6ZSgpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEwLCAxMCwgMTApLm5vcm1hbGl6ZSgpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMTAsIDEwLCAtMTApLm5vcm1hbGl6ZSgpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEwLCAxMCwgLTEwKS5ub3JtYWxpemUoKSxcbiAgICAgICAgXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAxKTsgLy8g5by344GV44KSMeOBq+ioreWumlxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KGx2ZXNbaV0ueCwgbHZlc1tpXS55LCBsdmVzW2ldLnopO1xuICAgICAgICAgICAgbGlnaHQuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChsaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgMS4wKTtcbiAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KDUsIDUsIDUpO1xuICAgICAgICBsaWdodC5jYXN0U2hhZG93ID0gdHJ1ZTtcblxuICAgICAgICAvL+eUu+WDj+iqreOBv+i+vOOBv1xuICAgICAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBbXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ2Fzc2V0cy9kaWNlbm9tZV8xLnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCdhc3NldHMvZGljZW5vbWVfNi5wbmcnKSB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgnYXNzZXRzL2RpY2Vub21lXzIucG5nJykgfSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ2Fzc2V0cy9kaWNlbm9tZV81LnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCdhc3NldHMvZGljZW5vbWVfMy5wbmcnKSB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgnYXNzZXRzL2RpY2Vub21lXzQucG5nJykgfSksXG4gICAgICAgIF07XG5cbiAgICAgICAgLy/nq4vmlrnkvZPjga7kvZzmiJBcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMSwgMSwgMSk7XG4gICAgICAgIC8vIOS4ieinkuW9ouOBrumggueCueOBruW6p+aomeOCkuioreWumlxuICAgICAgICBjb25zdCB0cmlhbmdsZVZlcnRpY2VzID0gW1xuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgNSwgLTIuNSksIC8vIOmggueCuUFcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDIuNSwgNSwgTWF0aC5zcXJ0KDMpICogMi41IC0gMiksIC8vIOmggueCuUJcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0yLjUsIDUsIE1hdGguc3FydCgzKSAqIDIuNSAtIDIpIC8vIOmggueCuUNcbiAgICAgICAgXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICAgICAgICAgIC8vIOS4ieinkuW9ouOBrumggueCueOBruS9jee9ruOBq+eri+aWueS9k+OCkumFjee9rlxuICAgICAgICAgICAgY29uc3QgdmVydGV4ID0gdHJpYW5nbGVWZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIGN1YmUucG9zaXRpb24uc2V0KHZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnopO1xuICAgICAgICAgICAgY3ViZS5yb3RhdGlvbi5zZXQoXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyLCAvLyB46Lu444Gu5Zue6LuiXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyLCAvLyB56Lu444Gu5Zue6LuiXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyICAvLyB66Lu444Gu5Zue6LuiXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjdWJlLmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgY3ViZS5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1YmUpO1xuICAgICAgICAgICAgdGhpcy5jdWJlcy5wdXNoKGN1YmUpO1xuICAgICAgICAgICAgY29uc3QgY3ViZVNoYXBlID0gbmV3IENBTk5PTi5Cb3gobmV3IENBTk5PTi5WZWMzKDAuNSwgMC41LCAwLjUpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMSB9KTtcbiAgICAgICAgICAgIGN1YmVCb2R5LmFkZFNoYXBlKGN1YmVTaGFwZSk7XG4gICAgICAgICAgICBjdWJlQm9keS5wb3NpdGlvbi5zZXQoY3ViZS5wb3NpdGlvbi54LCBjdWJlLnBvc2l0aW9uLnksIGN1YmUucG9zaXRpb24ueik7XG4gICAgICAgICAgICBjdWJlQm9keS5xdWF0ZXJuaW9uLnNldChjdWJlLnF1YXRlcm5pb24ueCwgY3ViZS5xdWF0ZXJuaW9uLnksIGN1YmUucXVhdGVybmlvbi56LCBjdWJlLnF1YXRlcm5pb24udyk7XG5cbiAgICAgICAgICAgIC8vIOWbnui7ouOBruWInemAn+OCkuioreWumu+8iOODqeODs+ODgOODoOOBquWApOOCkuioreWumuOBmeOCi+S+i++8iVxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbEFuZ3VsYXJWZWxvY2l0eSA9IG5ldyBDQU5OT04uVmVjMyhcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAsIC8vIHjou7jjga7op5LpgJ/luqZcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAsIC8vIHnou7jjga7op5LpgJ/luqZcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAgICAvLyB66Lu444Gu6KeS6YCf5bqmXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY3ViZUJvZHkuYW5ndWxhclZlbG9jaXR5LnNldChpbml0aWFsQW5ndWxhclZlbG9jaXR5LngsIGluaXRpYWxBbmd1bGFyVmVsb2NpdHkueSwgaW5pdGlhbEFuZ3VsYXJWZWxvY2l0eS56KTtcblxuICAgICAgICAgICAgdGhpcy53b3JsZC5hZGRCb2R5KGN1YmVCb2R5KTtcbiAgICAgICAgICAgIHRoaXMuY3ViZUJvZGllcy5wdXNoKGN1YmVCb2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBob25nTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoKTtcbiAgICAgICAgY29uc3QgcGxhbmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDEwLCAxMCk7XG4gICAgICAgIGNvbnN0IHBsYW5lTWVzaCA9IG5ldyBUSFJFRS5NZXNoKHBsYW5lR2VvbWV0cnksIHBob25nTWF0ZXJpYWwpO1xuICAgICAgICBwbGFuZU1lc2gubWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7IC8vIOS4oemdolxuICAgICAgICBwbGFuZU1lc2gucm90YXRlWCgtTWF0aC5QSSAvIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwbGFuZU1lc2gpO1xuICAgICAgICBjb25zdCBwbGFuZVNoYXBlID0gbmV3IENBTk5PTi5QbGFuZSgpXG4gICAgICAgIGNvbnN0IHBsYW5lQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDAgfSlcbiAgICAgICAgcGxhbmVCb2R5LmFkZFNoYXBlKHBsYW5lU2hhcGUpXG4gICAgICAgIHBsYW5lQm9keS5wb3NpdGlvbi5zZXQocGxhbmVNZXNoLnBvc2l0aW9uLngsIHBsYW5lTWVzaC5wb3NpdGlvbi55LCBwbGFuZU1lc2gucG9zaXRpb24ueik7XG4gICAgICAgIHBsYW5lQm9keS5xdWF0ZXJuaW9uLnNldChwbGFuZU1lc2gucXVhdGVybmlvbi54LCBwbGFuZU1lc2gucXVhdGVybmlvbi55LCBwbGFuZU1lc2gucXVhdGVybmlvbi56LCBwbGFuZU1lc2gucXVhdGVybmlvbi53KTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRCb2R5KHBsYW5lQm9keSlcblxuICAgICAgICBsZXQgdXBkYXRlOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndvcmxkLmZpeGVkU3RlcCgpO1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlOyAvLyBBc3N1bWUgc3RvcHBlZCB1bmxlc3Mgd2UgZmluZCBtb3Rpb25cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jdWJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1YmUgPSB0aGlzLmN1YmVzW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmN1YmVCb2RpZXNbaV07XG4gICAgICAgICAgICAgICAgY3ViZS5wb3NpdGlvbi5jb3B5KHRoaXMuY2Fubm9uVmVjM1RvVGhyZWVWZWMzKGJvZHkucG9zaXRpb24pKTtcbiAgICAgICAgICAgICAgICBjdWJlLnF1YXRlcm5pb24uY29weSh0aGlzLmNhbm5vblF1YXRUb1RocmVlUXVhdChib2R5LnF1YXRlcm5pb24pKTtcbiAgICAgICAgICAgICAgICBpZiAoYm9keS52ZWxvY2l0eS5sZW5ndGgoKSA+IDAuMDEgfHwgYm9keS5hbmd1bGFyVmVsb2NpdHkubGVuZ3RoKCkgPiAwLjAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLjg4DjgqTjgrnjgYzlgZzmraLjgZfjgb7jgZfjgZ/jgILnm67jga7lj5blvpfjgpLlrp/ooYzjgZfjgb7jgZnjgIJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWNlRmFjZXMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2Fubm9uVmVjM1RvVGhyZWVWZWMzID0gKGNhbm5vblZlYzogQ0FOTk9OLlZlYzMpOiBUSFJFRS5WZWN0b3IzID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKGNhbm5vblZlYy54LCBjYW5ub25WZWMueSwgY2Fubm9uVmVjLnopO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2Fubm9uUXVhdFRvVGhyZWVRdWF0ID0gKGNhbm5vblF1YXQ6IENBTk5PTi5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgVEhSRUUuUXVhdGVybmlvbihjYW5ub25RdWF0LngsIGNhbm5vblF1YXQueSwgY2Fubm9uUXVhdC56LCBjYW5ub25RdWF0LncpO1xuICAgIH1cblxuICAgIC8v44OA44Kk44K544Gu55uu44Gu5Y+W5b6XXG4gICAgcHJpdmF0ZSBnZXREaWNlRmFjZXMgPSAoKSA9PiB7XG4gICAgICAgIGxldCBmYWNlcyA9IFtdOyAvLyDlkITjgrXjgqTjgrPjg63jga7pnaLjga7jgqTjg7Pjg4fjg4Pjgq/jgrnjgpLmoLzntI3jgZnjgovphY3liJdcblxuICAgICAgICB0aGlzLmN1YmVzLmZvckVhY2goKGN1YmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdWJlQm9keSA9IHRoaXMuY3ViZUJvZGllc1tpbmRleF07XG4gICAgICAgICAgICBjb25zdCB3b3JsZFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpLmNvcHkoY3ViZS5xdWF0ZXJuaW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHdvcmxkTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgICAgICAgIHdvcmxkTWF0cml4Lm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKHdvcmxkUXVhdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZhY2VOb3JtYWxzID0gW1xuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCAvLyBSaWdodFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLCAvLyBUb3BcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKSwgLy8gRnJvbnRcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSksIC8vIEJhY2tcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAtMSwgMCksLy8gQm90dG9tXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApLCAvLyBMZWZ0XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBsZXQgbWF4RG90ID0gLTE7XG4gICAgICAgICAgICBsZXQgZmFjZUluZGV4ID0gLTE7XG4gICAgICAgICAgICBmYWNlTm9ybWFscy5mb3JFYWNoKChub3JtYWwsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JsZE5vcm1hbCA9IG5vcm1hbC5jbG9uZSgpLmFwcGx5TWF0cml4NCh3b3JsZE1hdHJpeCkubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZG90ID0gd29ybGROb3JtYWwuZG90KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApKTtcbiAgICAgICAgICAgICAgICBpZiAoZG90ID4gbWF4RG90KSB7XG4gICAgICAgICAgICAgICAgICAgIG1heERvdCA9IGRvdDtcbiAgICAgICAgICAgICAgICAgICAgZmFjZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZhY2VzW2luZGV4XSA9IGZhY2VJbmRleDsgLy8g5ZCE44K144Kk44Kz44Ot44Gu6Z2i44Gu44Kk44Oz44OH44OD44Kv44K544KS5L+d5a2YXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIOOCteOCpOOCs+ODreOBrumdouOBruihqOekuuOCkuOCs+ODs+OCveODvOODq+OBq+WHuuWKm1xuICAgICAgICBmYWNlcy5mb3JFYWNoKChmYWNlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYOOCteOCpOOCs+ODrSAke2luZGV4ICsgMX06ICR7ZmFjZSArIDF9YCk7IC8vIOOCpOODs+ODh+ODg+OCr+OCueOCkjHjgYvjgonlp4vjgoHjgotcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zaG93RGljZUZhY2VzKGZhY2VzKTtcblxuICAgICAgICAvLyDjgZnjgbnjgabjga7jgrXjgqTjgrPjg63jgYzlkIzjgZjpnaLjgpLooajnpLrjgZfjgabjgYTjgovjgYvjgpLnorroqo1cbiAgICAgICAgY29uc3QgYWxsU2FtZSA9IGZhY2VzLmV2ZXJ5KGZhY2UgPT4gZmFjZSA9PT0gZmFjZXNbMF0pO1xuXG4gICAgICAgIGlmIChhbGxTYW1lKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuOBmeOBueOBpuOBruOCteOCpOOCs+ODreOBjOWQjOOBmOmdouOCkuihqOekuuOBl+OBpuOBhOOBvuOBme+8gVwiKTtcbiAgICAgICAgICAgIC8vIOODkeODvOODhuOCo+OCr+ODq+OCqOODleOCp+OCr+ODiOOCkuihqOekulxuICAgICAgICAgICAgdGhpcy5jcmVhdGVQYXJ0aWNsZVN5c3RlbShuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSk7IC8vIOW/heimgeOBq+W/nOOBmOOBpuS9jee9ruOCkuiqv+aVtFxuICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuOCteOCpOOCs+ODreOBrumdouOBr+S4gOiHtOOBl+OBpuOBhOOBvuOBm+OCk+OAglwiKTtcbiAgICAgICAgfVxuICAgICAgICBmYWNlcyA9IFtdO1xuICAgIH1cblxuICAgIC8v44OA44Kk44K544Gu55uu44KS6KGo56S644GZ44KL44OG44Kt44K544OI44KS5L2c5oiQ44GZ44KLXG4gICAgcHJpdmF0ZSBzaG93RGljZUZhY2VzID0gKGZhY2VzOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICB0aGlzLnRleHRNZXNoZXMuZm9yRWFjaChtZXNoID0+IHRoaXMuc2NlbmUucmVtb3ZlKG1lc2gpKTtcbiAgICAgICAgdGhpcy50ZXh0TWVzaGVzID0gW107XG5cbiAgICAgICAgZmFjZXMuZm9yRWFjaCgoZmFjZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRHZW9tZXRyeSA9IG5ldyBUZXh0R2VvbWV0cnkoYCR7ZmFjZSArIDF9YCwge1xuICAgICAgICAgICAgICAgIGZvbnQ6IHRoaXMuZm9udCxcbiAgICAgICAgICAgICAgICBzaXplOiAwLjUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRNZXNoID0gbmV3IFRIUkVFLk1lc2godGV4dEdlb21ldHJ5LCB0ZXh0TWF0ZXJpYWwpO1xuICAgICAgICAgICAgdGV4dE1lc2gucG9zaXRpb24uc2V0KC01LCA4IC0gaW5kZXgsIDApOyAvLyDpganliIfjgarkvY3nva7jgavjg4bjgq3jgrnjg4jjgpLphY3nva5cbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRleHRNZXNoKTtcbiAgICAgICAgICAgIHRoaXMudGV4dE1lc2hlcy5wdXNoKHRleHRNZXNoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/oirHngavjgpLjgYLjgZLjgovlh6bnkIZcbiAgICBwcml2YXRlIGNyZWF0ZVBhcnRpY2xlU3lzdGVtID0gKHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlU3ByaXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgLy/mlrDjgZfjgYTjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDQ7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gNDtcblxuICAgICAgICAgICAgLy/lhoblvaLjga7jgrDjg6njg4fjg7zjgrfjg6fjg7Pjga7kvZzmiJBcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAwLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMik7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LDI1NSwyNTUsMSknKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUsICdyZ2JhKDAsMCwyNTUsMSknKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMjU1LDApJyk7XG5cbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICAvL+ODhuOCr+OCueODgeODo+OBrueUn+aIkFxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcyk7XG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgIHNpemU6IDAuNCxcbiAgICAgICAgICAgIG1hcDogZ2VuZXJhdGVTcHJpdGUoKSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG51bVBvaW50cyA9IDMwMDsgLy8g54K544Gu5pWwXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IDU7IC8vIOeQg+OBruWNiuW+hFxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KG51bVBvaW50cyAqIDMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUG9pbnRzOyBpKyspIHtcbiAgICAgICAgICAgIC8vIEZpYm9uYWNjaSDjgrnjg5HjgqTjg6njg6vjgavln7rjgaXjgYTjgablnYfnrYnjgavngrnjgpLphY3nva5cbiAgICAgICAgICAgIGNvbnN0IHBoaSA9IE1hdGguYWNvcygxIC0gMiAqIChpICsgMC41KSAvIG51bVBvaW50cyk7XG4gICAgICAgICAgICBjb25zdCB0aGV0YSA9IE1hdGguc3FydChudW1Qb2ludHMgKiBNYXRoLlBJKSAqIHBoaTtcblxuICAgICAgICAgICAgY29uc3QgeCA9IHJhZGl1cyAqIE1hdGguY29zKHRoZXRhKSAqIE1hdGguc2luKHBoaSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gcmFkaXVzICogTWF0aC5zaW4odGhldGEpICogTWF0aC5zaW4ocGhpKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSByYWRpdXMgKiBNYXRoLmNvcyhwaGkpO1xuXG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDNdID0geDtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICogMyArIDFdID0geTtcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICogMyArIDJdID0gejtcbiAgICAgICAgfVxuXG4gICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuICAgICAgICBjb25zdCBwb2ludHMgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBvaW50cyk7XG5cbiAgICAgICAgbGV0IHR3ZWVuaW5mbyA9IHsgc2NhbGU6IDAuMCwgcG9zWTogMC4wIH07XG4gICAgICAgIGxldCB1cGRhdGVTY2FsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHBvaW50cy5zY2FsZS5zZXQodHdlZW5pbmZvLnNjYWxlLCB0d2VlbmluZm8uc2NhbGUsIHR3ZWVuaW5mby5zY2FsZSk7XG4gICAgICAgICAgICBwb2ludHMucG9zaXRpb24ueSA9IHR3ZWVuaW5mby5wb3NZO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mbylcbiAgICAgICAgICAgIC50byh7IHNjYWxlOiAwLjAsIHBvc1k6IDYgfSwgMTAwMClcbiAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVTY2FsZSlcbiAgICAgICAgICAgIDtcblxuICAgICAgICBjb25zdCB0d2VlbkJhY2sgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvKVxuICAgICAgICAgICAgLnRvKHsgc2NhbGU6IDEuMCB9LCAyMDAwKVxuICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5PdXQpXG4gICAgICAgICAgICAub25VcGRhdGUodXBkYXRlU2NhbGUpLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHBvaW50cyk7IC8vIOOCt+ODvOODs+OBi+OCieODkeODvOODhuOCo+OCr+ODq+OCkuWJiumZpFxuICAgICAgICAgICAgICAgIGdlb21ldHJ5LmRpc3Bvc2UoKTsgLy8g44K444Kq44Oh44OI44Oq44Gu44Oq44K944O844K544KS6Kej5pS+XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZGlzcG9zZSgpOyAvLyDjg57jg4bjg6rjgqLjg6vjga7jg6rjgr3jg7zjgrnjgpLop6PmlL5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0d2Vlbi5jaGFpbih0d2VlbkJhY2spO1xuICAgICAgICB0d2Vlbi5zdGFydCgpO1xuICAgIH1cblxuICAgIC8vIOOCreODvOODnOODvOODieOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoFxuICAgIHB1YmxpYyBhZGRLZXlib2FyZEV2ZW50cyA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdyJyB8fCBldmVudC5rZXkgPT09ICdSJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7IC8vIOOCteOCpOOCs+ODreOCkuaWsOOBl+OBj+S9nOaIkOOBl+OBpuaMr+OCi1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbi8vIGluaXQg6Zai5pWw44Gu5L+u5q2jXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMTAsIDEwKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG4gICAgY29udGFpbmVyLmFkZEtleWJvYXJkRXZlbnRzKCk7IC8vIOOCreODvOODnOODvOODieOCpOODmeODs+ODiOOBrui/veWKoFxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc19jYW5ub24tZXNfZGlzdF9jYW5ub24tZXMtMDRiMmVlXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9