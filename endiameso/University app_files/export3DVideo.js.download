window['createExport3DVideoApi'] = () => {
    const ensureKey = (object, key, defaultValue) => {
        let value = object[key];
        if (value == null) {
            value = defaultValue;
            object[key] = value;
        }
        return value;
    };

    const ensureFlipbookStorage = () => {
        const flipbookStorage = ensureKey(window, 'flipbookStorage', {});
        ensureKey(flipbookStorage, 'export3DVideo.js', {});
        return flipbookStorage;
    };

    const ensureAssetIdInfoMaps = () => {
        const flipbookStorage = ensureFlipbookStorage();
        const instanceStorages = flipbookStorage['export3DVideo.js'];
		return ensureKey(instanceStorages, 'assetIdInfoMaps', []);
    };

	const escapeHtml = (unsafe) => {
		return unsafe
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}

	/*
	const blobToDataUrl = async (blob) => {
		return new Promise((resolve, reject) => {
			try {
				const reader = new FileReader();
				reader.onload = (e) => { resolve(e.target.result); }
				reader.readAsDataURL(blob);
			} catch (error) {
				reject(error);
			}
		});
	};
	*/

	const export3DVideoApi = {};
	export3DVideoApi.data = {
		timeline: null,
		elementCharacter3dController: null,
		forWebmController: null,
		forFilpbookApi: null,
		disposeActions: []
	};
	export3DVideoApi['setupForWebmController'] = (forWebmController) => {
		const elementCharacter3dController = forWebmController.elementCharacter3dController;
		elementCharacter3dController['clearRender']();
		export3DVideoApi.data.elementCharacter3dController = elementCharacter3dController;
		export3DVideoApi.data.forWebmController = forWebmController;
		return {
			'key': forWebmController['key'],
			'forWebmController': forWebmController,
			'prepare': (data, videoWidth, videoHeight, options) => {
				return export3DVideoApi['prepareCapturing'](data, videoWidth, videoHeight, options);
			},
			'record': (duration) => {
				return export3DVideoApi['recordVideo'](0, duration);
			},
			'stopRecord': (duration) => {
				return export3DVideoApi['stopRecordVideo']();
			},
			'seekTo': (time) => {
				return export3DVideoApi['seekTo'](time);
			},
			'cleanup': () => {
				return export3DVideoApi['prepareCapturing'](null, null, null);
			},
			'dispose': () => {
				return export3DVideoApi['dispose']();
			},
		};
	};
	export3DVideoApi['setupForFlipbookApi'] = (forFilpbookApi) => {
		export3DVideoApi.data.forFilpbookApi = forFilpbookApi;
	};
	export3DVideoApi['prepareCapturing'] = (data, videoWidth, videoHeight, options) => {
		return new Promise((resolve, reject) => {
			try {
				if (export3DVideoApi.data.timeline == null && data == null) {
					resolve(true);
					return;
				}
				if (export3DVideoApi.data.timeline == null) {
					const timeline = gsap.timeline({
						paused: true
					});
					export3DVideoApi.data.timeline = timeline;
				} else {
					const disposeActions = export3DVideoApi.data.disposeActions;
					disposeActions.map(disposeAction => disposeAction());
					disposeActions.length = 0;

					const timeline = export3DVideoApi.data.timeline;
					timeline.clear();

					const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
					const scene = elementCharacter3dController['getScene']();
					const animationGroups = scene['animationGroups'];
					if (animationGroups) {
						Array.from(animationGroups).map(animationGroup => {
							scene['removeAnimationGroup'](animationGroup);
							animationGroup['dispose']();
						});
					}
					const meshes = scene['meshes'];
					if (meshes) {
						Array.from(meshes).map(mesh => {
							scene['removeMesh'](mesh, true);
							mesh['dispose']();
						});
					}
					const skeletons = scene['skeletons'];
					if (skeletons != null) {
						Array.from(skeletons).map(skeleton => {
							scene['removeSkeleton'](skeleton);
							skeleton['dispose']();
						});
					}
					if (data == null) {
						scene['render'](scene);
					}
					elementCharacter3dController['clearCache']();
				}
				if (data == null) {
					resolve(true);
					return;
				}

				const rollbackAll = [];

				export3DVideoApi.data.options = options;

				let clipElement = export3DVideoApi.data.clipElement;
				if (clipElement == null) {
					clipElement = document.querySelector('#ani-api-clip');
				}
				if (clipElement == null) {
					clipElement = document.createElement('div');
					clipElement.setAttribute('id', 'ani-api-clip');
					clipElement.style.pointerEvents = 'none';
					clipElement.style.position = 'absolute';
					clipElement.style.top = '0px';
					clipElement.style.left = '0px';

					let isClipElementInserted = false;
					if (options?.showClip !== false) {
						document.body.appendChild(clipElement);
						isClipElementInserted = true;
					}
					
					export3DVideoApi.data.clipElement = clipElement;

					rollbackAll.push(()=>{
						// (#106968, 2024-03-01 14:38)
						delete export3DVideoApi.data.clipElement;
						isClipElementInserted && clipElement.remove();
					})
				}
				clipElement.style.width = `${videoWidth}px`;
				clipElement.style.height = `${videoHeight}px`;

				let divNode;
				let svg;
				let graphViewDrawPaneGroupElement;
				const forWebmController = export3DVideoApi.data.forWebmController;
				const forFilpbookApi = export3DVideoApi.data.forFilpbookApi;
				if (forWebmController) {
					divNode = forWebmController['divNode'];
					svg = forWebmController['svgNode'];
					graphViewDrawPaneGroupElement = forWebmController['gNode'];
				} else if (forFilpbookApi) {
					divNode = null;
					svg = forFilpbookApi['svgNode'];
					graphViewDrawPaneGroupElement = forFilpbookApi['gNode'];
				} else {
					divNode = null;
					svg = document.querySelector('svg[id=\'3d-svg-root\']');
					graphViewDrawPaneGroupElement = document.querySelector('g[graphviewdrawpane="true"]');
				}

				const applyWidth = videoWidth;
				const applyHeight = videoHeight;
				svg.setAttribute('width', applyWidth);
				svg.setAttribute('height', applyHeight);
				divNode && (divNode.style.width = `${applyWidth}px`);
				divNode && (divNode.style.height = `${applyHeight}px`);

				const assetIdInfoMaps = ensureAssetIdInfoMaps();
				const getAssetUrlWithTypeFromStore = (assetId) => {
					let assetUrlWithType = null;
					assetIdInfoMaps.findIndex((assetIdInfoMap) => {
						assetUrlWithType = assetIdInfoMap[assetId];
						return assetUrlWithType != null;
					});
					return assetUrlWithType;
				};
				(() => {
					const assetIdInfoMap = data['assetIdInfoMap'];
					if (assetIdInfoMap == null) {
						return;
					}
					assetIdInfoMaps.unshift(assetIdInfoMap);
					assetIdInfoMaps.length = Math.min(50, assetIdInfoMaps.length);
				})();

				let elementCharacter3dControllerPromise;
                                
                                function fireElementCharacter3dControllerBoundsChanged(elementCharacter3dController) {
                                    var immediate = elementCharacter3dController['hasMultipleViews'] === false;
                                    var forceSynchronizeCharacterBounds = true;
                                    
                                    elementCharacter3dController['boundsChanged'](immediate, forceSynchronizeCharacterBounds);
                                };
                                
				if (forWebmController) {
					elementCharacter3dControllerPromise = new Promise((resolve) => {
						const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
						const scene = elementCharacter3dController['getScene']();
						const engine = scene.getEngine();
						const canvas = engine.getRenderingCanvas();
						canvas.style.width = `${applyWidth}px`;
						canvas.style.height = `${applyHeight}px`;
						elementCharacter3dController['setCanvasParentElementBounds'](0, 0, applyWidth, applyHeight);

                                                fireElementCharacter3dControllerBoundsChanged(elementCharacter3dController);
                                                
						elementCharacter3dController['clearRender']();
						export3DVideoApi.data.elementCharacter3dController = elementCharacter3dController;
						let temp = elementCharacter3dController['temp'];
						if (temp == null) {
							temp = {};
							elementCharacter3dController['temp'] = temp;
						}
						temp['forWebmController'] = forWebmController;
						temp['forFilpbookApi'] = null;
						temp['assetIdInfoMap'] = data['assetIdInfoMap'];
						resolve(elementCharacter3dController);
					});
				} else {
					elementCharacter3dControllerPromise = new Promise((resolve) => {
						const disposeActions = export3DVideoApi.data.disposeActions;
						const elementCharacter3dControllerCreatedListener = (event) => {
							const detail = event['detail'];
							const elementCharacter3dController = detail['elementCharacter3dController'];
							elementCharacter3dController['setCanvasParentElementBounds'](0, 0, applyWidth, applyHeight);
                                                        
                                                        fireElementCharacter3dControllerBoundsChanged(elementCharacter3dController);
                                                        
							elementCharacter3dController['clearRender']();
							export3DVideoApi.data.elementCharacter3dController = elementCharacter3dController;
							let temp = elementCharacter3dController['temp'];
							if (temp == null) {
								temp = {};
								elementCharacter3dController['temp'] = temp;
							}
							temp['forWebmController'] = null;
							temp['forFilpbookApi'] = forFilpbookApi;
							temp['assetIdInfoMap'] = data['assetIdInfoMap'];
							resolve(elementCharacter3dController);
						};
						graphViewDrawPaneGroupElement.addEventListener('elementCharacter3dControllerCreated', elementCharacter3dControllerCreatedListener);
						disposeActions.push(() => {
							graphViewDrawPaneGroupElement.removeEventListener('elementCharacter3dControllerCreated', elementCharacter3dControllerCreatedListener);
						});
					});
				}

				if (window.ensureCharacter3dController == null) {
					window.ensureCharacter3dController = () => {
						return new Promise((resolve, reject) => {
							try {
                                                                (function() {
                                                                    var supportMultipleViews = false;
                                                                    
                                                                    return WebDiagramBabylonJsBridge['initializeForMultipleViewsSupport'](supportMultipleViews);
                                                                })().then(function() {
                                                                    return WebDiagramBabylonJsBridge.getInstance({
                                                                            'getAssetUrlWithType': (elementCharacter3dController, assetId) => {
                                                                                    return new Promise((resolve, reject) => {
                                                                                            try {
                                                                                                    const temp = (elementCharacter3dController && elementCharacter3dController['temp']) || {};
                                                                                                    const assetIdInfoMap = temp['assetIdInfoMap'] || {};
                                                                                                    const assetUrlWithType = assetIdInfoMap[assetId] || getAssetUrlWithTypeFromStore(assetId);
                                                                                                    resolve(assetUrlWithType);
                                                                                            } catch (error) {
                                                                                                    reject(error);
                                                                                            }
                                                                                    });
                                                                            }
                                                                    });
                                                                }).then(function() {
                                                                    resolve();
                                                                }).catch(function(errorMessage) {
                                                                    reject(errorMessage);
                                                                });
							} catch (error) {
								reject(error);
							}
						});
					};
				}

				const characters = data['characters'];
				const charactersApisReadyPromises = [];
				const characterInfoMap = new Map();

				characters.forEach((eachCharacter) => {
					const cellId = eachCharacter['cellId'];
					const animationsJsonObject = eachCharacter['animationsJsonObject'];
					const bounds = eachCharacter['bounds'];
					const x = bounds['x'];
					const y = bounds['y'];
					const width = bounds['width'];
					const height = bounds['height'];
					const characterBounds = { x, y, width, height }; // (#106984, 2024-03-04 12:16)
					const htmlString = `<foreignObject><div style="position: absolute; left:${x}px; top:${y}px; width: ${width}px; height: ${height}px;"><character-3d cell-id="${cellId}" data-char-bounds="${escapeHtml(JSON.stringify(characterBounds))}" animations_json="${escapeHtml(JSON.stringify(animationsJsonObject))}" style="width: 100%; height: 100%; position: absolute;"></character-3d></div></foreignObject>`;
					graphViewDrawPaneGroupElement.insertAdjacentHTML('beforeend', htmlString);
					const character3dElement = graphViewDrawPaneGroupElement.lastChild.querySelector('character-3d');
					character3dElement.originalBounds = { x, y, width, height };
					const disposeActions = export3DVideoApi.data.disposeActions;
					disposeActions.push(() => {
						character3dElement.remove();
					});
					charactersApisReadyPromises.push(new Promise((resolve, reject) => {
                                                new Promise((resolve, reject) => {
                                                    try {
                                                            if (character3dElement.api != null) {
                                                                    resolve(true);
                                                                    return;
                                                            }
                                                            const character3dElementApiReadyListener = () => {
                                                                    character3dElement.removeEventListener('apiReady', character3dElementApiReadyListener);
                                                                    resolve();
                                                            };
                                                            character3dElement.addEventListener('apiReady', character3dElementApiReadyListener);
                                                            disposeActions.push(() => {
                                                                    character3dElement.removeEventListener('apiReady', character3dElementApiReadyListener);
                                                            });
                                                    } catch (error) {
                                                            reject(error);
                                                    }
                                                }).then(() => {
                                                    resolve();
                                                }).catch((errorMessage) => {
                                                    reject(errorMessage);
                                                });
					}));
					characterInfoMap.set(eachCharacter, {
						character3dElement
					});
				});

				const assetPromises = [];
				(() => {
					const handleAudioInfo = (speechWrapper, fetchKey, contentKey) => {
						if (speechWrapper[contentKey]) {
							return;
						}
						const fetchInfo = speechWrapper[fetchKey];
						if (fetchInfo == null) {
							return;
						}
						const actualUrl = fetchInfo['actualUrl'];
						const actualUrlFetchOptions = fetchInfo['actualUrlFetchOptions'];
						if (actualUrl == null) {
							return;
						}
						assetPromises.push(new Promise((resolve, reject) => {
							fetch(actualUrl, actualUrlFetchOptions).then(resp => resp.json()).then((content) => {
								speechWrapper[contentKey] = content;
								resolve(content);
							}).catch(reject);
						}));
					};
					characters.map((eachCharacter) => {
						const speechesForApi = eachCharacter['speechesForApi'];
						if (speechesForApi == null) {
							return;
						}
						speechesForApi.map((speechWrapper) => {
							handleAudioInfo(speechWrapper, 'blendShapesFetch', 'blendShapes');
							handleAudioInfo(speechWrapper, 'spectrumFetch', 'spectrum');
						});
					});
				})();

				Promise.allSettled(assetPromises).then(() => {
					return Promise.all(charactersApisReadyPromises);
				}).then(() => {
					console.log('All characters APIs ready');

					elementCharacter3dControllerPromise.then(() => {
						console.log('Characters Controller ready');

						const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
						elementCharacter3dController['applyBrightness']();
						elementCharacter3dController['prepareApplyCamera']();
						export3DVideoApi.data.disposeActions.push(() => {
							elementCharacter3dController['finishApplyCamera']();
						});
						const infoForCamera = elementCharacter3dController['getInfoForCamera']();
						const timeline = export3DVideoApi.data.timeline;
						characters.forEach((eachCharacter) => {
							const { character3dElement } = characterInfoMap.get(eachCharacter);
							const cellAnimationInfo = eachCharacter['cellAnimationInfo'];
                                                        
							const api = character3dElement.api;
                                                        
							const startTime = cellAnimationInfo['startTime'];
							const duration = api['getTimelineDuration']();
                                                        
                                                        
							const animationObject = { value: 0 };
							api['initForSeekCapture']();

							let tween; // (#107588)
							/*const */tween = gsap.to(animationObject, {
								value: 1,
								duration: duration,
								onUpdate: () => {
									if (tween) { // (#107588)
										const progress = tween.progress();
										api.seek(duration * progress);
									}
								}
							});
							timeline.add(tween, startTime);
							const speechesForApi = eachCharacter['speechesForApi'];
							if (speechesForApi != null) {
								api['buildTimelineForSpeeches'](speechesForApi, timeline);
							}
                                                        
							const positions = cellAnimationInfo['positions'];
							
							if (positions != null && 
								positions.length > 0) {
							
								const scaleRatio = 1;
								
								const translateX = 0;
								const translateY = 0;

								// To make character bounds ready for build positions timeline.
								elementCharacter3dController['applyCamera'](scaleRatio, translateX, translateY);
							
							
								const playheadTimeRelativeToCharacter = 0;

								const zoomRatio = 1;
								character3dElement.api['buildMoveCharacterByActionsTimeline'](playheadTimeRelativeToCharacter, timeline, positions, zoomRatio);
							}
							
							var headOrientations = cellAnimationInfo['headOrientations'];
							// if (headOrientations != null && headOrientations.length > 0) {
							// 	const videoDuration = data['pageMeta']['video_duration'];
							// 	const timelineStayTime = data['page']['animationInfo']['timelineEndStayTime'] || 0;
							// 	const timelineEndTime = videoDuration - timelineStayTime;

							// 	cellAnimationInfo['headOrientations'] = cellAnimationInfo['headOrientations'].filter(eachHeadOrientation => {
                            //         if (eachHeadOrientation['wholeScene']) {
                            //             eachHeadOrientation['startTime'] = 0;
                            //             eachHeadOrientation['duration'] = timelineEndTime;
                            //             eachHeadOrientation['keepApply'] = true;
                            //             return true;
                            //         }
                                    
                            //         const startTime = eachHeadOrientation['startTime'];
                            //         const duration = eachHeadOrientation['duration'];

                            //         if (timelineEndTime - startTime < 0.5) { // duration too small
                            //             return false;
                            //         }
                                    
                            //         if (timelineEndTime - (startTime + duration) < 1e-6) { // close to or exceed timelineEndTime
                            //             eachHeadOrientation['duration'] = timelineEndTime - startTime; // trim exceeded duration
                            //             eachHeadOrientation['keepApply'] = true;
                            //         }
                            //         else {
                            //             eachHeadOrientation['keepApply'] = false;
                            //         }

                            //         return true;
                            //     });

							// 	headOrientations = cellAnimationInfo['headOrientations'];

							// 	const characterStartTime = cellAnimationInfo['startTime'];

							// 	character3dElement.api.buildHeadOrientationByActionsTimeline(headOrientations, timeline, timelineEndTime, characterStartTime);
							// }

							const videoDuration = data['pageMeta']['video_duration'];
							const timelineStayTime = data['page']['animationInfo']['timelineEndStayTime'] || 0;
							const timelineEndTime = videoDuration - timelineStayTime;
							const characterStartTime = cellAnimationInfo['startTime'];
							character3dElement.api.buildHeadOrientationByActionsTimeline(headOrientations, timeline, timelineEndTime, characterStartTime);
							
							if (startTime > 0) {
								// Solve character shows T-pose if start time > 0.
								api.seek(0);
							}
						});

						const cameraInfo = data['camera'];
						if (cameraInfo != null) {
							const cameras = cameraInfo['cameras'];
							if (cameras && cameras.length > 0) {
                                                                const webDiagramBabylonJsBridgeUtilFunctions = WebDiagramBabylonJsBridge['utilFunctions'];
                                                            
								const getCameraBounds = (indexOfCamera) => {
									const eachCamera = cameras[indexOfCamera];
									return eachCamera['bounds'];
								};
								const getCameraScale = (indexOfCamera) => {
									const bounds = getCameraBounds(indexOfCamera);
									const roundFactor = 20;
									const width = bounds.width;
									const height = bounds.height;
									return Math.floor(roundFactor * Math.min(applyWidth / width, applyHeight / height)) / roundFactor;
								};
								const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
								const addTweenForCamera = (startTime, duration, indexOfCamera, forFillingGap) => {
									timeline['to']({
                                                                        }, {
										'duration': duration,
                                                                                
										'onUpdate': function () {
                                                                                        const applyTransform = (scaleRatio, translateX, translateY) => {
                                                                                            elementCharacter3dController['applyCamera'](scaleRatio, translateX, translateY);
                                                                                            export3DVideoApi.data.cameraDirty = false;
                                                                                        };

                                                                                    
                                                                                        var progress = this['progress']();

                                                                                        webDiagramBabylonJsBridgeUtilFunctions['addTweenForCamera'](cameras, indexOfCamera, applyWidth, applyHeight, forFillingGap, progress, applyTransform);
										}
									}, startTime);
								};
                                                                
                                                                
                                                                const timelineDuration = timeline['duration']();
                                                                
                                                                const handleCamera = (startTime, duration, indexOfCamera, forFillingGap) => {
                                                                    addTweenForCamera(startTime, duration, indexOfCamera, forFillingGap);
                                                                };
                                                                
                                                                webDiagramBabylonJsBridgeUtilFunctions['traverseAllCamerasWithFillingGaps'](cameras, timeline, handleCamera);
							}
						}

						export3DVideoApi['seekTo'](0.1).then(() => {
							export3DVideoApi['seekTo'](0).then(() => {

								rollbackAll.forEach(rollback => rollback());

								resolve(true);
							}).catch(reject);
						}).catch(reject);
					}).catch(reject);
				}).catch(reject)
			} catch (error) {
				reject(error);
			}
		});
	};
	export3DVideoApi['startCapturing'] = () => {
		return Promise.resolve(true);
	};
	export3DVideoApi['isCapturing'] = () => {
		const timeline = export3DVideoApi.data.timeline;
		return timeline != null;
	};
	export3DVideoApi['resetSeekCount'] = () => {
	};
	export3DVideoApi['waitForSeekCount'] = () => {
		return Promise.resolve(true);
	};
	export3DVideoApi['increaseSeekCount'] = () => {
	};
	export3DVideoApi['decreaseSeekCount'] = () => {
	};
	export3DVideoApi['ensureDebugElement'] = () => {
		let debugElement = document.querySelector('#ani-api-debug');
		if (debugElement != null) {
			return debugElement;
		}
		debugElement = document.createElement('div');
		debugElement.setAttribute('id', 'ani-api-debug');
		debugElement.style.pointerEvents = 'none';
		debugElement.style.position = 'absolute';
		debugElement.style.top = '0px';
		debugElement.style.left = '0px';
		document.body.appendChild(debugElement);
		return debugElement;
	};
	export3DVideoApi['render'] = (action) => {
		const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
		window.requestAnimationFrame(() => {
			elementCharacter3dController['renderOnce']().then(() => {
				window.requestAnimationFrame(() => {
					elementCharacter3dController['renderOnce']().then(action);
				});
			});
		});
	};
	export3DVideoApi['seekTo'] = (time) => {
		return new Promise((resolve, reject) => {
			try {
				const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
				const timeline = export3DVideoApi.data.timeline;
				elementCharacter3dController['clearRender']();
				timeline['seek'](time, false);
				// const options = export3DVideoApi.data.options;
				export3DVideoApi['render'](() => {
					if (export3DVideoApi.data.cameraDirty) {
						export3DVideoApi.data.applyCamera();
						export3DVideoApi['render'](() => {
							resolve(true);
						});
					} else {
						resolve(true);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	};
	export3DVideoApi['pause'] = (time) => {
		return new Promise((resolve, reject) => {
			try {
				const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
				const timeline = export3DVideoApi.data.timeline;
				elementCharacter3dController['clearRender']();
				timeline['pause'](time, false);
				export3DVideoApi['render'](() => {
					resolve(true);
				});
			} catch (error) {
				reject(error);
			}
		});
	};
	export3DVideoApi['play'] = (time) => {
		return new Promise((resolve, reject) => {
			try {
				const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
				const timeline = export3DVideoApi.data.timeline;
				elementCharacter3dController['clearRender']();
				timeline['play'](time, false);
				elementCharacter3dController['startRender']();
				window.requestAnimationFrame(() => {
					// elementCharacter3dController['clearRender']();
					resolve(true);
				});
			} catch (error) {
				reject(error);
			}
		});
	};
	export3DVideoApi['canRecordVideo'] = () => {
		try {
			const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
			const scene = elementCharacter3dController['getScene']();
			const engine = scene.getEngine();
			// const canvas = engine.getRenderingCanvas();
			return BABYLON.VideoRecorder.IsSupported(engine);
		} catch (error) {
			console.log(error);
			return false;
		}
	};
	export3DVideoApi['recordVideo'] = (fromTime, toTime) => {
		return new Promise((resolve, reject) => {
			try {
				const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
				const scene = elementCharacter3dController['getScene']();
				const engine = scene.getEngine();
				const totalDuration = toTime - fromTime;
				const timeline = export3DVideoApi.data.timeline;
				elementCharacter3dController['clearRender']();
				elementCharacter3dController['startRender']();
				timeline['pause'](fromTime, false);
				// const canvas = engine.getRenderingCanvas();
				const recorder = new BABYLON.VideoRecorder(engine);
				export3DVideoApi.data.recorder = recorder;
				timeline['play'](fromTime, false);
				recorder.startRecording(null, totalDuration).then(async (videoBlob) => {
					try {
						timeline['pause'](toTime, false);
						const forWebmController = export3DVideoApi.data.forWebmController;
						if (forWebmController) {
							resolve(videoBlob);
							return;
						}
						// show if use dataURL to pass blob
						// const dataURL = await blobToDataUrl(videoBlob);
						// resolve(videoBlob);
						let videoArrayBuffer = await videoBlob.arrayBuffer();
						let videoUint8Array = new Uint8Array(videoArrayBuffer);
						videoArrayBuffer = null; // free memory
						resolve(Array.from(videoUint8Array));
						videoUint8Array = null; // free memory
					} catch (error) {
						reject(error);
					}
				}).catch(reject).finally(() => {
					elementCharacter3dController['clearRender']();
					recorder.dispose();
					export3DVideoApi.data.recorder = null;
					delete export3DVideoApi.data.recorder;
				});
			} catch (error) {
				reject(error);
			}
		});
	};
	export3DVideoApi['stopRecordVideo'] = () => {
		const recorder = export3DVideoApi.data.recorder;
		if (recorder != null) {
			recorder.stopRecording();
		}
	};
	export3DVideoApi['canCaptureVideo'] = () => {
		return false;
	};
	export3DVideoApi['captureVideo'] = (fromTime, toTime) => {
		return Promise.reject(false);
	};
	export3DVideoApi['dispose'] = () => {
		return new Promise((resolve, reject) => {
			try {
				const disposeActions = export3DVideoApi.data.disposeActions;
				disposeActions.map(disposeAction => disposeAction());
				disposeActions.length = 0;
				const timeline = export3DVideoApi.data.timeline;
				if (timeline != null) {
					timeline['kill']();
				}
				const forWebmController = export3DVideoApi.data.forWebmController;
				if (forWebmController) {
					const divNode = forWebmController['divNode'];
					divNode.remove();
				}
				const elementCharacter3dController = export3DVideoApi.data.elementCharacter3dController;
				if (elementCharacter3dController != null) {
					const scene = elementCharacter3dController['getScene']();
					const engine = scene.getEngine();
					scene['dispose']();
					elementCharacter3dController['dispose']();
				}
				export3DVideoApi.data = {
					timeline: null,
					elementCharacter3dController: null,
					forWebmController: null,
					forFilpbookApi: null,
					disposeActions: []
				}
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};
	return export3DVideoApi;
};