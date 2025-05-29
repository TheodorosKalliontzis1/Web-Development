(() => {
	if (!window.customElements.get('character-player')) {
		const GeneralUtils = {
			globalLoadingUrl: null,
			playerLoadingUrl: 'js/character-player/loading.svg',
			gcTimeout: 5 * 1000,
			spriteApproach: 'sprite',
			frameSetApproach: 'frameSet',

			getCharacterPlayerApproach: () => {
				const aniApi = window['aniApi'];
				if (aniApi && aniApi['isCapturing']()) {
					return GeneralUtils.frameSetApproach;
				}
				return GeneralUtils.spriteApproach;
			},

			compressAnimationJson: (animationJson) => {
				const character_json = animationJson['character_json'];
				const action = character_json['action']['action'];
				const category = character_json['action']['category'];
				const expression = character_json['action']['expression'];
				const talking_status = character_json['action']['talking_status'];
				const accessory_eyewear = character_json['parts']['accessory_eyewear'];
				const accessory_head = character_json['parts']['accessory_head'];
				const bottom = character_json['parts']['bottom'];
				const bottom_long = character_json['parts']['bottom_long'];
				const character = character_json['parts']['character'];
				const eye_brows = character_json['parts']['eye_brows'];
				const eyes = character_json['parts']['eyes'];
				const face = character_json['parts']['face'];
				const family = character_json['parts']['family'];
				const feet = character_json['parts']['feet'];
				const hair = character_json['parts']['hair'];
				const hands = character_json['parts']['hands'];
				const mouth = character_json['parts']['mouth'];
				const nose = character_json['parts']['nose'];
				const top = character_json['parts']['top'];
				const top_long = character_json['parts']['top_long'];
				return [action, category, expression, talking_status, accessory_eyewear, accessory_head, bottom, bottom_long, character, eye_brows, eyes, face, family, feet, hair, hands, mouth, nose, top, top_long];
			},

			decompressAnimationJson: (animationJson) => {
				const [action, category, expression, talking_status, accessory_eyewear, accessory_head, bottom, bottom_long, character, eye_brows, eyes, face, family, feet, hair, hands, mouth, nose, top, top_long] = animationJson;
				return {
					'character_json': {
						'action': {
							'action': action,
							'category': category,
							'expression': expression,
							'talking_status': talking_status
						},
						'parts': {
							'accessory_eyewear': accessory_eyewear,
							'accessory_head': accessory_head,
							'bottom': bottom,
							'bottom_long': bottom_long,
							'character': character,
							'eye_brows': eye_brows,
							'eyes': eyes,
							'face': face,
							'family': family,
							'feet': feet,
							'hair': hair,
							'hands': hands,
							'mouth': mouth,
							'nose': nose,
							'top': top,
							'top_long': top_long
						}
					}
				};
			},

			getChildNodeById: (node, id) => {
				let childNode = node.querySelector(`#${id}`);
				if (childNode == null && node.memoryChildNodes) {
					childNode = node.memoryChildNodes[id];
				}
				return childNode;
			},

			convertStringToBase64: (string) => {
				return btoa(string);
			},

			removeAllChildren: (parent) => {
				while (parent.firstChild != null) {
					parent.removeChild(parent.lastChild);
				}
				if (parent.memoryChildNodes) {
					parent.memoryChildNodes = {};
				}
			},

			setNodeVisible: (frameNode, visible) => {
				if (visible) {
					frameNode.style.display = '';
				} else {
					frameNode.style.display = 'none';
				}
			},

			blobBase64: (response) => {
				return new Promise((resolve, reject) => {
					response.blob().then(blob => {
						const reader = new FileReader();
						reader.onloadend = () => {
							const base64 = reader.result.replace(/^data:.+;base64,/, '');
							resolve(base64)
						};
						reader.readAsDataURL(blob);
					}).catch(reject);
				});
			},

			getAnimationUtils: (animationJson) => {
				const { character_json: characterJson } = animationJson;
				if (characterJson) {
					return CharacterUtils;
				}
			},
		};

		const GsapUtil = {
			scriptUrls: [
				{
					url: 'js/gsap/gsap.min.js',
					needLoad: () => {
						return typeof (window.gsap) == 'undefined';
					},
				},
			],
		};

		const CharacterUtils = {
			frameWidth: 2400,
			frameHeight: 2400,
			defaultSvgText: '<svg xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="F1" style="" viewBox="0,0,400,400"></svg>',
			frameSetFrameCount: 50,
			framePerSecond: 20,

			calculateCacheKey: (animationJson) => {
				const { character_json: characterJson } = animationJson;
				const action = characterJson['action'];
				return JSON.stringify({
					'parts': characterJson['parts'],
					'action': {
						'category': action['category'],
						'action': action['action'],
						'expression': action['expression'],
						'talking_status': action['talking_status'],
					},
				});
			},

			getAnimationId: (animationJson) => {
				const { character_json: characterJson } = animationJson;
				return characterJson['id'];
			},

			getAnimationLogicalId: (animationJson) => {
				const { character_json: characterJson } = animationJson;
				return characterJson['logical_id'];
			},

			getFrameCount: (animationJson) => {
				const { character_json: characterJson } = animationJson;
				return characterJson['action']['frame_count'];
			},

			getSingleFrameNumber: (animationJson) => {
				return animationJson['single_frame_number'];
			},

			getTimelineDuration: (animationJson) => {
				return animationJson['timeline_duration'];
			},

			getTimelineSpeed: (animationJson) => {
				return animationJson['timeline_speed'];
			},

			getRelativeStartTime: (animationJson) => {
				return animationJson['relative_start_time'];
			},

			getRelativeRepeat: (animationJson) => {
				return animationJson['relative_repeat'];
			},

			getFirstFrameNumber: (animationJson) => {
				return animationJson['first_frame_number'];
			},

			getLastFrameNumber: (animationJson) => {
				return animationJson['last_frame_number'];
			},

			getActualAnimationId: (animationId) => {
				if (animationId && animationId.endsWith('-GAP')) {
					animationId = animationId.substring(0, animationId.length - 4);
				}
				return animationId;
			},

			getRelativeRepeatStartRepeat: (relativeRepeat) => {
				return relativeRepeat['start']['repeat'];
			},

			getRelativeRepeatStartDuration: (relativeRepeat) => {
				return relativeRepeat['start']['duration'];
			},

			getRelativeRepeatTotalRepeat: (relativeRepeat) => {
				return relativeRepeat['total']['repeat'];
			},

			patchAnimationsJson: (animationsJson) => {
				const getStartTimeForTimeline = (animationJson) => {
					const timelineStartTime = animationJson['timeline_start_time'];
					if (timelineStartTime != null) {
						return timelineStartTime;
					}
					return null;
				};
				const getDurationForTimeline = (animationJson) => {
					const timelineDuration = CharacterUtils.getTimelineDuration(animationJson);
					if (timelineDuration != null) {
						return timelineDuration;
					}
					const timelineSpeed = CharacterUtils.getTimelineSpeed(animationJson) || 1;
					const frameCount = CharacterUtils.getFrameCount(animationJson);
					return frameCount * (1.0 / (CharacterUtils.framePerSecond * timelineSpeed));
				};
				const animations = [];
				let time = 0;
				const calculateFrameNumber = (animationJson, time) => {
					const timelineSpeed = CharacterUtils.getTimelineSpeed(animationJson) || 1;
					const frameCount = CharacterUtils.getFrameCount(animationJson);
					return Math.max(1, time <= 0 ? 1 : Math.floor((time % (frameCount * (1.0 / (CharacterUtils.framePerSecond * timelineSpeed)))) * (CharacterUtils.framePerSecond * timelineSpeed)));
				};
				const calculateRepeat = (animationJson, startTime, duration) => {
					const timelineSpeed = CharacterUtils.getTimelineSpeed(animationJson) || 1;
					const frameCount = CharacterUtils.getFrameCount(animationJson);
					const each = frameCount * (1.0 / (CharacterUtils.framePerSecond * timelineSpeed));
					let times = 0;
					let durationLeft = duration;
					if (startTime > 0) {
						const first = (each - startTime);
						durationLeft -= first;
						times++;
					}
					if (durationLeft > 0) {
						times += Math.ceil(durationLeft / each);
					}
					times--; // it is repeat, not times
					times = Math.max(0, times); // -1 means unlimited, avoid it
					const startTimes = Math.floor(startTime / each);
					return {
						'start': {
							'repeat': startTimes,
							'duration': startTimes * each,
						},
						'total': {
							'repeat': times,
							'duration': times * each,
						},
					};
				};
				const appendAnimation = (animation) => {
					animations.push(animation);
				};
				animationsJson.map(animationJson => {
					const startTime = (animations.length == 0) ? 0 : Math.max(getStartTimeForTimeline(animationJson) || time, time);
					const duration = getDurationForTimeline(animationJson);
					animationJson = JSON.parse(JSON.stringify(animationJson));
					const animationId = animationJson['character_json']['id'];
					const relativeStartTime = 0;
					const relativeEndTime = relativeStartTime + duration;
					const relativeRepeat = calculateRepeat(animationJson, relativeStartTime, duration);
					const firstFrameNumber = calculateFrameNumber(animationJson, relativeStartTime);
					const lastFrameNumber = calculateFrameNumber(animationJson, relativeEndTime);
					animationJson['character_json']['logical_id'] = animationId;
					animationJson['timeline_start_time'] = startTime;
					animationJson['timeline_duration'] = duration;
					animationJson['relative_start_time'] = relativeStartTime;
					animationJson['relative_repeat'] = relativeRepeat;
					animationJson['first_frame_number'] = firstFrameNumber;
					animationJson['last_frame_number'] = lastFrameNumber;
					const animation = {
						id: animationId,
						startTime,
						duration,
						firstFrameNumber,
						lastFrameNumber,
						json: animationJson
					};
					if (startTime > time) {
						const previousAnimation = animations[animations.length - 1];
						const gapId = previousAnimation.id + '-GAP';
						const gapStartTime = time;
						const gapDuration = startTime - time;
						const gapAnimationJson = JSON.parse(JSON.stringify(previousAnimation['json']));
						const gapRelativeStartTime = 0;
						// const gapRelativeEndTime = gapRelativeStartTime + gapDuration;
						const gapRelativeRepeat = calculateRepeat(gapAnimationJson, gapRelativeStartTime, gapDuration);
						const gapFirstFrameNumber = previousAnimation.lastFrameNumber;
						const gapLastFrameNumber = previousAnimation.lastFrameNumber;
						const gapSingleFrameNumber = previousAnimation.lastFrameNumber;
						gapAnimationJson['character_json']['id'] = gapId;
						gapAnimationJson['character_json']['logical_id'] = gapId;
						gapAnimationJson['timeline_start_time'] = gapStartTime;
						gapAnimationJson['timeline_duration'] = gapDuration;
						gapAnimationJson['relative_start_time'] = gapRelativeStartTime;
						gapAnimationJson['relative_repeat'] = gapRelativeRepeat;
						gapAnimationJson['first_frame_number'] = gapFirstFrameNumber;
						gapAnimationJson['last_frame_number'] = gapLastFrameNumber;
						gapAnimationJson['single_frame_number'] = gapSingleFrameNumber;
						const gapAnimation = {
							id: gapId,
							startTime: gapStartTime,
							duration: gapDuration,
							firstFrameNumber: gapFirstFrameNumber,
							lastFrameNumber: gapLastFrameNumber,
							json: gapAnimationJson
						};
						animations.push(gapAnimation);
					}
					appendAnimation(animation);
					time = startTime + duration;
				});
				return animations.map(animation => animation.json);
			},

			loadActionResource(animationJson, frameNumber, frameSetNumber, spriteImage, spriteJson, persist) {
				const fetchResource = () => {
					return new Promise((resolve, reject) => {
						const params = GeneralUtils.compressAnimationJson(animationJson);
						params.push(frameNumber);
						params.push(frameSetNumber);
						params.push(spriteImage);
						params.push(spriteJson);
						params.push(persist);
						fetch(`https://anitool.visual-paradigm.com/characteractionframes/${params.map(value => { if (value == null) { return '-N'; } else if (value === true) { return '-T'; } else if (value === false) { return '-F'; } return value; }).join('/')}`).then((response) => {
							let result = null;
							if (response.ok) {
								if (spriteImage) {
									result = GeneralUtils.blobBase64(response);
								} else {
									result = response.text();
								}
								result.then(resolve).catch(reject);
							} else {
								reject(response['statusText']);
							}
						}).catch((error) => {
							reject(error);
						});
					});
				};
				return fetchResource();
			}
		};

		class AnimationPlayer {
			constructor(characterPlayer, animationJson) {
				this.characterPlayer = characterPlayer;
				this.active = false;

				const imagesContainer = document.createElement('div');
				imagesContainer.style.position = 'absolute';
				imagesContainer.style.top = '0px';
				imagesContainer.style.bottom = '0px';
				imagesContainer.style.left = '0px';
				imagesContainer.style.right = '0px';
				imagesContainer.memoryChildNodes = {};
				this.imagesContainer = imagesContainer;

				const loadingNode = document.createElement('img');
				loadingNode.style.position = 'absolute';
				loadingNode.style.top = '0px';
				loadingNode.style.bottom = '0px';
				loadingNode.style.left = '0px';
				loadingNode.style.right = '0px';
				GeneralUtils.setNodeVisible(loadingNode, false);
				this.loadingNode = loadingNode;
				this.loading = 0;
				this.preloading = {};
				this.loaded = false;

				this.frameNumber = 1;
				this.frameCount = 0;
				this.progress = 0;

				if (this.characterPlayer.getAttribute('preview') == 'true') {
					this.approach = new FrameSetApproach(this);
				} else if (GeneralUtils.getCharacterPlayerApproach() == GeneralUtils.spriteApproach) {
					this.approach = new SpriteApproach(this);
				} else { // GeneralUtils.frameSetApproach
					this.approach = new FrameSetApproach(this);
				}
				this.setAnimationJson(animationJson);
			}

			setAnimationJson(animationJson) {
				this.animationJson = animationJson;
				this.loadCharacter().catch((error) => error && console.log(error));
			}

			getAnimationId() {
				const animationJson = this.animationJson;
				if (animationJson != null) {
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					return Utils.getAnimationId(animationJson);
				}
				return null;
			}

			getAnimationLogicalId() {
				const animationJson = this.animationJson;
				if (animationJson != null) {
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					return Utils.getAnimationLogicalId(animationJson);
				}
				return null;
			}

			dispatchEvent(event) {
				this.characterPlayer.dispatchEvent(event);
			}

			initiate(ignoreChecking) {
				const initiateResult = this.characterPlayer.initiate(ignoreChecking);
				if (initiateResult != true) {
					return initiateResult;
				}
				if (!this.active && !ignoreChecking) {
					return 'Not A';
				}
				if (!this.timeline) {
					this.timeline = new TimelineWrapper(this);
					if (this.characterPlayer.playerLoadingSource != null) {
						this.loadingNode.setAttribute('src', this.characterPlayer.playerLoadingSource);
					}
				}
				return true;
			}

			setActive(active) {
				if (this.active != active) {
					this.active = active;
					if (active) {
						if (!this.isLoading() && !this.isLoaded()) {
							this.loadCharacter().catch((error) => error && console.log(error));
						}
						this.characterPlayer.imagesContainer.appendChild(this.imagesContainer);
						this.characterPlayer.loadingNode.appendChild(this.loadingNode);
					} else {
						this.pause();
						this.rebuildTimeline();
						this.characterPlayer.imagesContainer.removeChild(this.imagesContainer);
						this.characterPlayer.loadingNode.removeChild(this.loadingNode);
					}
				}
			}

			rebuildLoadingNode() {
				let approachKey;
				if (this.characterPlayer.getAttribute('preview') == 'true') {
					approachKey = GeneralUtils.frameSetApproach;
				} else if (GeneralUtils.getCharacterPlayerApproach() == GeneralUtils.spriteApproach) {
					approachKey = GeneralUtils.spriteApproach;
				} else { // GeneralUtils.frameSetApproach
					approachKey = GeneralUtils.frameSetApproach;
				}
				const aniApi = window['aniApi'];
				GeneralUtils.setNodeVisible(this.loadingNode, this.isShowLoading(approachKey) && !(aniApi && aniApi['isCapturing']()));
			}

			setLoading(loading) {
				if (loading) {
					this.loading++;
				} else {
					this.loading--;
				}
				this.rebuildLoadingNode();
				if (loading) {
					if (this.loading == 1) {
						this.characterPlayer.rebuildLoading();
						this.dispatchEvent(new CustomEvent('animationStartLoading', { detail: { 'animationId': this.getAnimationId() } }));
					}
				} else {
					if (this.loading == 0) {
						this.characterPlayer.rebuildLoading();
						this.dispatchEvent(new CustomEvent('animationEndLoading', { detail: { 'animationId': this.getAnimationId() } }));
					}
				}
			}

			isLoading() {
				return this.loading > 0;
			}

			setPreloading(preloading, key) {
				if (preloading) {
					if (this.preloading[key] == null) {
						this.preloading[key] = 1;
					} else {
						this.preloading[key]++;
					}
				} else {
					this.preloading[key]--;
				}
				this.rebuildLoadingNode();
				if (preloading) {
					if (this.preloading[key] == 1) {
						this.characterPlayer.rebuildLoading();
						this.dispatchEvent(new CustomEvent('animationStartPreloading', { detail: { 'animationId': this.getAnimationId(), 'key': key } }));
					}
				} else {
					if (this.preloading[key] == 0) {
						this.characterPlayer.rebuildLoading();
						this.dispatchEvent(new CustomEvent('animationEndPreloading', { detail: { 'animationId': this.getAnimationId(), 'key': key } }));
					}
				}
			}

			isPreloading(key) {
				if (this.preloading[key] == null) {
					return false;
				}
				return this.preloading[key] > 0;
			}

			isShowLoading(key) {
				return this.loading > 0 || this.preloading[key] > 0;
			}

			setLoaded(loaded) {
				this.loaded = loaded;
				if (loaded) {
				} else {
					delete this.cacheKey;
				}
			}

			isLoaded() {
				return this.loaded;
			}

			rebuildTimeline() {
				if (this.timeline) {
					this.timeline.rebuild();
				}
			}

			loadActionResource(animationJson, frameNumber, frameSetNumber, spriteImage, spriteJson, persist) {
				const Utils = GeneralUtils.getAnimationUtils(animationJson);
				let loadPromise = null;
				const browserCache = this.characterPlayer['browser_cache'];
				const browserCacheKey = `${Utils.calculateCacheKey(animationJson)}|${frameNumber}|${frameSetNumber}|${spriteImage}|${spriteJson}`;
				if (browserCache) {
					loadPromise = browserCache['getCachedPromise'](browserCacheKey);
				}
				if (loadPromise == null) {
					loadPromise = Utils.loadActionResource(animationJson, frameNumber, frameSetNumber, spriteImage, spriteJson, persist);
					if (browserCache) {
						browserCache['setCachedPromise'](browserCacheKey, loadPromise);
						loadPromise.then(() => {
							loadPromise.done = true;
						}).catch(() => {
							browserCache['setCachedPromise'](browserCacheKey, null);
						});
					}
				}
				return new Promise((resolve, reject) => {
					loadPromise.then((resourceContent) => {
						if (frameNumber != null || frameSetNumber != null) {
							const div = document.createElement('div');
							div.innerHTML = resourceContent;
							resolve(div.firstElementChild);
						} else if (spriteImage || spriteJson) {
							resolve(resourceContent);
						}
					}).catch(reject);
				});
			}

			loadCharacter(ignoreChecking) {
				return new Promise(function (resolve, reject) {
					const resolveWrapper = function (result) {
						this.setLoaded(true);
						resolve(result);
					}.bind(this);
					const rejectWrapper = function (error) {
						this.setLoaded(false);
						reject(error);
					}.bind(this);
					const initiateResult = this.initiate(ignoreChecking);
					if (initiateResult != true) {
						rejectWrapper(initiateResult);
						return;
					}
					const animationJson = this.animationJson;
					if (!animationJson) {
						rejectWrapper('No AJ');
						return;
					}
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					const singleFrameNumber = Utils.getSingleFrameNumber(animationJson);
					const cacheKey = Utils.calculateCacheKey(animationJson);

					try {
						this.characterPlayer.ignoreRebuildLoading++;
						this.dispatchEvent(new CustomEvent('animationStartLoad', { detail: { 'animationId': this.getAnimationId() } }));
						this.setLoading(true);

						if (this.cacheKey == cacheKey) {
							this.rebuildTimeline();
							this.setLoading(false);
							this.dispatchEvent(new CustomEvent('animationEndLoad', { detail: { 'animationId': this.getAnimationId() } }));
							resolveWrapper();
							return;
						}
						this.cacheKey = cacheKey;
					} finally {
						this.characterPlayer.ignoreRebuildLoading--;
						this.characterPlayer.rebuildLoading();
					}

					if (this.timeline) {
						this.timeline.clear();
					}
					GeneralUtils.removeAllChildren(this.imagesContainer);
					this.setFrameNumber(1);
					this.frameCount = Utils.getFrameCount(animationJson);
					this.progress = 0;

					this.approach.loadCharacter(resolveWrapper, rejectWrapper, singleFrameNumber, cacheKey);
				}.bind(this));
			}

			preloadPlay() {
			}

			isPlaying() {
				if (this.timeline) {
					return this.timeline.playing;
				}
				return false;
			}

			setFrameNumber(frameNumber) {
				const fireEvent = (this.getAnimationId() == this.characterPlayer.getAnimationId() && this.frameNumber != frameNumber);
				try {
					this.frameNumber = frameNumber;
				} finally {
					if (fireEvent) {
						this.dispatchEvent(new CustomEvent('animationFrameNumberChanged', { 'detail': { 'frameNumber': frameNumber } }));
					}
				}
			}

			getFrameNumber() {
				return this.frameNumber;
			}

			getFrameCount() {
				return this.frameCount;
			}

			getDuration() {
				const animationJson = this.animationJson;
				if (animationJson) {
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					const timelineSpeed = Utils.getTimelineSpeed(animationJson) || 1;
					return this.frameCount * (1.0 / (Utils.framePerSecond * timelineSpeed));
				}
				return 0;
			}

			getDurationForTimeline() {
				const animationJson = this.animationJson;
				if (animationJson) {
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					const timelineDuration = Utils.getTimelineDuration(animationJson);
					if (timelineDuration != null) {
						return timelineDuration;
					}
					const timelineSpeed = Utils.getTimelineSpeed(animationJson) || 1;
					const frameCount = Utils.getFrameCount(animationJson);
					return frameCount * (1.0 / (Utils.framePerSecond * timelineSpeed));
				}
				return 0;
			}

			prepareTimeline() {
				if (this.timeline && !this.isLoading()) {
					this.timeline.prepareTimeline();
				}
			}

			play() {
				if (this.timeline && !this.isLoading()) {
					this.forTimeline = false;
					this.timeline.play();
				}
			}

			playForTimeline() {
				if (this.timeline && !this.isLoading()) {
					this.forTimeline = true;
					const duration = this.getDurationForTimeline();
					const fromTime = this.progress * duration;
					this.timeline.playForTimeline(fromTime);
				}
			}

			playOnce() {
				if (this.timeline && !this.isLoading()) {
					this.forTimeline = false;
					this.timeline.playOnce();
				}
			}

			seek(time) {
				if (this.timeline && !this.isLoading()) {
					this.forTimeline = false;
					this.timeline.seek(time);
				}
			}

			seekForTimeline(time) {
				if (this.timeline && !this.isLoading()) {
					this.forTimeline = true;
					this.timeline.seek(time);
				}
			}

			pause() {
				if (this.timeline) {
					this.timeline.pause();
				}
			}

			pauseForTimeline() {
				this.pause();
			}

			stop() {
				if (this.timeline) {
					this.timeline.stop();
				}
			}

			restart() {
				if (this.timeline && !this.isLoading()) {
					this.timeline.restart();
				}
			}

			clear() {
				delete this.cacheKey;
				delete this.animationJson;
				if (this.timeline) {
					this.timeline.clear();
				}
				GeneralUtils.removeAllChildren(this.imagesContainer);
				this.setFrameNumber(1);
				this.frameCount = 0;
				this.progress = 0;
			}

			freeMemory() {
				if (this.timeline) {
					this.timeline.clear();
				}
				GeneralUtils.removeAllChildren(this.imagesContainer);
			}

			kill() {
				this.setActive(false);
				delete this.cacheKey;
				delete this.animationJson;
				if (this.timeline) {
					this.timeline.kill();
				}
				GeneralUtils.removeAllChildren(this.imagesContainer);
				this.setFrameNumber(1);
				this.frameCount = 0;
				this.progress = 0;
			}
		};

		class FrameSetApproach {
			constructor(animationPlayer) {
				this.animationPlayer = animationPlayer;
			}

			appendActionFrame(frameNumber, frameNode) {
				frameNode.setAttribute('id', `F${frameNumber}`);
				if (this.animationPlayer.characterPlayer.getAttribute('preview') == 'true') {
				} else {
					GeneralUtils.setNodeVisible(frameNode, false);
				}
				this.animationPlayer.imagesContainer.memoryChildNodes[`F${frameNumber}`] = frameNode;
			}

			loadActionFrame(frameNumber, singleFrameNumber, persist) {
				return new Promise(function (resolve, reject) {
					const animationJson = this.animationPlayer.animationJson;
					const loadFrameNumber = singleFrameNumber != null ? singleFrameNumber : frameNumber;
					const loadFrameSetNumber = null;
					const loadSpriteImage = false;
					const loadSpriteJson = false;
					const loadPersist = persist;
					this.animationPlayer.loadActionResource(animationJson, loadFrameNumber, loadFrameSetNumber, loadSpriteImage, loadSpriteJson, loadPersist).then(function (frameNode) {
						frameNode.style.position = 'absolute';
						this.appendActionFrame(frameNumber, frameNode);
						resolve(true);
					}.bind(this)).catch(reject);
				}.bind(this));
			}

			loadActionFrameSet(frameSetNumber) {
				return new Promise(function (resolve, reject) {
					const animationJson = this.animationPlayer.animationJson;
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					const loadFrameNumber = null;
					const loadFrameSetNumber = frameSetNumber;
					const loadSpriteImage = false;
					const loadSpriteJson = false;
					const loadPersist = true;
					this.animationPlayer.loadActionResource(animationJson, loadFrameNumber, loadFrameSetNumber, loadSpriteImage, loadSpriteJson, loadPersist).then(function (frameSetNode) {
						const childNodes = [...frameSetNode.childNodes];
						const frameCount = childNodes.length;
						for (let index = 0; index < frameCount; index++) {
							const frameNumber = ((frameSetNumber - 1) * Utils.frameSetFrameCount) + (index + 1);
							const frameNode = childNodes[index];
							frameNode.style.position = 'absolute';
							this.appendActionFrame(frameNumber, frameNode);
						}
						resolve(true);
					}.bind(this)).catch(reject);
				}.bind(this));
			}

			loadCharacter(resolve, reject, singleFrameNumber, cacheKey) {
				if (this.animationPlayer.characterPlayer.getAttribute('preview') == 'true') {
					// only load first frame
					const persist = this.animationPlayer.characterPlayer.getAttribute('persist') != 'false';
					this.loadActionFrame(this.animationPlayer.getFrameNumber(), singleFrameNumber, persist).then(function () {
						if (this.animationPlayer.cacheKey != cacheKey) {
							this.animationPlayer.preloadPlay();
							this.animationPlayer.setLoading(false);
							this.animationPlayer.dispatchEvent(new CustomEvent('animationCancelLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
							reject('Wrong C');
							return;
						}
						this.animationPlayer.pause();
						this.animationPlayer.rebuildTimeline();
						this.animationPlayer.dispatchEvent(new CustomEvent('animationEndLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
						this.animationPlayer.preloadPlay();
						this.animationPlayer.setLoading(false);
						resolve();
					}.bind(this)).catch(function (error) {
						this.animationPlayer.pause();
						this.animationPlayer.rebuildTimeline();
						this.animationPlayer.preloadPlay();
						this.animationPlayer.setLoading(false);
						this.animationPlayer.dispatchEvent(new CustomEvent('animationFailLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId(), 'error': error } }));
						reject(error);
					}.bind(this));
				} else {
					const removeLoadPreviewNode = function () {
						const loadPreviewNode = GeneralUtils.getChildNodeById(this.animationPlayer.imagesContainer, 'loadPreview');
						if (loadPreviewNode != null) {
							loadPreviewNode.remove();
						}
					}.bind(this);

					this.loadActionFrame(this.animationPlayer.getFrameNumber(), singleFrameNumber, true).then(function () {
						if (this.animationPlayer.cacheKey != cacheKey) {
							this.animationPlayer.preloadPlay();
							this.animationPlayer.setLoading(false);
							this.animationPlayer.dispatchEvent(new CustomEvent('animationCancelLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
							reject('Wrong C');
							return;
						}
						this.animationPlayer.pause();
						this.animationPlayer.rebuildTimeline();
						const previewSvg = this.animationPlayer.imagesContainer.firstElementChild.outerHTML;
						GeneralUtils.setNodeVisible(this.animationPlayer.imagesContainer.firstElementChild, false);
						let loadPreviewNode = document.createElement('div');
						this.animationPlayer.imagesContainer.insertBefore(loadPreviewNode, this.animationPlayer.imagesContainer.firstElementChild);
						loadPreviewNode.outerHTML = previewSvg;
						loadPreviewNode = this.animationPlayer.imagesContainer.firstElementChild;
						loadPreviewNode.setAttribute('id', 'loadPreview');
						loadPreviewNode.style.position = 'absolute';
						// loadPreviewNode.style.filter = 'contrast(0) grayscale(1)';
						GeneralUtils.setNodeVisible(loadPreviewNode, true);

						if (singleFrameNumber != null) {
							const frameNode = GeneralUtils.getChildNodeById(this.animationPlayer.imagesContainer, `F${this.animationPlayer.getFrameNumber()}`);
							const tempDiv = document.createElement('div');
							const copyFrameNode = () => {
								tempDiv.innerHTML = frameNode.outerHTML;
								return tempDiv.firstElementChild;
							};
							const startIndex = 1;
							const endIndex = this.animationPlayer.frameCount;
							for (let frameNumber = startIndex; frameNumber <= endIndex; frameNumber++) {
								const copiedFrameNode = copyFrameNode();
								this.appendActionFrame(frameNumber, copiedFrameNode);
							}
							removeLoadPreviewNode();
							this.animationPlayer.pause();
							this.animationPlayer.rebuildTimeline();
							this.animationPlayer.preloadPlay();
							this.animationPlayer.setLoading(false);
							this.animationPlayer.dispatchEvent(new CustomEvent('animationEndLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
							resolve();
						} else {
							this.animationPlayer.setPreloading(true, GeneralUtils.frameSetApproach);
							const animationJson = this.animationPlayer.animationJson;
							const Utils = GeneralUtils.getAnimationUtils(animationJson);
							const startIndex = 0;
							const endIndex = Math.ceil(this.animationPlayer.frameCount / Utils.frameSetFrameCount);
							let loadingIndex = startIndex;
							const checkLoadingFrameSet = function () {
								if (loadingIndex < endIndex) {
									const frameSetNumber = loadingIndex + 1;
									this.loadActionFrameSet(frameSetNumber).then(function () {
										if (this.animationPlayer.cacheKey != cacheKey) {
											this.animationPlayer.preloadPlay();
											this.animationPlayer.setPreloading(false, GeneralUtils.frameSetApproach);
											this.animationPlayer.setLoading(false);
											this.animationPlayer.dispatchEvent(new CustomEvent('animationCancelLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
											reject('Wrong C');
											return;
										}
										loadingIndex++;
										checkLoadingFrameSet();
									}.bind(this)).catch(function (error) {
										removeLoadPreviewNode();
										this.animationPlayer.pause();
										this.animationPlayer.rebuildTimeline();
										this.animationPlayer.preloadPlay();
										this.animationPlayer.setPreloading(false, GeneralUtils.frameSetApproach);
										this.animationPlayer.setLoading(false);
										this.animationPlayer.dispatchEvent(new CustomEvent('animationFailLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId(), 'error': error } }));
										reject(error);
									}.bind(this));
								} else {
									if (this.animationPlayer.cacheKey != cacheKey) {
										this.animationPlayer.preloadPlay();
										this.animationPlayer.setPreloading(false, GeneralUtils.frameSetApproach);
										this.animationPlayer.setLoading(false);
										this.animationPlayer.dispatchEvent(new CustomEvent('animationCancelLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
										reject('Wrong C');
										return;
									}
									removeLoadPreviewNode();
									this.animationPlayer.pause();
									this.animationPlayer.rebuildTimeline();
									this.animationPlayer.preloadPlay();
									this.animationPlayer.setPreloading(false, GeneralUtils.frameSetApproach);
									this.animationPlayer.setLoading(false);
									this.animationPlayer.dispatchEvent(new CustomEvent('animationEndLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
									resolve();
								}
							}.bind(this);
							checkLoadingFrameSet();
						}
					}.bind(this)).catch(function (error) {
						removeLoadPreviewNode();
						this.animationPlayer.pause();
						this.animationPlayer.rebuildTimeline();
						this.animationPlayer.preloadPlay();
						this.animationPlayer.setLoading(false);
						this.animationPlayer.dispatchEvent(new CustomEvent('animationFailLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId(), 'error': error } }));
						reject(error);
					}.bind(this));
				}
			}

			prepareSingleTimeline(firstFrameNumber, singleFrameNumber, frameInterval) {
				const appendFrameNodes = function (firstFrameNumber) {
					for (let index = 0; index < this.animationPlayer.frameCount; index++) {
						const frameNumber = index + 1;
						const frameNode = GeneralUtils.getChildNodeById(this.animationPlayer.imagesContainer, `F${frameNumber}`);
						if (frameNode != null) {
							GeneralUtils.setNodeVisible(frameNode, frameNumber == firstFrameNumber);
							this.animationPlayer.imagesContainer.appendChild(frameNode);
						}
					}
				}.bind(this);
				const createSingleTimeline = function (firstFrameNumber) {
					const timeline = gsap.timeline({
						paused: true,
					});
					if (singleFrameNumber != null) {
						const startIndex = 0;
						const endIndex = this.animationPlayer.frameCount - 1;
						const frameNode = GeneralUtils.getChildNodeById(this.animationPlayer.imagesContainer, `F${singleFrameNumber}`);
						if (frameNode != null) {
							timeline.set(frameNode, {
								display: '',
								immediateRender: false,
							}, (startIndex + 1) * frameInterval);
							timeline.set(frameNode, {
								display: '',
								immediateRender: false,
							}, (endIndex + 2) * frameInterval);
						}
					} else {
						const addFrame = function (index, frameNumber) {
							const frameNode = GeneralUtils.getChildNodeById(this.animationPlayer.imagesContainer, `F${frameNumber}`);
							if (frameNode != null) {
								timeline.set(frameNode, {
									display: '',
									immediateRender: false,
								}, (index + 1) * frameInterval);
								timeline.set(frameNode, {
									display: 'none',
									immediateRender: false,
								}, (index + 2) * frameInterval);
							}
						}.bind(this);
						let frameNumber = firstFrameNumber;
						for (let index = 0; index < this.animationPlayer.frameCount; index++) {
							addFrame(index, frameNumber);
							frameNumber++;
							if (frameNumber > this.animationPlayer.frameCount) {
								frameNumber -= this.animationPlayer.frameCount;
							}
						}
					}
					return timeline;
				}.bind(this);
				appendFrameNodes(firstFrameNumber);
				return createSingleTimeline(firstFrameNumber);
			}

			rebuildPausedTimeline() {
				for (let index = 0; index < this.animationPlayer.frameCount; index++) {
					const frameNumber = index + 1;
					const frameNode = GeneralUtils.getChildNodeById(this.animationPlayer.imagesContainer, `F${frameNumber}`);
					if (frameNode != null) {
						if (this.animationPlayer.getFrameNumber() == frameNumber) {
							GeneralUtils.setNodeVisible(frameNode, true);
							this.animationPlayer.imagesContainer.appendChild(frameNode);
						} else {
							frameNode.remove();
							GeneralUtils.setNodeVisible(frameNode, false);
						}
					}
				}
			}

			clearTimeline() {
				for (let index = 0; index < this.animationPlayer.frameCount; index++) {
					const frameNumber = index + 1;
					const frameNode = GeneralUtils.getChildNodeById(this.animationPlayer.imagesContainer, `F${frameNumber}`);
					if (frameNode != null) {
						frameNode.remove();
						GeneralUtils.setNodeVisible(frameNode, false);
					}
				}
			}
		}

		class SpriteApproach {
			constructor(animationPlayer) {
				this.animationPlayer = animationPlayer;

				const scaleContainer = document.createElement('div');
				scaleContainer.style.position = 'absolute';
				scaleContainer.style.transformOrigin = '0 0';
				this.scaleContainer = scaleContainer;

				const imageContainer = document.createElement('div');
				imageContainer.style.position = 'absolute';
				scaleContainer.appendChild(imageContainer);
				this.imageContainer = imageContainer;
			}

			loadSpriteImage() {
				return new Promise(function (resolve, reject) {
					const animationJson = this.animationPlayer.animationJson;
					const loadFrameNumber = null;
					const loadFrameSetNumber = null;
					const loadSpriteImage = true;
					const loadSpriteJson = false;
					const loadPersist = true;
					this.animationPlayer.loadActionResource(animationJson, loadFrameNumber, loadFrameSetNumber, loadSpriteImage, loadSpriteJson, loadPersist).then(function (spriteImageContent) {
						this.imageContainer.style.background = `url("data:image/png;base64,${spriteImageContent}")`;
						this.animationPlayer.imagesContainer.appendChild(this.scaleContainer);
						resolve(true);
					}.bind(this)).catch(reject);
				}.bind(this));
			}

			loadSpriteJson() {
				return new Promise(function (resolve, reject) {
					const animationJson = this.animationPlayer.animationJson;
					const loadFrameNumber = null;
					const loadFrameSetNumber = null;
					const loadSpriteImage = false;
					const loadSpriteJson = true;
					const loadPersist = true;
					this.animationPlayer.loadActionResource(animationJson, loadFrameNumber, loadFrameSetNumber, loadSpriteImage, loadSpriteJson, loadPersist).then(function (spriteJsonContent) {
						this.spriteJson = JSON.parse(spriteJsonContent);
						resolve(true);
					}.bind(this)).catch(reject);
				}.bind(this));
			}

			loadThumbnail(frameNumber) {
				return new Promise(function (resolve, reject) {
					const animationJson = this.animationPlayer.animationJson;
					const loadFrameNumber = frameNumber;
					const loadFrameSetNumber = null;
					const loadSpriteImage = false;
					const loadSpriteJson = false;
					const loadPersist = false;
					this.animationPlayer.loadActionResource(animationJson, loadFrameNumber, loadFrameSetNumber, loadSpriteImage, loadSpriteJson, loadPersist).then((frameNode) => {
						frameNode.style.position = 'absolute';
						resolve(frameNode);
					}).catch(reject);
				}.bind(this));
			}

			loadCharacter(resolve, reject, singleFrameNumber, cacheKey) {
				Promise.all([this.loadSpriteImage(), this.loadSpriteJson()]).then(function () {
					if (this.animationPlayer.cacheKey != cacheKey) {
						this.animationPlayer.preloadPlay();
						this.animationPlayer.setLoading(false);
						this.animationPlayer.dispatchEvent(new CustomEvent('animationCancelLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
						reject('Wrong C');
						return;
					}
					const animationJson = this.animationPlayer.animationJson;
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					this.scaleContainer.style.transform = `scale(${1 / Math.min(this.spriteJson['frame_width'] / Utils.frameWidth, this.spriteJson['frame_height'] / Utils.frameHeight)})`;
					const frameNumber = singleFrameNumber != null ? singleFrameNumber : this.animationPlayer.getFrameNumber();
					const frame = this.spriteJson.frames[frameNumber - 1];
					this.imageContainer.style.transform = `translate(${frame.translate_x}px, ${frame.translate_y}px)`;
					this.imageContainer.style.width = `${frame.width}px`;
					this.imageContainer.style.height = `${frame.height}px`;
					this.imageContainer.style.backgroundPosition = `${-frame.x}px ${-frame.y}px`;
					this.animationPlayer.pause();
					this.animationPlayer.rebuildTimeline();
					this.animationPlayer.dispatchEvent(new CustomEvent('animationEndLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId() } }));
					this.animationPlayer.preloadPlay();
					this.animationPlayer.setLoading(false);
					resolve();
				}.bind(this)).catch(function (error) {
					this.animationPlayer.pause();
					this.animationPlayer.rebuildTimeline();
					this.animationPlayer.preloadPlay();
					this.animationPlayer.setLoading(false);
					this.animationPlayer.dispatchEvent(new CustomEvent('animationFailLoad', { detail: { 'animationId': this.animationPlayer.getAnimationId(), 'error': error } }));
					reject(error);
				}.bind(this));
			}

			prepareSingleTimeline(firstFrameNumber, singleFrameNumber, frameInterval) {
				const firstFrame = this.spriteJson.frames[firstFrameNumber - 1];
				this.imageContainer.style.transform = `translate(${firstFrame.translate_x}px, ${firstFrame.translate_y}px)`;
				this.imageContainer.style.width = `${firstFrame.width}px`;
				this.imageContainer.style.height = `${firstFrame.height}px`;
				this.imageContainer.style.backgroundPosition = `${-firstFrame.x}px ${-firstFrame.y}px`;
				const timeline = gsap.timeline({
					paused: true,
				});
				const addFrame = function (index, frameNumber) {
					const frame = this.spriteJson.frames[singleFrameNumber != null ? singleFrameNumber - 1 : frameNumber - 1];
					timeline.set(this.imageContainer, {
						x: `${frame.translate_x}px`,
						y: `${frame.translate_y}px`,
						width: `${frame.width}px`,
						height: `${frame.height}px`,
						backgroundPosition: `${-frame.x}px ${-frame.y}px`,
						immediateRender: false,
					}, (index * frameInterval));
					timeline.set(this.imageContainer, {
						x: `${frame.translate_x}px`,
						y: `${frame.translate_y}px`,
						width: `${frame.width}px`,
						height: `${frame.height}px`,
						backgroundPosition: `${-frame.x}px ${-frame.y}px`,
						immediateRender: false,
					}, (index + 1) * frameInterval - 0.0001);
				}.bind(this);
				let frameNumber = firstFrameNumber;
				for (let index = 0; index < this.animationPlayer.frameCount; index++) {
					addFrame(index, frameNumber);
					frameNumber++;
					if (frameNumber > this.animationPlayer.frameCount) {
						frameNumber -= this.animationPlayer.frameCount;
					}
				}
				return timeline;
			}

			rebuildPausedTimeline() {
				const frameNumber = this.animationPlayer.getFrameNumber();
				if (this.spriteJson != null) {
					const frame = this.spriteJson.frames[frameNumber - 1];
					this.imageContainer.style.transform = `translate(${frame.translate_x}px, ${frame.translate_y}px)`;
					this.imageContainer.style.width = `${frame.width}px`;
					this.imageContainer.style.height = `${frame.height}px`;
					this.imageContainer.style.backgroundPosition = `${-frame.x}px ${-frame.y}px`;
				}
			}

			clearTimeline() {
				this.scaleContainer.remove();
			}
		}

		class TimelineWrapper {
			constructor(animationPlayer) {
				this.animationPlayer = animationPlayer;
				this.timeline = null;
				this.initiated = false;
				this.playing = false;
				this.pauseAfterLimit = false;
			}

			setPlaying(playing) {
				this.playing = playing;
				this.animationPlayer.characterPlayer.rebuildPlaying();
			}

			prepareTimeline() {
				if (!this.initiated) {
					this.initiated = true;
					const animationJson = this.animationPlayer.animationJson;
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					const duration = Utils.getTimelineDuration(animationJson);
					const timelineSpeed = Utils.getTimelineSpeed(animationJson) || 1;
					const relativeStartTime = Utils.getRelativeStartTime(animationJson);
					const relativeEndTime = relativeStartTime + duration;
					const relativeRepeat = Utils.getRelativeRepeat(animationJson);
					const firstFrameNumber = Utils.getFirstFrameNumber(animationJson);
					const lastFrameNumber = Utils.getLastFrameNumber(animationJson);
					const singleFrameNumber = Utils.getSingleFrameNumber(animationJson);
					const preview = (this.animationPlayer.characterPlayer.getAttribute('preview') == 'true');
					const frameInterval = 1.0 / (CharacterUtils.framePerSecond * timelineSpeed);
					this.timeline = gsap.timeline({
						paused: true,
					});
					this.timelineOnUpdate = function () {
						if (this.animationPlayer.frameCount > 0) {
							const duration = this.animationPlayer.getDurationForTimeline();
							const progress = this.timeline.progress();
							const time = progress * duration;
							const eachDuration = this.animationPlayer.frameCount * (1.0 / (CharacterUtils.framePerSecond * timelineSpeed));
							if (singleFrameNumber != null) {
								this.animationPlayer.setFrameNumber(singleFrameNumber);
							} else {
								const normalizedTime = (relativeStartTime + time) % eachDuration;
								const frameNumber = time <= 0 ? 1 : Math.floor((normalizedTime / eachDuration) * this.animationPlayer.frameCount);
								if (frameNumber == 0) {
									this.animationPlayer.setFrameNumber(Math.abs(time - relativeStartTime) < Math.abs(time - (relativeStartTime + duration)) ? 1 : this.animationPlayer.frameCount);
								} else {
									this.animationPlayer.setFrameNumber(frameNumber);
								}
							}
							this.animationPlayer.progress = progress;
						}
					}.bind(this);
					this.timelineOnComplete = function () {
						if (this.pauseAfterLimit) {
							this.animationPlayer.setFrameNumber(lastFrameNumber);
							this.animationPlayer.progress = 1;
							if (this.animationPlayer.forTimeline) {
								const animationPlayer = this.animationPlayer;
								const characterPlayer = animationPlayer.characterPlayer;
								try {
									characterPlayer.ignoreRebuildPlaying++;
									animationPlayer.pauseForTimeline();
									const animationPlayers = characterPlayer.animationPlayers;
									const index = animationPlayers.indexOf(animationPlayer);
									if (index + 1 < animationPlayers.length) {
										const nextAnimationPlayer = animationPlayers[index + 1];
										nextAnimationPlayer.seekForTimeline(0);
										characterPlayer.setAnimationId(nextAnimationPlayer.getAnimationId());
										characterPlayer.ignoreRebuildPlaying++;
										nextAnimationPlayer.loadCharacter(true).then(() => {
											nextAnimationPlayer.seekForTimeline(0);
											nextAnimationPlayer.playForTimeline();
										}).finally(() => {
											characterPlayer.ignoreRebuildPlaying--;
											characterPlayer.rebuildPlaying();
										});
									}
								} finally {
									characterPlayer.ignoreRebuildPlaying--;
									characterPlayer.rebuildPlaying();
								}
							} else {
								this.animationPlayer.pause();
							}
						} else {
							this.animationPlayer.stop();
						}
						this.pauseAfterLimit = false;
					}.bind(this);
					this.timeline.eventCallback('onUpdate', this.timelineOnUpdate);
					this.timeline.eventCallback('onComplete', this.timelineOnComplete);
					if (preview) {
					} else {
						const singleTimeline = this.animationPlayer.approach.prepareSingleTimeline(firstFrameNumber, singleFrameNumber, frameInterval);
						const timeOffset = -Utils.getRelativeRepeatStartDuration(relativeRepeat);
						const repeatOffset = -Utils.getRelativeRepeatStartRepeat(relativeRepeat);
						const repeat = Utils.getRelativeRepeatTotalRepeat(relativeRepeat);
						const clipRepeat = repeat + repeatOffset;
						const clipStartTime = relativeStartTime + timeOffset;
						const clipEndTime = relativeEndTime + timeOffset;
						// const clipStartTimeInParent = -clipStartTime;
						const actualRepeat = clipRepeat;
						const actualStartTime = 0;
						const actualEndTime = clipEndTime - clipStartTime;
						const actualStartTimeInParent = 0;
						singleTimeline.repeat(actualRepeat);
						this.timeline.add(singleTimeline.tweenFromTo(actualStartTime, actualEndTime), actualStartTimeInParent);
					}
				}
			}

			disposeTimeline() {
				if (this.initiated) {
					this.initiated = false;
					this.timeline.pause();
					this.timeline.eventCallback('onUpdate', null);
					this.timeline.eventCallback('onComplete', null);
					delete this.timelineOnUpdate;
					this.timeline.kill();
					delete this.timeline;
				}
			}

			rebuild() {
				if (!this.playing) {
					this.animationPlayer.approach.rebuildPausedTimeline();
				}
			}

			playImpl() {
				this.prepareTimeline();
				this.setPlaying(true);
				const timelineDuration = this.animationPlayer.getDurationForTimeline();
				this.timeline.play(this.animationPlayer.progress * timelineDuration);
			}

			play() {
				this.pauseAfterLimit = false;
				this.playImpl();
			}

			playOnce() {
				this.seek(0);
				this.pauseAfterLimit = false;
				this.playImpl();
			}

			playForTimeline(fromTime) {
				this.seek(fromTime);
				this.pauseAfterLimit = true;
				this.playImpl();
			}

			seek(time) {
				const animationJson = this.animationPlayer.animationJson;
				if (animationJson) {
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					const duration = this.animationPlayer.getDurationForTimeline();
					const timelineSpeed = Utils.getTimelineSpeed(animationJson) || 1;
					const eachDuration = this.animationPlayer.frameCount * (1.0 / (Utils.framePerSecond * timelineSpeed));
					const relativeStartTime = Utils.getRelativeStartTime(animationJson);
					const normalizedTime = (relativeStartTime + time) % eachDuration;
					const frameNumber = time <= 0 ? 1 : Math.floor((normalizedTime / eachDuration) * this.animationPlayer.frameCount);
					if (frameNumber == 0) {
						this.animationPlayer.setFrameNumber(Math.abs(time - relativeStartTime) < Math.abs(time - (relativeStartTime + duration)) ? 1 : this.animationPlayer.frameCount);
					} else {
						this.animationPlayer.setFrameNumber(frameNumber);
					}
					this.animationPlayer.progress = time / duration;
					this.rebuild();
				}
			}

			pause() {
				if (this.timeline) {
					this.pauseAfterLimit = false;
					this.setPlaying(false);
					this.timeline.pause();
				}
				this.rebuild();
				this.disposeTimeline();
			}

			stop() {
				if (this.timeline) {
					this.pauseAfterLimit = false;
					this.setPlaying(false);
					this.timeline.pause();
				}
				this.animationPlayer.setFrameNumber(1);
				this.animationPlayer.progress = 0;
				this.rebuild();
				this.disposeTimeline();
			}

			restart() {
				this.prepareTimeline();
				this.setPlaying(true);
				this.timeline.restart();
			}

			clear() {
				if (this.timeline) {
					this.pauseAfterLimit = false;
					this.setPlaying(false);
					this.timeline.pause();
				}
				this.animationPlayer.approach.clearTimeline();
				this.disposeTimeline();
			}

			kill() {
				this.clear();
			}
		};

		class CharacterPlayer extends HTMLElement {
			constructor() {
				super();
				this.connected = false;

				const shadow = this.attachShadow({ mode: 'closed' });
				this.shadow = shadow;

				const dummyNode = document.createElement('span');
				dummyNode.style.position = 'absolute';
				dummyNode.style.top = '0px';
				dummyNode.style.bottom = '0px';
				dummyNode.style.left = '0px';
				dummyNode.style.right = '0px';
				this.dummyNode = dummyNode;
				shadow.appendChild(dummyNode);

				const imagesContainer = document.createElement('div');
				imagesContainer.style.position = 'absolute';
				imagesContainer.style.top = '0px';
				imagesContainer.style.bottom = '0px';
				imagesContainer.style.left = '0px';
				imagesContainer.style.right = '0px';
				imagesContainer.style.transformOrigin = '0 0';
				this.imagesContainer = imagesContainer;
				shadow.appendChild(imagesContainer);

				const loadingNode = document.createElement('div');
				loadingNode.style.position = 'absolute';
				loadingNode.style.top = '0px';
				loadingNode.style.bottom = '0px';
				loadingNode.style.left = '0px';
				loadingNode.style.right = '0px';
				this.loadingNode = loadingNode;
				shadow.appendChild(loadingNode);

				const loadingImageNode = document.createElement('img');
				loadingImageNode.style.position = 'absolute';
				loadingImageNode.style.top = '0px';
				loadingImageNode.style.bottom = '0px';
				loadingImageNode.style.left = '0px';
				loadingImageNode.style.right = '0px';
				GeneralUtils.setNodeVisible(loadingImageNode, false);
				this.loadingImageNode = loadingImageNode;
				loadingNode.appendChild(loadingImageNode);

				this.updateImagesContainerScale = function () {
					if (this.currentAnimationPlayer) {
						const animationJson = this.currentAnimationPlayer.animationJson;
						const Utils = GeneralUtils.getAnimationUtils(animationJson);
						if (Utils) {
							const xScale = dummyNode.offsetWidth / Utils.frameWidth;
							const yScale = dummyNode.offsetHeight / Utils.frameHeight;
							imagesContainer.style.transform = `scaleX(${xScale}) scaleY(${yScale})`;
						}
					}
				}.bind(this);
				new ResizeObserver(function () {
					this.updateImagesContainerScale();
				}.bind(this)).observe(imagesContainer);

				this.ignoreRebuildLoading = 0;
				this.loading = false;
				this.ignoreRebuildPlaying = 0;
				this.playing = false;

				this.animationPlayers = [];
				this.loadCharacter().catch(() => { });
			}

			connectedCallback() {
				if (!this.connected) {
					this.connected = true;
					this.loadScripts();
				}
				this.loadCharacter().catch(() => { });
			}

			disconnectedCallback() {
				this.connected = false;
				if (this.currentAnimationPlayer) {
					this.currentAnimationPlayer.pause();
				}
				if (this.gcTimeoutId != null) {
					clearTimeout(this.gcTimeoutId);
					delete this.gcTimeoutId;
				}
				this.gcTimeoutId = setTimeout(function () {
					if (!this.connected) {
						if (this.currentAnimationPlayer) {
							this.currentAnimationPlayer.clear();
						}
					}
				}.bind(this), GeneralUtils.gcTimeout);
			}

			static get observedAttributes() {
				return ['resource_base_url', 'animation_id', 'animations_json'];
			}

			attributeChangedCallback(name, oldValue, newValue) {
				if (name == 'resource_base_url') {
					this.loadScripts();
				} else if (name == 'animation_id' || name == 'animations_json') {
					this.loadCharacter().catch(() => { });
				}
			}

			loadScripts() {
				const resourceBaseUrl = this.getAttribute('resource_base_url');
				if (!resourceBaseUrl) {
					return;
				}
				if (!this.loadingScripts) {
					this.loadingScripts = true;
					this.loadingScriptCount = GsapUtil.scriptUrls.length;
					const loadScript = function (scriptUrl) {
						if (scriptUrl.needLoad()) {
							const script = document.createElement('script');
							script.setAttribute('type', 'text/javascript');
							script.setAttribute('src', resourceBaseUrl + scriptUrl.url);
							script.onload = function () {
								this.loadingScriptCount--;
								this.loadCharacter().catch(() => { });
							}.bind(this);
							this.shadow.appendChild(script);
						} else {
							setTimeout(() => {
								this.loadingScriptCount--;
								this.loadCharacter().catch(() => { });
							}, 0);
						}
					}.bind(this);
					if (GeneralUtils.globalLoadingUrl != null) {
						this.loadingImageNode.setAttribute('src', resourceBaseUrl + GeneralUtils.globalLoadingUrl);
					}
					if (GeneralUtils.playerLoadingUrl != null) {
						this.playerLoadingSource = resourceBaseUrl + GeneralUtils.playerLoadingUrl;
					}
					GsapUtil.scriptUrls.map(scriptUrl => {
						loadScript(scriptUrl);
					});
				}
				this.loadCharacter().catch(() => { });
			}

			initiate(ignoreChecking) {
				if (!this.connected && !ignoreChecking) {
					return 'Not C';
				} else if (!this.loadingScripts) {
					return 'Not LS';
				} else if (this.loadingScriptCount > 0) {
					return 'During LS';
				}
				return true;
			}

			readyApi() {
				const api = {
					'generateThumbnail': function (options, callback) {
						api['generateSvg'](options, (generatedSvg) => {
							if (!generatedSvg) {
								callback(null);
								return;
							}
							callback(generatedSvg['thumbnail']);
						});
					}.bind(this),
					'generateSvg': function (options, callback) {
						const currentAnimationPlayer = this.currentAnimationPlayer;
						if (!currentAnimationPlayer) {
							callback(null);
							return;
						}
						let frameNumber;
						if (options && options.frameNumber != null) {
							frameNumber = options.frameNumber;
						} else {
							frameNumber = this.currentAnimationPlayer.getFrameNumber();
						}
						new Promise(function (resolve, reject) {
							const svgNode = GeneralUtils.getChildNodeById(currentAnimationPlayer.imagesContainer, `F${frameNumber}`);
							if (svgNode) {
								resolve(svgNode);
								return;
							}
							const animationJson = currentAnimationPlayer.animationJson;
							const loadFrameNumber = frameNumber;
							const loadFrameSetNumber = null;
							const loadSpriteImage = false;
							const loadSpriteJson = false;
							const loadPersist = false;
							currentAnimationPlayer.loadActionResource(animationJson, loadFrameNumber, loadFrameSetNumber, loadSpriteImage, loadSpriteJson, loadPersist).then((svgNode) => {
								svgNode.style.position = 'absolute';
								resolve(svgNode);
							}).catch(reject);
						}.bind(this)).then(function (svgNode) {
							if (!svgNode) {
								callback(null);
								return;
							}
							const animationJson = this.currentAnimationPlayer.animationJson;
							const Utils = GeneralUtils.getAnimationUtils(animationJson);
							const div = document.createElement('div');
							div.innerHTML = svgNode.outerHTML;
							let svgSize;
							let svg = div.firstElementChild;
							if (!svg || !svg.getBBox) {
								div.innerHTML = Utils.defaultSvgText;
								svg = div.firstElementChild;
							}
							GeneralUtils.setNodeVisible(svg, true);
							let fitViewBox;
							if (options && options.fitViewBox != null) {
								fitViewBox = options.fitViewBox;
							} else {
								fitViewBox = false;
							}
							if (fitViewBox) {
								try {
									document.body.appendChild(div);
									const svgBounds = svg.getBBox();
									svg.removeAttribute('x');
									svg.removeAttribute('y');
									svg.removeAttribute('width');
									svg.removeAttribute('height');
									svg.setAttribute('viewBox', `${svgBounds.x},${svgBounds.y},${svgBounds.width},${svgBounds.height}`);
									svgSize = {
										'width': svgBounds.width,
										'height': svgBounds.height,
									};
								} finally {
									document.body.removeChild(div);
								};
							} else {
								svgSize = {
									'width': Utils.frameWidth,
									'height': Utils.frameHeight,
								};
							}
							callback({
								'svg': svg,
								'svgSize': svgSize,
								'cacheKey': this.currentAnimationPlayer.cacheKey,
								'thumbnail': `data:image/svg+xml;base64,${GeneralUtils.convertStringToBase64(svg.outerHTML)}`
							});
						}.bind(this)).catch(() => {
							callback(null);
						});
					}.bind(this),
					'getAnimationId': function () {
						return getActualAnimationId(this.getAnimationId());
					}.bind(this),
					'isLoading': function () {
						const currentAnimationPlayer = this.currentAnimationPlayer;
						if (!currentAnimationPlayer) {
							return false;
						}
						return currentAnimationPlayer.isLoading();
					}.bind(this),
					'isPreloading': function () {
						const currentAnimationPlayer = this.currentAnimationPlayer;
						if (!currentAnimationPlayer) {
							return false;
						}
						let approachKey;
						if (this.getAttribute('preview') == 'true') {
							approachKey = GeneralUtils.frameSetApproach;
						} else if (GeneralUtils.getCharacterPlayerApproach() == GeneralUtils.spriteApproach) {
							approachKey = GeneralUtils.spriteApproach;
						} else { // GeneralUtils.frameSetApproach
							approachKey = GeneralUtils.frameSetApproach;
						}
						return currentAnimationPlayer.isPreloading(approachKey);
					}.bind(this),
					'isPlaying': function () {
						const currentAnimationPlayer = this.currentAnimationPlayer;
						if (!currentAnimationPlayer) {
							return false;
						}
						return currentAnimationPlayer.isPlaying();
					}.bind(this),
					'getDuration': function () {
						let duration = 0;
						this.animationPlayers.map(animationPlayer => {
							duration += animationPlayer.getDurationForTimeline();
						});
						return duration;
					}.bind(this),
					'getCurrentTime': function () {
						const currentAnimationPlayer = this.currentAnimationPlayer;
						if (!currentAnimationPlayer) {
							return 0;
						}
						const index = this.animationPlayers.indexOf(currentAnimationPlayer);
						if (index < 0) {
							return 0;
						}
						let currentTime = 0;
						let previewIndex = index - 1;
						while (previewIndex >= 0) {
							const animationPlayer = this.animationPlayers[previewIndex];
							const timelineDuration = animationPlayer.getDurationForTimeline();
							currentTime += timelineDuration;
							previewIndex--;
						}
						const timelineDuration = currentAnimationPlayer.getDurationForTimeline();
						currentTime += currentAnimationPlayer.progress * timelineDuration;
						return currentTime;
					}.bind(this),
					'preparePlay': function () {
						this.setPostLoading(null);
						return new Promise(function (resolve, reject) {
							const aniApi = window['aniApi'];
							if (aniApi && aniApi['isCapturing']()) {
								resolve();
								return;
							}
							const currentTime = api['getCurrentTime']();
							const animationPlayers = this.animationPlayers;
							const loadPromises = animationPlayers.map(animationPlayer => animationPlayer.loadCharacter(true));
							Promise.all(loadPromises).then(() => {
								api['seekForTimeline'](currentTime);
								resolve();
							}).catch(reject);
						}.bind(this));
					}.bind(this),
					'play': function () {
						this.setPostLoading(null);
						return new Promise(function (resolve, reject) {
							const currentAnimationPlayer = this.currentAnimationPlayer;
							if (!currentAnimationPlayer) {
								reject('No CAP');
								return;
							}
							currentAnimationPlayer.loadCharacter(true).then(() => {
								currentAnimationPlayer.playForTimeline();
								resolve();
							}).catch(reject);
						}.bind(this));
					}.bind(this),
					'playForTimeline': function () {
						this.setPostLoading(null);
						const currentAnimationPlayer = this.currentAnimationPlayer;
						if (!currentAnimationPlayer) {
							return;
						}
						currentAnimationPlayer.playForTimeline();
					}.bind(this),
					'seek': function (time) {
						if (api['isLoading']()) {
							this.setPostLoading(() => {
								api['seek'](time);
							});
						} else {
							this.setPostLoading(null);
						}
						return new Promise(function (resolve, reject) {
							let duration = 0;
							const currentAnimationPlayer = this.animationPlayers.find((animationPlayer, index, animationPlayers) => {
								const timelineDuration = animationPlayer.getDurationForTimeline();
								if (time < duration + timelineDuration) {
									return true;
								} else if (time == duration + timelineDuration && index == animationPlayers.length - 1) {
									return true;
								}
								duration += timelineDuration;
								return false;
							});
							if (currentAnimationPlayer == null) {
								reject('No CAP');
								return;
							}
							let currentSeekTime = time - duration;
							this.setAnimationId(currentAnimationPlayer.getAnimationId());
							currentAnimationPlayer.loadCharacter(true).then(() => {
								currentAnimationPlayer.seekForTimeline(currentSeekTime);
								resolve();
							}).catch(reject);
						}.bind(this));
					}.bind(this),
					'seekForTimeline': function (time) {
						const aniApi = window['aniApi'];
						if (aniApi && aniApi['isCapturing']()) {
							aniApi['increaseSeekCount']();
							const waitForLoading = function () {
								return new Promise(function (resolve, reject) {
									if (api['isLoading']()) {
										const loadingListener = function () {
											this.shadow.host.removeEventListener('loading', loadingListener);
											resolve();
										}.bind(this);
										this.shadow.host.addEventListener('loading', loadingListener);
									} else {
										resolve();
									}
								}.bind(this));
							}.bind(this);
							waitForLoading().then(function () {
								api['seek'](time).then(function () {
									waitForLoading().then(function () {
										aniApi['decreaseSeekCount']();
									}.bind(this));
								}.bind(this));
							}.bind(this));
							return;
						}
						if (api['isLoading']()) {
							this.setPostLoading(() => {
								api['seekForTimeline'](time);
							});
						} else {
							this.setPostLoading(null);
						}
						let duration = 0;
						const currentAnimationPlayer = this.animationPlayers.find((animationPlayer, index, animationPlayers) => {
							const timelineDuration = animationPlayer.getDurationForTimeline();
							if (time < duration + timelineDuration) {
								return true;
							} else if (time == duration + timelineDuration && index == animationPlayers.length - 1) {
								return true;
							}
							duration += timelineDuration;
							return false;
						});
						if (currentAnimationPlayer == null) {
							return;
						}
						const index = this.animationPlayers.indexOf(currentAnimationPlayer);
						let previewIndex = index - 1;
						while (previewIndex >= 0) {
							const animationPlayer = this.animationPlayers[previewIndex];
							const timelineDuration = animationPlayer.getDurationForTimeline();
							animationPlayer.seekForTimeline(timelineDuration);
							previewIndex--;
						}
						let nextIndex = index + 1;
						while (nextIndex < this.animationPlayers.length) {
							const animationPlayer = this.animationPlayers[nextIndex];
							animationPlayer.seekForTimeline(0);
							nextIndex++;
						}
						let currentSeekTime = time - duration;
						this.setAnimationId(currentAnimationPlayer.getAnimationId());
						currentAnimationPlayer.seekForTimeline(currentSeekTime);
					}.bind(this),
					'pause': function () {
						this.setPostLoading(null);
						return new Promise(function (resolve, reject) {
							const currentAnimationPlayer = this.currentAnimationPlayer;
							if (!currentAnimationPlayer) {
								reject('No CAP');
								return;
							}
							currentAnimationPlayer.loadCharacter(true).then(() => {
								currentAnimationPlayer.pauseForTimeline();
								resolve();
							}).catch(reject);
						}.bind(this));
					}.bind(this),
					'pauseForTimeline': function () {
						this.setPostLoading(null);
						const currentAnimationPlayer = this.currentAnimationPlayer;
						if (!currentAnimationPlayer) {
							return;
						}
						currentAnimationPlayer.pauseForTimeline();
					}.bind(this),
					'rebuild': function () {
						return new Promise(function (resolve, reject) {
							const currentTime = api['getCurrentTime']();
							api['dispose']().then(function () {
								this.loadCharacter().then(() => {
									api['seek'](currentTime).then(resolve).catch(reject);
								}).catch(reject);
							}.bind(this)).catch(reject);
						}.bind(this));
					}.bind(this),
					'dispose': function () {
						return new Promise((resolve, reject) => {
							api['pause']().then(function () {
								this.animationPlayers.map(animationPlayer => {
									animationPlayer.kill();
								});
								this.animationPlayers = [];
								delete this.currentAnimationPlayer;
								resolve(true);
							}.bind(this)).catch(reject);
						});
					}.bind(this),
				};
				this.shadow.host.api = api;
				this.dispatchEvent(new CustomEvent('apiReady', { 'detail': { 'api': api } }));
				return api;
			}

			setAnimationId(animationId) {
				const fireEvent = (this.animationId != animationId);
				try {
					this.animationId = animationId;
					let currentAnimationPlayer = this.currentAnimationPlayer;
					if (currentAnimationPlayer != null) {
						if (currentAnimationPlayer.getAnimationId() == animationId) {
							return;
						}
						currentAnimationPlayer.setActive(false);
						currentAnimationPlayer = null;
						this.currentAnimationPlayer = currentAnimationPlayer;
					}
					currentAnimationPlayer = this.animationPlayers.find(animationPlayer => animationId == animationPlayer.getAnimationId());
					this.currentAnimationPlayer = currentAnimationPlayer;
					this.updateImagesContainerScale();
					currentAnimationPlayer.setActive(true);
					this.animationPlayers.filter(animationPlayer => animationPlayer != currentAnimationPlayer).map(animationPlayer => {
						animationPlayer.preloadPlay();
					});
				} finally {
					if (fireEvent) {
						this.dispatchEvent(new CustomEvent('animationIdChanged', { 'detail': { 'id': animationId, 'logicalId': this.getAnimationLogicalId() } }));
						this.dispatchEvent(new CustomEvent('animationFrameNumberChanged', { 'detail': { 'frameNumber': this.currentAnimationPlayer ? this.currentAnimationPlayer.getFrameNumber() : 1 } }));
					}
					const aniApi = window['aniApi'];
					if (aniApi && aniApi['isCapturing']()) {
						this.animationPlayers.map((animationPlayer, index) => {
							if (animationId != animationPlayer.getAnimationId()) {
								if (!animationPlayer.isLoading() && animationPlayer.isLoaded()) {
									animationPlayer.setLoaded(false);
									animationPlayer.freeMemory();
								}
							}
						});
					}
				}
			}

			getAnimationId() {
				if (this.currentAnimationPlayer) {
					return this.currentAnimationPlayer.getAnimationId();
				}
				return this.animationId;
			}

			getAnimationLogicalId() {
				if (this.currentAnimationPlayer) {
					return this.currentAnimationPlayer.getAnimationLogicalId();
				}
				return this.animationId;
			}

			setPostLoading(postLoading) {
				if (postLoading != this.postLoading) {
					this.postLoading = postLoading;
					this.rebuildLoading();
				}
			}

			rebuildLoading() {
				if (this.ignoreRebuildLoading > 0) {
					return;
				}
				let approachKey;
				if (this.getAttribute('preview') == 'true') {
					approachKey = GeneralUtils.frameSetApproach;
				} else if (GeneralUtils.getCharacterPlayerApproach() == GeneralUtils.spriteApproach) {
					approachKey = GeneralUtils.spriteApproach;
				} else { // GeneralUtils.frameSetApproach
					approachKey = GeneralUtils.frameSetApproach;
				}
				const loading = this.animationPlayers.find(animationPlayer => animationPlayer.isShowLoading(approachKey)) != null;
				const postLoading = this.postLoading;
				const showLoading = loading || (postLoading != null);
				const aniApi = window['aniApi'];
				GeneralUtils.setNodeVisible(this.loadingImageNode, showLoading && !(aniApi && aniApi['isCapturing']()));
				if (loading != this.loading) {
					this.loading = loading;
					this.dispatchEvent(new CustomEvent('loading', { 'detail': { 'loading': loading } }));
					if (!loading && postLoading) {
						this.setPostLoading(null);
						postLoading();
					}
				}
			}

			rebuildPlaying() {
				if (this.ignoreRebuildPlaying > 0) {
					return;
				}
				const playing = this.animationPlayers.find(animationPlayer => animationPlayer.isPlaying()) != null;
				if (playing != this.playing) {
					this.playing = playing;
					this.dispatchEvent(new CustomEvent('playing', { 'detail': { 'playing': playing } }));
				}
			}

			loadCharacter() {
				return new Promise(function (resolve, reject) {
					const initiateResult = this.initiate(false);
					if (initiateResult != true) {
						reject(initiateResult);
						return;
					}
					const animationId = this.getAttribute('animation_id');
					let animationsJson = this.getAttribute('animations_json');
					if (!animationsJson) {
						reject(false);
						return;
					}
					animationsJson = JSON.parse(animationsJson);
					if (!animationsJson) {
						reject(false);
						return;
					}
					let animationJson = animationsJson.find((animationJson) => {
						const Utils = GeneralUtils.getAnimationUtils(animationJson);
						return Utils && Utils.getAnimationId(animationJson) == animationId;
					});
					if (!animationJson) {
						animationJson = animationsJson[0];
					}
					if (!animationJson) {
						reject(false);
						return;
					}
					const Utils = GeneralUtils.getAnimationUtils(animationJson);
					if (!Utils) {
						reject(false);
						return;
					}
					animationsJson = Utils.patchAnimationsJson(animationsJson);
					animationsJson.map(function (animationJson) {
						const animationId = Utils.getAnimationId(animationJson);
						let animationPlayer = this.animationPlayers.find(animationPlayer => animationId == animationPlayer.getAnimationId());
						if (animationPlayer == null) {
							animationPlayer = new AnimationPlayer(this, animationJson);
							this.animationPlayers.push(animationPlayer);
						} else {
							animationPlayer.setAnimationJson(animationJson);
						}
					}.bind(this));
					const animationIds = animationsJson.map(animationJson => Utils.getAnimationId(animationJson));
					this.animationPlayers.sort((animationPlayerA, animationPlayerB) => {
						const indexA = animationIds.indexOf(animationPlayerA.getAnimationId());
						const indexB = animationIds.indexOf(animationPlayerB.getAnimationId());
						if (indexA < indexB) {
							return -1;
						} else if (indexA > indexB) {
							return 1;
						} else {
							return 0;
						}
					});
					this.animationPlayers.filter(animationPlayer => (animationIds.indexOf(animationPlayer.getAnimationId()) < 0)).map(animationPlayer => {
						animationPlayer.kill();
					});
					this.animationPlayers = this.animationPlayers.filter(animationPlayer => (animationIds.indexOf(animationPlayer.getAnimationId()) >= 0));
					this.rebuildLoading();
					this.rebuildPlaying();
					let loadCharacterPromise;
					if (this.animationPlayers.length > 0) {
						this.setAnimationId(this.animationPlayers[0].getAnimationId());
						loadCharacterPromise = this.currentAnimationPlayer.loadCharacter();
						loadCharacterPromise.catch((error) => error && console.log(error));
					} else {
						this.setAnimationId(null);
						loadCharacterPromise = Promise.resolve(true);
					}
					const api = this.readyApi();
					const performKeepPlaying = function () {
						if (this.getAttribute('keep_playing') != 'true' || this.initiate(false) != true) {
							removeKeepPlayingListener();
							return;
						}
						if (api['isLoading']() || api['isPlaying']() || this.loadingCharacterCount != 0) {
							return;
						}
						if (this.keepPlayingPreparingPlay) {
							return;
						}
						this.keepPlayingPreparingPlay = true;
						api['preparePlay']().then(function () {
							this.keepPlayingPreparingPlay = false;
							if (this.getAttribute('keep_playing') != 'true') {
								removeKeepPlayingListener();
								return;
							}
							if (api['isLoading']() || api['isPlaying']() || this.loadingCharacterCount != 0) {
								return;
							}
							api['seekForTimeline'](0);
							api['playForTimeline']();
						}.bind(this)).catch(function (error) {
							this.keepPlayingPreparingPlay = false;
							error && console.log(error);
							if (error == 'Wrong C') {
								this.loadCharacter();
							}
						}.bind(this));
					}.bind(this);
					const addKeepPlayingListener = function () {
						this.keepPlayingListener = function () {
							performKeepPlaying();
						}.bind(this);
						this.shadow.host.addEventListener('loading', this.keepPlayingListener);
						this.shadow.host.addEventListener('playing', this.keepPlayingListener);
					}.bind(this);
					const removeKeepPlayingListener = function () {
						if (this.keepPlayingListener) {
							this.shadow.host.removeEventListener('loading', this.keepPlayingListener);
							this.shadow.host.removeEventListener('playing', this.keepPlayingListener);
							delete this.keepPlayingListener;
						}
					}.bind(this);
					const increaseLoadingCharacterCount = function () {
						if (this.loadingCharacterCount != null) {
							this.loadingCharacterCount++;
						} else {
							this.loadingCharacterCount = 1;
						}
					}.bind(this);
					const decreaseLoadingCharacterCount = function () {
						this.loadingCharacterCount--;
						if (this.loadingCharacterCount == 0) {
							if (this.getAttribute('keep_playing') == 'true') {
								performKeepPlaying();
							} else {
								removeKeepPlayingListener();
								const aniApi = window['aniApi'];
								if (aniApi && aniApi['isCapturing']()) {
									// assume no need restore animationTimelineStatus during capturing
								} else {
									const animationTimelineStatus = this['animationTimelineStatus'];
									if (animationTimelineStatus != null) {
										const api = this.shadow.host.api;
										if (api != null) {
											const play = animationTimelineStatus['play'];
											(play != null && play != api['isPlaying']()) && (play ? api['play']() : api['pause']());
											const seek = animationTimelineStatus['seek'];
											if (seek != null && seek != api['getCurrentTime']()) {
												let timeToSeek = (() => {
													let result = seek;
													const duration = api['getDuration']();
													if (seek > duration) {
														result = duration;
													}
													return result;
												})();
												api['seek'](timeToSeek);
											}
										}
									}
								}
							}
						}
					}.bind(this);
					removeKeepPlayingListener();
					if (this.getAttribute('keep_playing') == 'true') {
						addKeepPlayingListener();
					}
					increaseLoadingCharacterCount();
					loadCharacterPromise.finally(() => {
						decreaseLoadingCharacterCount();
					});
					loadCharacterPromise.then(resolve).catch(reject);
				}.bind(this));
			}
		}
		window.customElements.define('character-player', CharacterPlayer);
	}
})();