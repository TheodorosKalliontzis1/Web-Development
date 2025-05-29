(() => {
	const getWorkingWindow = () => {
		const workingWindow = window['workingWindow'];
		if (workingWindow != null) {
			return workingWindow;
		}
		return window;
	};
	const workingWindow = getWorkingWindow();
	const vpCommonApi = workingWindow['vpCommonApi'];
	const injectJs = vpCommonApi['injectJs'];
	const waitForJs = vpCommonApi['waitForJs'];

	window['ensureLoadedFlipbookJs'] = (waitOptions) => {
		return new Promise((resolve) => {
			Promise.allSettled([
				waitForJs('character-player', waitOptions),
				waitForJs('gsap.min', waitOptions),
				waitForJs('CustomEase.min', waitOptions),
				waitForJs('Draggable.min', waitOptions),
				waitForJs('MotionPathPlugin.min', waitOptions),
				waitForJs('extra', waitOptions),
				waitForJs('SplitText.min', waitOptions),
				waitForJs('splitting.min', waitOptions),
				waitForJs('ScrollToPlugin.min', waitOptions),
				waitForJs('TextPlugin.min', waitOptions),
				waitForJs('EasePack.min', waitOptions),
				waitForJs('papaparse.min', waitOptions),
				waitForJs('jsondiffpatch', waitOptions),
				waitForJs('babylon', waitOptions),
				waitForJs('exportVideo', waitOptions),
				waitForJs('export3DVideo', waitOptions),
				waitForJs('exportImage', waitOptions),
				waitForJs('flipbookApi', waitOptions),
			]).finally(() => {
				gsap.registerPlugin(
					CustomEase,
					Draggable,
					MotionPathPlugin,
					SplitText,
					ScrollToPlugin,
					TextPlugin,
					EasePack,
				);
				Promise.allSettled([
					waitForJs('babylonjs.loaders.min', waitOptions),
					waitForJs('babylon.gui.min', waitOptions),
				]).finally(() => {
					waitForJs('webdiagram-babylonjs-bridge', waitOptions).finally(() => {
						waitForJs('character-3d.js', waitOptions).finally(() => {
							resolve(true);
						});
					});
				});
			});
		});
	};

	window['injectFlipbookJs'] = (injectOptions) => {
		injectJs('character-player', 'https://cdn-latest.visual-paradigm.com/diagrams/js/character-player/character-player.js', {
			'defer': '',
			'crossorigin': 'anonymous'
		}, injectOptions);

		injectJs('gsap.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/gsap.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('CustomEase.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/CustomEase.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('Draggable.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/Draggable.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('MotionPathPlugin.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/MotionPathPlugin.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('extra', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/extra.js', {
			'defer': ''
		}, injectOptions);
		injectJs('SplitText.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/SplitText.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('splitting.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/splitting.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('ScrollToPlugin.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/ScrollToPlugin.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('TextPlugin.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/TextPlugin.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('EasePack.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/gsap/EasePack.min.js', {
			'defer': ''
		}, injectOptions);

		injectJs('papaparse.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/papaparse/papaparse.min.js', {
			'defer': ''
		}, injectOptions);
		injectJs('jsondiffpatch', 'https://cdn-latest.visual-paradigm.com/diagrams/js/jsondiffpatch/jsondiffpatch.js', {
			'defer': ''
		}, injectOptions);

		injectJs('babylon', 'https://cdn-latest.visual-paradigm.com/diagrams/js/babylonjs/babylon.js', {
			'defer': ''
		}, injectOptions).finally(() => {
			Promise.allSettled([
				injectJs('babylonjs.loaders.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/babylonjs/babylonjs.loaders.min.js', {
					'defer': ''
				}, injectOptions),
				injectJs('babylon.gui.min', 'https://cdn-latest.visual-paradigm.com/diagrams/js/babylonjs/babylon.gui.min.js', {
					'defer': ''
				}, injectOptions),
				injectJs('babylonjs-bone-mapper', 'https://cdn-latest.visual-paradigm.com/diagrams/js/babylonjs/babylonjs-bone-mapper.js', {
					'defer': ''
				}, injectOptions)
			]).finally(() => {
				injectJs('webdiagram-babylonjs-bridge', 'https://cdn-latest.visual-paradigm.com/diagrams/js/webdiagram-babylonjs-bridge.js', {
					'defer': ''
				}, injectOptions).finally(() => {
					injectJs('character-3d.js', 'https://cdn-latest.visual-paradigm.com/diagrams/js/character-3d/character-3d.js', {
						'defer': ''
					}, injectOptions);
				});
			});
		});

		injectJs('exportVideo', 'https://cdn-latest.visual-paradigm.com/diagrams/exportVideo.js', {
			'defer': ''
		}, injectOptions);
		injectJs('export3DVideo', 'https://cdn-latest.visual-paradigm.com/diagrams/export3DVideo.js', {
			'defer': ''
		}, injectOptions);
		injectJs('exportImage', 'https://cdn-latest.visual-paradigm.com/diagrams/exportImage.js', {
			'defer': ''
		}, injectOptions);
		injectJs('flipbookApi', 'https://cdn-latest.visual-paradigm.com/diagrams/js/flipbook/flipbookApi.js', {
			'defer': ''
		}, injectOptions);
	};

	window['injectFlipbookJs']();
})();