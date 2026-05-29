import { animate, createSpring, onScroll, stagger, utils } from "animejs";
import { getRem } from "./utils";
import { SplitText } from "gsap/SplitText";

const homeSection = utils.$("section[class*='home-']");

export const homePage = {
	titleFadeLeft: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0.6) {
						const bottomTitle = entry.target;
						const splitText = SplitText.create(bottomTitle, {
							type: "chars,words",
						});
						splitText.chars.forEach((char) => {
							char.classList.add("char");
						});
						splitText.words.forEach((word) => {
							word.classList.add("word");
						});
						animate(splitText.chars, {
							scale: [0.8, 1],
							ease: createSpring({
								stiffness: 100,
							}),
							delay: stagger(50, {
								from: "last",
							}),
						});
						animate(splitText.words, {
							x: ["100%", 0],
							// rotate: [-30, 0],
							// y: ["50%", 0],
							opacity: [0, 1],
							ease: createSpring({
								stiffness: 80,
							}),
							delay: stagger(100, {
								from: "last",
							}),
						});
						bottomTitle.style.opacity = 1;
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.6 }
		);

		utils.$(".title-fade-left").forEach((tabParent) => {
			const bottomTitle = tabParent.querySelector(".bottom-title");
			if (!bottomTitle) return;
			bottomTitle.style.opacity = 0;
			observer.observe(bottomTitle);
		});
	},

	// zoom item animation
	home_animation_zoom: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					const items = utils.$(entry.target.querySelectorAll(".item"));
					items.forEach((item) => {
						// Set trạng thái ban đầu: thu nhỏ và dịch xuống dưới
						utils.set(item, {
							scale: 0, // Thu nhỏ hoàn toàn (invisible)
							translateY: getRem(40), // Di chuyển xuống 40rem
							ease: "easeInOutSine", // Hiệu ứng chuyển động mượt
							duration: 300, // Thời gian setup: 300ms
						});
					});

					// Khi section xuất hiện 50% trong viewport -> chạy animation
					if (entry.intersectionRatio > 0.5) {
						// ANIMATE ITEMS: phóng to và di chuyển lên
						animate(items, {
							scale: 1, // Phóng to về kích thước bình thường
							translateY: 0, // Trở về vị trí ban đầu
							delay: stagger(120), // Mỗi item delay 50ms (hiệu ứng lần lượt)
						});
						// Ngừng theo dõi element sau khi animate (chỉ chạy 1 lần)
						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.5, // Kích hoạt khi 50% element xuất hiện trong viewport
			}
		);

		// Áp dụng observer cho tất cả sections có class .home-2
		utils.$(".home-animation-zoom").forEach((section) => {
			observer.observe(section);
		});
	},

	home_items_animation_fade: () => {
		const DURATION = 1000;
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0.5) {
						animate(entry.target.querySelectorAll(".item"), {
							opacity: 1,
							x: [getRem(40), 0],
							duration: DURATION,
							ease: "outQuart",
							delay: stagger(200),
						});
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);

		utils.$(".home-item-animation-fade").forEach((el) => {
			utils.set(el.querySelectorAll(".item"), {
				opacity: 0,
			});
			observer.observe(el);
		});
	},

	// zoom item animation fade and zoom
	home_items_animation_fadez: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					const items = utils.$(entry.target.querySelectorAll(".item"));
					items.forEach((item) => {
						// Hiệu ứng chuyên nghiệp: fade in mượt + slide nhẹ
						utils.set(item, {
							opacity: 0,
							scale: 0.92,
							translateY: getRem(30),
						});
					});

					if (entry.intersectionRatio > 0.6) {
						// Animation elegant và professional
						animate(items, {
							opacity: 1,
							scale: 1,
							translateY: 0,
							duration: 800,
							ease: "outQuart", // Mượt mà, không bounce
							delay: stagger(120), // Từ từ, sang trọng
						});

						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.6,
			}
		);

		utils.$(".home-4").forEach((section) => {
			observer.observe(section);
		});
	},

	home_1: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					// console.log(entry);
					const items = entry.target.querySelectorAll(".item");
					items.forEach((item) => {
						utils.set(item, {
							opacity: 0,
							y: getRem(40),
							duration: 800,
							ease: eases.outQuad,
						});
					});
					const description =
						entry.target.querySelector(".description");
					utils.set(description, {
						opacity: 0,
						x: "50%",
						duration: 800,
						ease: "outCirc",
					});
					const button = entry.target.querySelector(".button");
					utils.set(button, {
						opacity: 0,
						y: "50%",
						duration: 800,
						ease: "outCirc",
					});
					if (entry.intersectionRatio > 0.5) {
						animate(items, {
							y: 0,
							opacity: 1,
							delay: stagger(200),
						});

						animate(description, {
							opacity: 1,
							x: 0,
							delay: 100,
						});
						animate(button, {
							opacity: 1,
							y: 0,
							delay: 100,
						});

						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		utils.$(".home-1").forEach((section) => {
			observer.observe(section);
		});
	},



	home_3: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const colLeft = entry.target.querySelector(".col-left");
						const colRight = entry.target.querySelector(".col-right");
						const dot = entry.target.querySelector(".dot");
						const slider = entry.target.querySelector(".slider-introduce");
						const contentTitle = entry.target.querySelector(".col-right .title");
						const contentDesc = entry.target.querySelector(".col-right .format-content");
						const titleChars = contentTitle
							? SplitText.create(contentTitle, { type: "chars" }).chars
							: [];
						animate(colLeft, {
							opacity: 1,
							x: 0,
							y: 0,
							scale: 1,
							rotateZ: 0,
							filter: "blur(0px)",
							duration: 980,
							ease: createSpring({
								stiffness: 105,
								damping: 17,
							}),
						});
						animate([dot, slider], {
							opacity: 1,
							scale: 1,
							filter: "blur(0px)",
							duration: 840,
							delay: 120,
							ease: "outQuart",
						});
						animate(colRight, {
							opacity: 1,
							x: 0,
							y: 0,
							scale: 1,
							rotateZ: 0,
							filter: "blur(0px)",
							duration: 1100,
							ease: createSpring({
								stiffness: 92,
								damping: 18,
							}),
							delay: 180,
						});
						if (contentTitle) {
							contentTitle.style.opacity = 1;
							contentTitle.style.perspective = "1000px";
						}
						animate(titleChars, {
							translateX: [40, 0],
							translateZ: 0,
							opacity: [0, 1],
							duration: 500,
							ease: "outExpo",
							delay: (_, i) => 500 + 30 * i,
						});
						animate(contentDesc, {
							opacity: 1,
							x: 0,
							y: 0,
							scale: 1,
							filter: "blur(0px)",
							duration: 1020,
							delay: 420,
							ease: createSpring({
								stiffness: 95,
								damping: 19,
							}),
						});
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);

		utils.$(".home-3").forEach((section) => {
			const wrappers = section.querySelectorAll(".wrapper-lists .wrapper");
			wrappers.forEach((wrapper) => {
				const colLeft = wrapper.querySelector(".col-left");
				const colRight = wrapper.querySelector(".col-right");

				utils.set([colLeft, colRight], {
					opacity: 0,
				});
				utils.set(colLeft, {
					x: getRem(-28),
					y: getRem(22),
					scale: 0.95,
					rotateZ: -2.2,
					filter: "blur(10px)",
				});
				utils.set(colRight, {
					x: getRem(34),
					y: getRem(36),
					scale: 0.94,
					rotateZ: 2,
					filter: "blur(12px)",
				});
				utils.set(wrapper.querySelector(".dot"), {
					opacity: 0,
					scale: 0.65,
					filter: "blur(8px)",
				});
				utils.set(wrapper.querySelector(".slider-introduce"), {
					opacity: 0,
					scale: 0.94,
					filter: "blur(10px)",
				});
				utils.set(wrapper.querySelector(".col-right .title"), {
					opacity: 0,
					x: getRem(0),
					// y: getRem(30),

				});
				utils.set(wrapper.querySelector(".col-right .format-content"), {
					opacity: 0,
					x: getRem(24),
					y: getRem(24),
					scale: 0.975,
					filter: "blur(10px)",
				});
				observer.observe(wrapper);
			});
		});
	},
	home_5: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const logos = entry.target.querySelectorAll(".swiper-slide .item");
					animate(logos, {
						opacity: 1,
						y: 0,
						scale: 1,
						filter: "blur(0px)",
						duration: 900,
						ease: "outQuart",
						delay: stagger(45, { grid: [8, 1], from: "center" }),
					});
					obs.unobserve(entry.target);
				});
			},
			{ threshold: 0.2 }
		);

		utils.$(".home-5").forEach((section) => {
			const logos = section.querySelectorAll(".swiper-slide .item");
			utils.set(logos, {
				opacity: 0,
				y: getRem(20),
				scale: 0.92,
				filter: "blur(6px)",
			});
			observer.observe(section);
		});
	},
	home_items_animation: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry, index) => {
					if (entry.intersectionRatio > 0.5) {
						animate(entry.target.querySelectorAll(".item"), {
							opacity: [0, 1],
							y: [getRem(40), 0],
							ease: createSpring({
								stiffness: 150,
							}),
							delay: stagger(100),
							duration: 600,
						});
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);

		utils.$(".home-item-animation").forEach((el) => {
			utils.set(el.querySelectorAll(".item"), {
				opacity: 0,
				y: getRem(60),
			});
			observer.observe(el);
		});
	},
	homeBlockTitles: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const title = entry.target;
						animate(title, {
							opacity: 1,
							x: 0,
							y: 0,
							filter: "blur(0px)",
							duration: 760,
							ease: "outQuart",
						});
						obs.unobserve(title); // Only animate once
					}
				});
			},
			{
				threshold: 0.2, // Adjust as needed (20% visible)
			}
		);

		homeSection.forEach((home) => {
			const title = home.querySelector(".block-title");
			if (!title) return;
			const position = window.getComputedStyle(title).textAlign;
			let offsetX = 0;
			if (position === "left" || position === "start") {
				offsetX = getRem(24);
			}
			if (position === "right" || position === "end") {
				offsetX = getRem(-24);
			}
			utils.set(title, {
				opacity: 0,
				x: offsetX,
				y: getRem(12),
				filter: "blur(6px)",
			});
			observer.observe(title);
		});
	},
	homeTitle: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0.5) {
						const title = entry.target;
						const animateStyle = title.getAttribute("animate-title") || "fade-up";
						const position = window.getComputedStyle(title).textAlign;
						let animateFrom = "first";
						if (position === "center") {
							animateFrom = "center";
						}
						if (position === "right") {
							animateFrom = "last";
						}

						const splitText = SplitText.create(title, {
							type: "words",
						});

						title.style.overflow = "hidden";

						if (animateStyle === "fade-up") {
							animate(splitText.words, {
								opacity: [0, 1],
								y: ["100%", 0],
								duration: 600,
								ease: createSpring({
									stiffness: 150,
								}),
								delay: stagger(25, {
									from: animateFrom,
								}),
							});
						}
						if (animateStyle === "slide-up") {
							animate(splitText.words, {
								opacity: [0, 1],
								x: ["100%", 0],
								duration: 600,
								ease: createSpring({
									stiffness: 150,
								}),
								delay: stagger(25, {
									from: animateFrom,
								}),
							});
						}

						obs.unobserve(title); // Only animate once
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		homeSection.forEach((home) => {
			const title = home.querySelectorAll("[animate-title]");
			if (!title) return;
			title.forEach((item) => {
				observer.observe(item);
			});
		});
	},
	homeDescription: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const description = entry.target;
						let animateFrom = "first";
						// const position =
						// 	window.getComputedStyle(description).textAlign;
						// if (position === "center") {
						// 	animateFrom = "center";
						// } else if (position === "right") {
						// 	animateFrom = "last";
						// }

						const splitText = SplitText.create(description, {
							type: "words,lines",
						});
						description.style.opacity = 1;
						const words = splitText.words;
						const line = splitText.lines;
						line.forEach((line) => {
							line.style.height = line.offsetHeight + "px";
							line.style.overflow = "hidden";
						});
						animate(words, {
							opacity: [0, 1],
							translateY: [getRem(20), 0],
							duration: 500,
							delay: stagger(15, {
								from: animateFrom,
							}),
						});
						obs.unobserve(description); // Only animate once
					}
				});
			},
			{
				threshold: 0.2, // Adjust as needed (20% visible)
			}
		);

		homeSection.forEach((home) => {
			const description = home.querySelector(".desc");
			if (!description) return;
			description.style.opacity = 0;
			observer.observe(description);
		});
	},

	primaryNav: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animate(entry.target.querySelectorAll("li"), {
							opacity: 1,
							x: 0,
							duration: 600,
							delay: stagger(100),
							ease: createSpring({
								stiffness: 150,
								damping: 10,
							}),
						});
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 }
		);

		utils.$(".nav-primary").forEach((el) => {
			utils.set(el.querySelectorAll("li"), {
				opacity: 0,
				x: getRem(20),
			});
			observer.observe(el);
		});
	},

	init: () => {
		if ($("body.home").length === 0) return;
		if ($(window).width() < 1200) return;
		homePage.primaryNav();
		homePage.titleFadeLeft();
		homePage.home_3();
		homePage.home_items_animation();
		homePage.home_items_animation_fade();
		document.fonts.ready.then((e) => {
			homePage.homeBlockTitles();
			homePage.homeTitle();
			homePage.homeDescription();
		});
	},
};
