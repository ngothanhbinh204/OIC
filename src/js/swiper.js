import Swiper from "swiper";
import {
	Autoplay,
	Grid,
	Mousewheel,
	Navigation,
	Pagination,
	Thumbs,
	EffectFade,
	Scrollbar,
	EffectCreative,
} from "swiper/modules";

/**
 * @param swiperInit
 */
export function swiperInit() {
	$(".swiper-column-auto").each(function (index) {
		const $this = $(this);
		// Configuration flagsvideoSetting
		const config = {
			loop: $this.hasClass("swiper-loop"),
			touchMove: $this.hasClass("allow-touchMove") || true,
			mouseWheel: $this.hasClass("allow-mouseWheel") ? { forceToAxis: true } : false,
			autoHeight: $this.hasClass("auto-height"),
			hasVideo: $this.hasClass("auto-detect-video"),
			paginationDot: $this.hasClass("pagination-dot"),
			progressbar: $this.hasClass("progressbar"),
			center: $this.hasClass("center"),
			time: $this.attr("data-time") || 3500,
			speed: $this.attr("data-speed") || 500,
			autoplay: $this.hasClass("autoplay"),
			infinite: $this.hasClass("swiper-infinite"),
			scrollbar: $this.hasClass("swiper-scrollbar"),
		};
		const configInfinite = {
			loop: true,
			time: 3500,
			grabCursor: true,
			freeMode: true,
			speed: 2000,
			slidesPerView: 4,
			breakpoints: {
				768: {
					slidesPerView: 4,
				},
				1024: {
					slidesPerView: 8,
				},
			},
			autoplay: {
				delay: 0.5,
				disableOnInteraction: false,
			},
		};

		// Add unique identifier class
		$this.addClass(`swiper-column-auto-id-${index}`);

		// Create swiper with optimized options
		new Swiper(`.swiper-column-auto-id-${index} .swiper`, {
			modules: [Navigation, Pagination, Mousewheel, Autoplay],
			speed: config.speed,
			observer: true,
			observeParents: true,
			spaceBetween: 0,
			loop: config.loop,
			...(config.autoplay && {
				autoplay: {
					delay: config.time,
				},
			}),
			...(config.scrollbar && {
				scrollbar: {
					el: `.swiper-column-auto-id-${index} .swiper-scrollbar-slide`,
					// hide: false,
					draggable: true,
				},
			}),
			...(config.center && {
				centeredSlides: true,
			}),
			slidesPerView: "auto",
			pagination: {
				el: `.swiper-column-auto-id-${index} .swiper-pagination`,
				clickable: true,
				type: "fraction",
				...(config.paginationDot && {
					type: "bullets",
				}),
				...(config.progressbar && {
					type: "progressbar",
				}),
			},
			...(config.infinite && {
				...configInfinite,
			}),
			mousewheel: config.mouseWheel,
			allowTouchMove: config.touchMove,
			navigation: {
				prevEl: `.swiper-column-auto-id-${index} .btn-prev`,
				nextEl: `.swiper-column-auto-id-${index} .btn-next`,
			},
			watchSlidesProgress: true,
			autoHeight: config.autoHeight,
			on: {
				init: function () { },
				slideChange: function () { },
			},
		});
	});
	swiperBanner();
	swiperHome3();
	// swipePartner();
	swiperHistory();
	swiperProjectThumb();

	const swiperCertification = new Swiper(`.section-certification .swiper`, {
		modules: [Autoplay, Navigation],
		spaceBetween: 0,
		slidesPerView: "auto",
		speed: 500,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		centeredSlides: true,
		navigation: {
			prevEl: `.section-certification .btn-prev`,
			nextEl: `.section-certification .btn-next`,
		},
		loop: true,
		on: {
			init: function () {
				handlePD15VisibleSlide(this);
				setContentPosition(this);
			},
			slideChange: function () {
				handlePD15VisibleSlide(this);
				setContentPosition(this);
			},
		},
	});
	setContentWidth(swiperCertification);
	function setContentPosition(swiper) {
		const activeSlide = swiper.slides[swiper.activeIndex];
		const content = activeSlide.querySelector(".content");
		const bigWrapper = $(swiper.el).closest(".big-wrapper");
		bigWrapper.find(">.content").remove();
		if (!content) return;
		if ($(window).width() > 1024) {
			bigWrapper.append($(content).clone());
		}
	}
	function setContentWidth(swiper) {
		if (!swiper.activeIndex) {
			requestAnimationFrame(() => setContentWidth(swiper));
			return;
		}
		const index = swiper.activeIndex || 0;
		const activeSlide = swiper.slides[index];
		const image = activeSlide.querySelector(".img");
		if (!image) return;
		const { transform } = window.getComputedStyle(image);
		const dataScale = transform.split("(")[1].split(")")[0].split(",")[0];
		const isNumber = !isNaN(dataScale);
		if (!isNumber) return;
		image.addEventListener("transitionend", (event) => {
			const scaleWidth = Math.round(image.offsetWidth * dataScale);
			const bigWrapper = $(swiper.el).closest(".big-wrapper");
			bigWrapper.find(">.content").css("width", `${scaleWidth}px`);
		});
		requestAnimationFrame(() => setContentWidth(swiper));
	}
}
function swiperBanner() {
	const swiperEl = document.querySelector(".home-1 .swiper");
	if (!swiperEl) return;

	const $timeline = $(".home-1 .timeline-swiper");
	if (!$timeline.length) return;

	function stopTimeline(swiper) {
		if (swiper.timelineAnimationFrame) {
			cancelAnimationFrame(swiper.timelineAnimationFrame);
			swiper.timelineAnimationFrame = null;
		}
	}

	function setTimelineProgress(percent) {
		const p = Math.max(0, Math.min(100, percent));
		$timeline.css({ "--progress": p + "%" });
	}

	const swiper = new Swiper(swiperEl, {
		modules: [Pagination, Navigation, EffectFade, Autoplay],
		loop: true,
		effect: "fade",
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },
		slidesPerView: 1,
		speed: 700,
		pagination: { el: ".home-1 .swiper-pagination", clickable: true },
		navigation: { nextEl: ".home-1 .btn-next", prevEl: ".home-1 .btn-prev" },
	});

	function tickVideoTimeline() {
		const slide = swiper.slides[swiper.activeIndex];
		const video = slide && slide.querySelector("video");
		if (!video || swiper.destroyed) {
			stopTimeline(swiper);
			return;
		}
		if (video.duration && isFinite(video.duration)) {
			setTimelineProgress((video.currentTime / video.duration) * 100);
		}
		if (video.ended) {
			stopTimeline(swiper);
			return;
		}
		swiper.timelineAnimationFrame = requestAnimationFrame(tickVideoTimeline);
	}

	swiper.on("autoplayTimeLeft", (_swiper, timeLeft) => {
		const delay = _swiper.params.autoplay.delay;
		if (!delay || !_swiper.autoplay.running) return;
		const slide = _swiper.slides[_swiper.activeIndex];
		if (slide && slide.querySelector("video")) return;
		setTimelineProgress(((delay - timeLeft) / delay) * 100);
	});

	function handleVideo(slide) {
		if (!slide) return false;
		const video = slide.querySelector("video");
		if (!video) return false;

		swiper.autoplay.stop();

		if (video.readyState < 2) {
			video.addEventListener("loadedmetadata", () => video.play());
		} else {
			video.play();
		}

		video.onended = () => swiper.slideNext();
		return true;
	}

	function syncSlideMedia() {
		stopTimeline(swiper);
		swiper.slides.forEach((slide, index) => {
			const v = slide.querySelector("video");
			if (v && index !== swiper.activeIndex) {
				v.pause();
				v.currentTime = 0;
				v.onended = null;
			}
		});

		setTimelineProgress(0);

		const currentSlide = swiper.slides[swiper.activeIndex];
		const isVideo = handleVideo(currentSlide);
		if (!isVideo) {
			swiper.autoplay.start();
		} else {
			tickVideoTimeline();
		}
	}

	swiper.on("slideChangeTransitionEnd", syncSlideMedia);

	if (swiper.slides[swiper.activeIndex]) {
		syncSlideMedia();
	}
}

function swiperProjectThumb() {
	const bannerEl = document.querySelector(".project-detail-1 .swiper-main");
	const thumbsEl = document.querySelector(".project-detail-1 .swiper-thumbs");

	if (!bannerEl || !thumbsEl) return;

	/* ===================== THUMBS ===================== */
	const swiperThumbs = new Swiper(thumbsEl, {
		slidesPerView: 5,
		spaceBetween: 24,
		freeMode: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
		breakpoints: {
			0: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
			640: {
				slidesPerView: 4,
				spaceBetween: 18,
			},
			1024: {
				slidesPerView: 6,
				spaceBetween: 24,
			},
		},
	});

	/* ===================== MAIN ===================== */
	const swiperMain = new Swiper(bannerEl, {
		modules: [Pagination, Thumbs, Autoplay, Navigation],
		loop: true,
		slidesPerView: 1,
		speed: 700,
		navigation: {
			nextEl: ".wrap-button-slide .btn-next",
			prevEl: ".wrap-button-slide .btn-prev",
		},
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},

		thumbs: {
			swiper: swiperThumbs,
		},

		pagination: {
			el: ".project-detail-1 .swiper-pagination",
			clickable: true,
		},
	});

	/* ===================== SYNC LOOP THUMBS ===================== */
	swiperMain.on("slideChange", () => {
		const realIndex = swiperMain.realIndex;
		swiperThumbs.slideTo(realIndex);
	});
}

function swiperHome3() {
	const home3Swipers = document.querySelectorAll(".home-3 .slider-introduce");

	home3Swipers.forEach((swiperEl) => {
		if (swiperEl.swiper) return;

		const wrapperEl = swiperEl.closest(".wrapper");
		const isEvenWrapper = wrapperEl && wrapperEl.matches(":nth-child(even)");
		const directionFactor = isEvenWrapper ? -1 : 1;
		const nextEl = wrapperEl?.querySelector(".arrow-btn .btn-next");
		const prevEl = wrapperEl?.querySelector(".arrow-btn .btn-prev");

		const home3Swiper = new Swiper(swiperEl, {
			loop: false,
			rewind: true,
			slidesPerView: 1,
			speed: 500,
			spaceBetween: 0,
			// autoplay: {
			// 	delay: 500,
			// },
			freeMode: false,
			effect: "creative",
			watchSlidesProgress: true,
			navigation: {
				nextEl,
				prevEl,
			},
			breakpoints: {
				0: {
					creativeEffect: {
						limitProgress: 2,
						prev: {
							translate: [0, 0, -10],
							rotate: [0, 0, 0],
							opacity: 0.1,
						},
						next: {
							translate: [0, 0, -62],
							rotate: [0, 0, 0],
							opacity: 1,
						},
					},
				},
				768: {
					creativeEffect: {
						limitProgress: 2,
						prev: {
							translate: [0, 0, -10],
							rotate: [0, 0, 0],
							opacity: 0.1,
						},
						next: {
							translate: [0, "-40px", -62],
							rotate: [0, 0, 0],
							opacity: 1,
						},
					},
				},
				1200: {
					creativeEffect: {
						limitProgress: 2,
						prev: {
							translate: [20 * directionFactor, 20, -10],
							rotate: [0, 0, 0],
							opacity: 0.1,
						},
						next: {
							translate: [-20 * directionFactor, 20, -10],
							rotate: [0, 0, 0],
							opacity: 1,
						},
					},
				},

			},
			modules: [Pagination, EffectCreative, Autoplay, Navigation],
			on: {
				init(swiperInstance) {
					// Re-init navigation explicitly for multi-slider blocks.
					if (swiperInstance.navigation) {
						swiperInstance.navigation.init();
						swiperInstance.navigation.update();
					}
				},
			},
		});
	});
}
// function swipePartner() {
// 	const swiperPartner = new Swiper(".home-5 .swiper", {
// 		modules: [Autoplay],
// 		loop: true,
// 		slidesPerView: 3,
// 		spaceBetween: 12,
// 		breakpoints: {
// 			768: {
// 				slidesPerView: 4,
// 				spaceBetween: 12,
// 			},
// 			1024: {
// 				slidesPerView: 6,
// 				spaceBetween: 20,
// 			},
// 			1920: {
// 				slidesPerView: 9,
// 				spaceBetween: 24,
// 			},
// 		},
// 		speed: 2000,
// 		autoplay: {
// 			delay: 0.5,
// 			disableOnInteraction: false,
// 			reverseDirection: false, // ← chạy từ phải sang trái
// 		},
// 		freeMode: true,
// 	});
// }

function swiperHistory() {
	const AUTO_PLAY_DELAY = 5000;

	function initInnerCreativeSwipers(swiperContainer) {
		if (!swiperContainer) return;

		const innerSwipers = swiperContainer.querySelectorAll(".slider-introduce");
		innerSwipers.forEach((innerSwiperEl) => {
			if (innerSwiperEl.swiper) return;

			const colRight = innerSwiperEl.closest(".col-right");
			const nextEl = colRight?.querySelector(".arrow-btn .btn-next");
			const prevEl = colRight?.querySelector(".arrow-btn .btn-prev");

			new Swiper(innerSwiperEl, {
				modules: [Navigation, EffectCreative],
				slidesPerView: 1,
				speed: 650,
				spaceBetween: 0,
				loop: true,
				effect: "creative",
				watchSlidesProgress: true,
				loopAdditionalSlides: 3,
				freeMode: false,
				breakpoints: {
					0: {
						creativeEffect: {
							limitProgress: 2,
							prev: {
								translate: [0, 18, -20],
								rotate: [0, 0, 0],
								opacity: 0.15,
							},
							next: {
								translate: [0, 18, -20], // mobile chong doc
								rotate: [0, 0, 0],
								opacity: 1,
							},
						},
					},
					1024: {
						creativeEffect: {
							limitProgress: 2,
							prev: {
								translate: [20, 20, -20], // ← sang trái
								rotate: [0, 0, 0],
								opacity: 0.1,
							},
							next: {
								translate: [20, 20, -20], // → sang phải
								rotate: [0, 0, 0],
								opacity: 1,
							},
						},
					},
				},

				navigation: {
					nextEl,
					prevEl,
				},
			});
		});
	}


	// Swiper cho thumbnail
	const thumbSwiper = new Swiper(".section-history .thumb .swiper", {
		modules: [Mousewheel],
		speed: 1000,
		allowTouchMove: false, // Cho phép di chuyển bằng cảm ứng
		observer: true,
		observeParents: true,
		initialSlide: 2,
		slidesPerView: 2,
		spaceBetween: 12,
		slideToClickedSlide: true,
		rewind: true,

		breakpoints: {
			1024: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 32,
			}
		},

		on: {
			init: function (swiper) {
				handleVisibleSlide(swiper);
				// updateSlideNumbers(swiper);
			},
			slideChange: function (swiper) {
				handleVisibleSlide(swiper);
			},
		},
	});

	// Swiper chính cho phần chi tiết
	const mainSwiper = new Swiper(".section-history .main .swiper-main", {
		modules: [Thumbs, Autoplay],
		slidesPerView: 1,
		rewind: true,
		speed: 1000,
		observer: true,
		observeParents: true,
		autoHeight: true,
		thumbs: {
			swiper: thumbSwiper,
		},
		loop: true, // Quay lại slide đầu khi đến slide cuối
		on: {
			init: function (swiper) {
				handleVisibleSlide(swiper); // Gọi hàm khi Swiper chính được khởi tạo
				initInnerCreativeSwipers(swiper.el);
				// Đảm bảo thumbSwiper cũng update đúng
				if (thumbSwiper) {
					thumbSwiper.slideTo(1, 0);
				}
			},
			slideChange: function (swiper) {
				handleVisibleSlide(swiper); // Gọi hàm khi slide chính thay đổi
				initInnerCreativeSwipers(swiper.el);
			},
		},
	});

	// Handle autoplay (if needed)
	handleAutoplay(AUTO_PLAY_DELAY, mainSwiper);

	// Handle the visible slide effect
	function handleVisibleSlide(swiper) {
		const activeIndex = swiper.activeIndex;
		const allSlides = swiper.slides;

		// Clear existing "show-slide" classes
		allSlides.forEach((slide) => {
			slide.classList.remove("show-slide");
		});

		// Get the surrounding slides
		const slideBeforePrev = swiper.slides[activeIndex - 1];
		const slideBeforePrev2 = swiper.slides[activeIndex - 2];
		const slideBeforePrev3 = swiper.slides[activeIndex - 3];
		const slideAfterNext = swiper.slides[activeIndex + 1];
		const slideAfterNext2 = swiper.slides[activeIndex + 2];
		const slideAfterNext3 = swiper.slides[activeIndex + 3];
		const activeSlide = swiper.slides[activeIndex];

		// Add the "show-slide" class to surrounding and active slides
		if (slideBeforePrev) slideBeforePrev.classList.add("show-slide");
		if (slideBeforePrev2) slideBeforePrev2.classList.add("show-slide");
		if (slideBeforePrev3) slideBeforePrev3.classList.add("show-slide");
		if (slideAfterNext) slideAfterNext.classList.add("show-slide");
		if (slideAfterNext2) slideAfterNext2.classList.add("show-slide");
		if (slideAfterNext3) slideAfterNext3.classList.add("show-slide");
		if (activeSlide) activeSlide.classList.add("show-slide");
	}
}

function handleAutoplay(timeout, swiper, preventMouseEnter = false, thumbSwiper = null) {
	if (!swiper || !swiper.el || !$(swiper.el).length) return;

	let stopSlideImmediate = $(swiper.el[0]).parent().hasClass("auto-detect-video");
	if (stopSlideImmediate) return;

	// Configure autoplay
	swiper.params.autoplay = {
		delay: timeout,
		disableOnInteraction: !preventMouseEnter,
		pauseOnMouseEnter: !preventMouseEnter,
	};

	swiper.autoplay.start();

	const navigationEl = swiper.params.navigation;
	if (navigationEl) {
		let isReachEnd = false;
		let isReachStart = false;

		swiper.on("beforeSlideChangeStart", function () {
			isReachEnd = swiper.isEnd;
			isReachStart = swiper.isBeginning;
		});

		$(navigationEl.prevEl).on("click", function () {
			if (isReachStart) return;

			swiper.autoplay.stop();
			swiper.autoplay.start();
			$(swiper.el).attr("data-auto-play", "stop");
		});

		$(navigationEl.nextEl).on("click", function () {
			if (isReachEnd) return;

			swiper.autoplay.stop();
			swiper.autoplay.start();
			$(swiper.el).attr("data-auto-play", "stop");
		});
	}

	if (thumbSwiper) {
		thumbSwiper.el.addEventListener("mouseenter", () => {
			swiper.autoplay.stop();
			$(swiper.el).attr("data-auto-play", "stop");
		});

		thumbSwiper.el.addEventListener("mouseleave", () => {
			swiper.autoplay.start();
		});
	}
}

