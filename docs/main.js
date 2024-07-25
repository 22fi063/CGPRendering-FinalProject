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
            //ダイスをゾロ目にしたい時は以下のコードをコメントアウト
            cube.rotation.set(Math.random() * Math.PI * 2, // x軸の回転
            Math.random() * Math.PI * 2, // y軸の回転
            Math.random() * Math.PI * 2 // z軸の回転
            );
            //
            cube.castShadow = true;
            cube.receiveShadow = true;
            this.scene.add(cube);
            this.cubes.push(cube);
            const cubeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Vec3(0.5, 0.5, 0.5));
            const cubeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Body({ mass: 1 });
            cubeBody.addShape(cubeShape);
            cubeBody.position.set(cube.position.x, cube.position.y, cube.position.z);
            cubeBody.quaternion.set(cube.quaternion.x, cube.quaternion.y, cube.quaternion.z, cube.quaternion.w);
            // ダイスをゾロ目にしたい時は以下のコードをコメントアウト
            const initialAngularVelocity = new cannon_es__WEBPACK_IMPORTED_MODULE_4__.Vec3(Math.random() * 10, // x軸の角速度
            Math.random() * 10, // y軸の角速度
            Math.random() * 10 // z軸の角速度
            );
            cubeBody.angularVelocity.set(initialAngularVelocity.x, initialAngularVelocity.y, initialAngularVelocity.z);
            //
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
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 8, 14));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XG5pbXBvcnQgKiBhcyBDQU5OT04gZnJvbSAnY2Fubm9uLWVzJztcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuaW1wb3J0IHsgRm9udExvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0ZvbnRMb2FkZXInO1xuaW1wb3J0IHsgVGV4dEdlb21ldHJ5IH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2dlb21ldHJpZXMvVGV4dEdlb21ldHJ5JztcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBjdWJlczogVEhSRUUuTWVzaFtdID0gW107XG4gICAgcHJpdmF0ZSBjdWJlQm9kaWVzOiBDQU5OT04uQm9keVtdID0gW107XG4gICAgcHJpdmF0ZSBpc1N0b3BwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHdvcmxkOiBDQU5OT04uV29ybGQ7XG4gICAgcHJpdmF0ZSBmb250OiBUSFJFRS5Gb250O1xuICAgIHByaXZhdGUgdGV4dE1lc2hlczogVEhSRUUuTWVzaFtdID0gW107XG5cbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7IC8vIOOCt+ODo+ODieOCpuOBrueorumhnuOCguioreWumuOBp+OBjeOBvuOBmVxuXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSgpOyAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjga7mm7TmlrBcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRm9udCA9IChjYWxsYmFjazogKGZvbnQ6IFRIUkVFLkZvbnQpID0+IHZvaWQpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IEZvbnRMb2FkZXIoKTtcbiAgICAgICAgbG9hZGVyLmxvYWQoJ2Fzc2V0cy9oZWx2ZXRpa2VyX3JlZ3VsYXIudHlwZWZhY2UuanNvbicsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgLy/ph43lipvjga7oqK3lrppcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBDQU5OT04uV29ybGQoeyBncmF2aXR5OiBuZXcgQ0FOTk9OLlZlYzMoMCwgLTkuODIsIDApIH0pO1xuICAgICAgICB0aGlzLndvcmxkLmRlZmF1bHRDb250YWN0TWF0ZXJpYWwuZnJpY3Rpb24gPSAwLjE7XG4gICAgICAgIHRoaXMud29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5yZXN0aXR1dGlvbiA9IDAuMDtcblxuICAgICAgICAvLyDjg5Xjgqnjg7Pjg4jjga7oqq3jgb/ovrzjgb9cbiAgICAgICAgdGhpcy5sb2FkRm9udCgoZm9udCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb250ID0gZm9udDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy/jg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgY29uc3QgbHZlcyA9IFtcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEwLCAxMCwgMTApLm5vcm1hbGl6ZSgpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEwLCAxMCwgMTApLm5vcm1hbGl6ZSgpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMTAsIDEwLCAtMTApLm5vcm1hbGl6ZSgpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEwLCAxMCwgLTEwKS5ub3JtYWxpemUoKSxcbiAgICAgICAgXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAxKTsgLy8g5by344GV44KSMeOBq+ioreWumlxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KGx2ZXNbaV0ueCwgbHZlc1tpXS55LCBsdmVzW2ldLnopO1xuICAgICAgICAgICAgbGlnaHQuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChsaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgMS4wKTtcbiAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KDUsIDUsIDUpO1xuICAgICAgICBsaWdodC5jYXN0U2hhZG93ID0gdHJ1ZTtcblxuICAgICAgICAvL+eUu+WDj+iqreOBv+i+vOOBv1xuICAgICAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBbXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ2Fzc2V0cy9kaWNlbm9tZV8xLnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCdhc3NldHMvZGljZW5vbWVfNi5wbmcnKSB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgnYXNzZXRzL2RpY2Vub21lXzIucG5nJykgfSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IG1hcDogbG9hZGVyLmxvYWQoJ2Fzc2V0cy9kaWNlbm9tZV81LnBuZycpIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBtYXA6IGxvYWRlci5sb2FkKCdhc3NldHMvZGljZW5vbWVfMy5wbmcnKSB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgbWFwOiBsb2FkZXIubG9hZCgnYXNzZXRzL2RpY2Vub21lXzQucG5nJykgfSksXG4gICAgICAgIF07XG5cbiAgICAgICAgLy/nq4vmlrnkvZPjga7kvZzmiJBcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMSwgMSwgMSk7XG4gICAgICAgIC8vIOS4ieinkuW9ouOBrumggueCueOBruW6p+aomeOCkuioreWumlxuICAgICAgICBjb25zdCB0cmlhbmdsZVZlcnRpY2VzID0gW1xuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgNSwgLTIuNSksIC8vIOmggueCuUFcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDIuNSwgNSwgTWF0aC5zcXJ0KDMpICogMi41IC0gMiksIC8vIOmggueCuUJcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0yLjUsIDUsIE1hdGguc3FydCgzKSAqIDIuNSAtIDIpIC8vIOmggueCuUNcbiAgICAgICAgXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcbiAgICAgICAgICAgIC8vIOS4ieinkuW9ouOBrumggueCueOBruS9jee9ruOBq+eri+aWueS9k+OCkumFjee9rlxuICAgICAgICAgICAgY29uc3QgdmVydGV4ID0gdHJpYW5nbGVWZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIGN1YmUucG9zaXRpb24uc2V0KHZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnopO1xuXG4gICAgICAgICAgICAvL+ODgOOCpOOCueOCkuOCvuODreebruOBq+OBl+OBn+OBhOaZguOBr+S7peS4i+OBruOCs+ODvOODieOCkuOCs+ODoeODs+ODiOOCouOCpuODiFxuICAgICAgICAgICAgY3ViZS5yb3RhdGlvbi5zZXQoXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyLCAvLyB46Lu444Gu5Zue6LuiXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyLCAvLyB56Lu444Gu5Zue6LuiXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyICAvLyB66Lu444Gu5Zue6LuiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy9cblxuICAgICAgICAgICAgY3ViZS5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1YmUucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChjdWJlKTtcbiAgICAgICAgICAgIHRoaXMuY3ViZXMucHVzaChjdWJlKTtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVTaGFwZSA9IG5ldyBDQU5OT04uQm94KG5ldyBDQU5OT04uVmVjMygwLjUsIDAuNSwgMC41KSk7XG4gICAgICAgICAgICBjb25zdCBjdWJlQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDEgfSk7XG4gICAgICAgICAgICBjdWJlQm9keS5hZGRTaGFwZShjdWJlU2hhcGUpO1xuICAgICAgICAgICAgY3ViZUJvZHkucG9zaXRpb24uc2V0KGN1YmUucG9zaXRpb24ueCwgY3ViZS5wb3NpdGlvbi55LCBjdWJlLnBvc2l0aW9uLnopO1xuICAgICAgICAgICAgY3ViZUJvZHkucXVhdGVybmlvbi5zZXQoY3ViZS5xdWF0ZXJuaW9uLngsIGN1YmUucXVhdGVybmlvbi55LCBjdWJlLnF1YXRlcm5pb24ueiwgY3ViZS5xdWF0ZXJuaW9uLncpO1xuXG4gICAgICAgICAgICAvLyDjg4DjgqTjgrnjgpLjgr7jg63nm67jgavjgZfjgZ/jgYTmmYLjga/ku6XkuIvjga7jgrPjg7zjg4njgpLjgrPjg6Hjg7Pjg4jjgqLjgqbjg4hcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxBbmd1bGFyVmVsb2NpdHkgPSBuZXcgQ0FOTk9OLlZlYzMoXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwLCAvLyB46Lu444Gu6KeS6YCf5bqmXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwLCAvLyB56Lu444Gu6KeS6YCf5bqmXG4gICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwICAgLy8geui7uOOBruinkumAn+W6plxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGN1YmVCb2R5LmFuZ3VsYXJWZWxvY2l0eS5zZXQoaW5pdGlhbEFuZ3VsYXJWZWxvY2l0eS54LCBpbml0aWFsQW5ndWxhclZlbG9jaXR5LnksIGluaXRpYWxBbmd1bGFyVmVsb2NpdHkueik7XG4gICAgICAgICAgICAvL1xuXG4gICAgICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkoY3ViZUJvZHkpO1xuICAgICAgICAgICAgdGhpcy5jdWJlQm9kaWVzLnB1c2goY3ViZUJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGhvbmdNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCgpO1xuICAgICAgICBjb25zdCBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTAsIDEwKTtcbiAgICAgICAgY29uc3QgcGxhbmVNZXNoID0gbmV3IFRIUkVFLk1lc2gocGxhbmVHZW9tZXRyeSwgcGhvbmdNYXRlcmlhbCk7XG4gICAgICAgIHBsYW5lTWVzaC5tYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTsgLy8g5Lih6Z2iXG4gICAgICAgIHBsYW5lTWVzaC5yb3RhdGVYKC1NYXRoLlBJIC8gMik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBsYW5lTWVzaCk7XG4gICAgICAgIGNvbnN0IHBsYW5lU2hhcGUgPSBuZXcgQ0FOTk9OLlBsYW5lKClcbiAgICAgICAgY29uc3QgcGxhbmVCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMCB9KVxuICAgICAgICBwbGFuZUJvZHkuYWRkU2hhcGUocGxhbmVTaGFwZSlcbiAgICAgICAgcGxhbmVCb2R5LnBvc2l0aW9uLnNldChwbGFuZU1lc2gucG9zaXRpb24ueCwgcGxhbmVNZXNoLnBvc2l0aW9uLnksIHBsYW5lTWVzaC5wb3NpdGlvbi56KTtcbiAgICAgICAgcGxhbmVCb2R5LnF1YXRlcm5pb24uc2V0KHBsYW5lTWVzaC5xdWF0ZXJuaW9uLngsIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnksIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnosIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLncpO1xuICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkocGxhbmVCb2R5KVxuXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMud29ybGQuZml4ZWRTdGVwKCk7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7IC8vIEFzc3VtZSBzdG9wcGVkIHVubGVzcyB3ZSBmaW5kIG1vdGlvblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmN1YmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3ViZSA9IHRoaXMuY3ViZXNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuY3ViZUJvZGllc1tpXTtcbiAgICAgICAgICAgICAgICBjdWJlLnBvc2l0aW9uLmNvcHkodGhpcy5jYW5ub25WZWMzVG9UaHJlZVZlYzMoYm9keS5wb3NpdGlvbikpO1xuICAgICAgICAgICAgICAgIGN1YmUucXVhdGVybmlvbi5jb3B5KHRoaXMuY2Fubm9uUXVhdFRvVGhyZWVRdWF0KGJvZHkucXVhdGVybmlvbikpO1xuICAgICAgICAgICAgICAgIGlmIChib2R5LnZlbG9jaXR5Lmxlbmd0aCgpID4gMC4wMSB8fCBib2R5LmFuZ3VsYXJWZWxvY2l0eS5sZW5ndGgoKSA+IDAuMDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuODgOOCpOOCueOBjOWBnOatouOBl+OBvuOBl+OBn+OAguebruOBruWPluW+l+OCkuWun+ihjOOBl+OBvuOBmeOAglwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpY2VGYWNlcygpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5ub25WZWMzVG9UaHJlZVZlYzMgPSAoY2Fubm9uVmVjOiBDQU5OT04uVmVjMyk6IFRIUkVFLlZlY3RvcjMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoY2Fubm9uVmVjLngsIGNhbm5vblZlYy55LCBjYW5ub25WZWMueik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5ub25RdWF0VG9UaHJlZVF1YXQgPSAoY2Fubm9uUXVhdDogQ0FOTk9OLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5RdWF0ZXJuaW9uKGNhbm5vblF1YXQueCwgY2Fubm9uUXVhdC55LCBjYW5ub25RdWF0LnosIGNhbm5vblF1YXQudyk7XG4gICAgfVxuXG4gICAgLy/jg4DjgqTjgrnjga7nm67jga7lj5blvpdcbiAgICBwcml2YXRlIGdldERpY2VGYWNlcyA9ICgpID0+IHtcbiAgICAgICAgbGV0IGZhY2VzID0gW107IC8vIOWQhOOCteOCpOOCs+ODreOBrumdouOBruOCpOODs+ODh+ODg+OCr+OCueOCkuagvOe0jeOBmeOCi+mFjeWIl1xuXG4gICAgICAgIHRoaXMuY3ViZXMuZm9yRWFjaCgoY3ViZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1YmVCb2R5ID0gdGhpcy5jdWJlQm9kaWVzW2luZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IHdvcmxkUXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuY29weShjdWJlLnF1YXRlcm5pb24pO1xuICAgICAgICAgICAgY29uc3Qgd29ybGRNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgICAgICAgICAgd29ybGRNYXRyaXgubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24od29ybGRRdWF0KTtcblxuICAgICAgICAgICAgY29uc3QgZmFjZU5vcm1hbHMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksIC8vIFJpZ2h0XG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIC8vIFRvcFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCAvLyBGcm9udFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSwgLy8gQmFja1xuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0xLCAwKSwvLyBCb3R0b21cbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtMSwgMCwgMCksIC8vIExlZnRcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGxldCBtYXhEb3QgPSAtMTtcbiAgICAgICAgICAgIGxldCBmYWNlSW5kZXggPSAtMTtcbiAgICAgICAgICAgIGZhY2VOb3JtYWxzLmZvckVhY2goKG5vcm1hbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmxkTm9ybWFsID0gbm9ybWFsLmNsb25lKCkuYXBwbHlNYXRyaXg0KHdvcmxkTWF0cml4KS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkb3QgPSB3b3JsZE5vcm1hbC5kb3QobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCkpO1xuICAgICAgICAgICAgICAgIGlmIChkb3QgPiBtYXhEb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4RG90ID0gZG90O1xuICAgICAgICAgICAgICAgICAgICBmYWNlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmFjZXNbaW5kZXhdID0gZmFjZUluZGV4OyAvLyDlkITjgrXjgqTjgrPjg63jga7pnaLjga7jgqTjg7Pjg4fjg4Pjgq/jgrnjgpLkv53lrZhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g44K144Kk44Kz44Ot44Gu6Z2i44Gu6KGo56S644KS44Kz44Oz44K944O844Or44Gr5Ye65YqbXG4gICAgICAgIGZhY2VzLmZvckVhY2goKGZhY2UsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg44K144Kk44Kz44OtICR7aW5kZXggKyAxfTogJHtmYWNlICsgMX1gKTsgLy8g44Kk44Oz44OH44OD44Kv44K544KSMeOBi+OCieWni+OCgeOCi1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNob3dEaWNlRmFjZXMoZmFjZXMpO1xuXG4gICAgICAgIC8vIOOBmeOBueOBpuOBruOCteOCpOOCs+ODreOBjOWQjOOBmOmdouOCkuihqOekuuOBl+OBpuOBhOOCi+OBi+OCkueiuuiqjVxuICAgICAgICBjb25zdCBhbGxTYW1lID0gZmFjZXMuZXZlcnkoZmFjZSA9PiBmYWNlID09PSBmYWNlc1swXSk7XG5cbiAgICAgICAgaWYgKGFsbFNhbWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi44GZ44G544Gm44Gu44K144Kk44Kz44Ot44GM5ZCM44GY6Z2i44KS6KGo56S644GX44Gm44GE44G+44GZ77yBXCIpO1xuICAgICAgICAgICAgLy8g44OR44O844OG44Kj44Kv44Or44Ko44OV44Kn44Kv44OI44KS6KGo56S6XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBhcnRpY2xlU3lzdGVtKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApKTsgLy8g5b+F6KaB44Gr5b+c44GY44Gm5L2N572u44KS6Kq/5pW0XG4gICAgICAgICAgICBUV0VFTi51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi44K144Kk44Kz44Ot44Gu6Z2i44Gv5LiA6Ie044GX44Gm44GE44G+44Gb44KT44CCXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZhY2VzID0gW107XG4gICAgfVxuXG4gICAgLy/jg4DjgqTjgrnjga7nm67jgpLooajnpLrjgZnjgovjg4bjgq3jgrnjg4jjgpLkvZzmiJDjgZnjgotcbiAgICBwcml2YXRlIHNob3dEaWNlRmFjZXMgPSAoZmFjZXM6IG51bWJlcltdKSA9PiB7XG4gICAgICAgIHRoaXMudGV4dE1lc2hlcy5mb3JFYWNoKG1lc2ggPT4gdGhpcy5zY2VuZS5yZW1vdmUobWVzaCkpO1xuICAgICAgICB0aGlzLnRleHRNZXNoZXMgPSBbXTtcblxuICAgICAgICBmYWNlcy5mb3JFYWNoKChmYWNlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dEdlb21ldHJ5ID0gbmV3IFRleHRHZW9tZXRyeShgJHtmYWNlICsgMX1gLCB7XG4gICAgICAgICAgICAgICAgZm9udDogdGhpcy5mb250LFxuICAgICAgICAgICAgICAgIHNpemU6IDAuNSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDAuMSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdGV4dE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pO1xuICAgICAgICAgICAgY29uc3QgdGV4dE1lc2ggPSBuZXcgVEhSRUUuTWVzaCh0ZXh0R2VvbWV0cnksIHRleHRNYXRlcmlhbCk7XG4gICAgICAgICAgICB0ZXh0TWVzaC5wb3NpdGlvbi5zZXQoLTUsIDggLSBpbmRleCwgMCk7IC8vIOmBqeWIh+OBquS9jee9ruOBq+ODhuOCreOCueODiOOCkumFjee9rlxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGV4dE1lc2gpO1xuICAgICAgICAgICAgdGhpcy50ZXh0TWVzaGVzLnB1c2godGV4dE1lc2gpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL+iKseeBq+OCkuOBguOBkuOCi+WHpueQhlxuICAgIHByaXZhdGUgY3JlYXRlUGFydGljbGVTeXN0ZW0gPSAocG9zaXRpb246IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVTcHJpdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAvL+aWsOOBl+OBhOOCreODo+ODs+ODkOOCueOBruS9nOaIkFxuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gNDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSA0O1xuXG4gICAgICAgICAgICAvL+WGhuW9ouOBruOCsOODqeODh+ODvOOCt+ODp+ODs+OBruS9nOaIkFxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGxldCBncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIDAsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCBjYW52YXMud2lkdGggLyAyKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNTUsMjU1LDI1NSwxKScpO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNSwgJ3JnYmEoMCwwLDI1NSwxKScpO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwyNTUsMCknKTtcblxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIC8v44OG44Kv44K544OB44Oj44Gu55Sf5oiQXG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbiAgICAgICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgc2l6ZTogMC40LFxuICAgICAgICAgICAgbWFwOiBnZW5lcmF0ZVNwcml0ZSgpLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbnVtUG9pbnRzID0gMzAwOyAvLyDngrnjga7mlbBcbiAgICAgICAgY29uc3QgcmFkaXVzID0gNTsgLy8g55CD44Gu5Y2K5b6EXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkobnVtUG9pbnRzICogMyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Qb2ludHM7IGkrKykge1xuICAgICAgICAgICAgLy8gRmlib25hY2NpIOOCueODkeOCpOODqeODq+OBq+WfuuOBpeOBhOOBpuWdh+etieOBq+eCueOCkumFjee9rlxuICAgICAgICAgICAgY29uc3QgcGhpID0gTWF0aC5hY29zKDEgLSAyICogKGkgKyAwLjUpIC8gbnVtUG9pbnRzKTtcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5zcXJ0KG51bVBvaW50cyAqIE1hdGguUEkpICogcGhpO1xuXG4gICAgICAgICAgICBjb25zdCB4ID0gcmFkaXVzICogTWF0aC5jb3ModGhldGEpICogTWF0aC5zaW4ocGhpKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSByYWRpdXMgKiBNYXRoLnNpbih0aGV0YSkgKiBNYXRoLnNpbihwaGkpO1xuICAgICAgICAgICAgY29uc3QgeiA9IHJhZGl1cyAqIE1hdGguY29zKHBoaSk7XG5cbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICogM10gPSB4O1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSB5O1xuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMl0gPSB6O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9IG5ldyBUSFJFRS5Qb2ludHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocG9pbnRzKTtcblxuICAgICAgICBsZXQgdHdlZW5pbmZvID0geyBzY2FsZTogMC4wLCBwb3NZOiAwLjAgfTtcbiAgICAgICAgbGV0IHVwZGF0ZVNjYWxlID0gKCkgPT4ge1xuICAgICAgICAgICAgcG9pbnRzLnNjYWxlLnNldCh0d2VlbmluZm8uc2NhbGUsIHR3ZWVuaW5mby5zY2FsZSwgdHdlZW5pbmZvLnNjYWxlKTtcbiAgICAgICAgICAgIHBvaW50cy5wb3NpdGlvbi55ID0gdHdlZW5pbmZvLnBvc1k7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvKVxuICAgICAgICAgICAgLnRvKHsgc2NhbGU6IDAuMCwgcG9zWTogNiB9LCAxMDAwKVxuICAgICAgICAgICAgLm9uVXBkYXRlKHVwZGF0ZVNjYWxlKVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIGNvbnN0IHR3ZWVuQmFjayA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm8pXG4gICAgICAgICAgICAudG8oeyBzY2FsZTogMS4wIH0sIDIwMDApXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dClcbiAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVTY2FsZSkub25Db21wbGV0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUocG9pbnRzKTsgLy8g44K344O844Oz44GL44KJ44OR44O844OG44Kj44Kv44Or44KS5YmK6ZmkXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnkuZGlzcG9zZSgpOyAvLyDjgrjjgqrjg6Hjg4jjg6rjga7jg6rjgr3jg7zjgrnjgpLop6PmlL5cbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5kaXNwb3NlKCk7IC8vIOODnuODhuODquOCouODq+OBruODquOCveODvOOCueOCkuino+aUvlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHR3ZWVuLmNoYWluKHR3ZWVuQmFjayk7XG4gICAgICAgIHR3ZWVuLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy8g44Kt44O844Oc44O844OJ44Kk44OZ44Oz44OI44Oq44K544OK44O844KS6L+95YqgXG4gICAgcHVibGljIGFkZEtleWJvYXJkRXZlbnRzID0gKCkgPT4ge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ3InIHx8IGV2ZW50LmtleSA9PT0gJ1InKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTsgLy8g44K144Kk44Kz44Ot44KS5paw44GX44GP5L2c5oiQ44GX44Gm5oyv44KLXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuLy8gaW5pdCDplqLmlbDjga7kv67mraNcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygwLCA4LCAxNCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xuICAgIGNvbnRhaW5lci5hZGRLZXlib2FyZEV2ZW50cygpOyAvLyDjgq3jg7zjg5zjg7zjg4njgqTjg5njg7Pjg4jjga7ov73liqBcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdHdlZW5qc190d2Vlbl9qc19kaXN0X3R3ZWVuX2VzbV9qcy1ub2RlX21vZHVsZXNfY2Fubm9uLWVzX2Rpc3RfY2Fubm9uLWVzLTA0YjJlZVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==