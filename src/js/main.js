import AOS from "aos";
import lozad from "lozad";
import { animate, stagger } from "animejs";
import {
	setBackgroundElement,
	detectCloseElement,
	buttonToTop,
	clickScrollToDiv,
	appendCaptchaASP,
	menuSpy,
	ToggleItem,
	stickElementToEdge,
	countUpInit,
	customTab,
	replaceSvgImages,
	showContent,
	initRecruitClampReadMore,
} from "./helper";
import { header } from "./header";
import { LoadMoreElement } from "./load-more";
import { swiperInit } from "./swiper";
import { homePage } from "./homePage";
$(document).ready(function () {
	setBackgroundElement();
	stickElementToEdge();
	menuSpy();
	replaceSvgImages();
	customTab();
	showContent();
	countUpInit();
	swiperInit();
	initRecruitClampReadMore();
	ToggleItem();
	homePage.init();
	watchObserveInputFile();
	initPulseCircleAnime();
	homeOverview();
	// initFooterColorMotion();
	buttonToTop();
	header.init();

	setTimeout(initRecruitClampReadMore, 400);


	// Load more recruitment jobs
	$('[data-media-list]').each(function () {
		const $mediaList = $(this);
		const $loadMoreButton = $mediaList
			.closest('.tabslet-content')
			.find('[data-load-more-media] button')
			.first();

		if (!$loadMoreButton.length) return;

		new LoadMoreElement({
			parentSelector: $mediaList,
			itemSelector: '.media-item-wrapper',
			buttonSelector: $loadMoreButton,
			visibleCount: 3,
			loadStep: 2,
		});
	});
	setTimeout(() => {
		AOS.init({
			offset: 80,
			once: true,
			disable: function () {
				return window.innerWidth < 1200;
			},
		});
	}, 100);
	setTimeout(() => {
		AOS.refresh();
	}, 1000);
});

function initPulseCircleAnime() {
	const aboutSection = document.querySelector(".home-3");
	if (!aboutSection) return;

	const runPulse = (svgElement) => {
		if (!svgElement) return;

		const svgGroups = svgElement.matches("svg")
			? [svgElement]
			: Array.from(svgElement.querySelectorAll("svg"));

		const pulseGroups = svgGroups.filter(
			(group) =>
				group.querySelectorAll("circle").length === 3 &&
				group.dataset.pulseAnimated !== "true"
		);

		if (!pulseGroups.length) return;

		const firstOuterCircles = [];
		const secondOuterCircles = [];
		const centerCircles = [];

		pulseGroups.forEach((group) => {
			const circles = group.querySelectorAll("circle");
			firstOuterCircles.push(circles[0]);
			secondOuterCircles.push(circles[1]);
			centerCircles.push(circles[2]);
		});

		animate(firstOuterCircles, {
			r: [20, 26, 26, 26, 20],
			opacity: [0.2, 0.4, 0.4, 0.4, 0.2],
			duration: 5000,
			ease: "linear",
			delay: 0,
			loop: true,
		});

		animate(secondOuterCircles, {
			r: [20, 20, 20, 20, 20],
			opacity: [0.2, 0.6, 0.6, 0.6, 0.2],
			duration: 5000,
			ease: "linear",
			delay: 0,
			loop: true,
		});

		animate(centerCircles, {
			r: [12, 12, 12],
			opacity: [1, 1, 1],
			duration: 5000,
			delay: 0,
			ease: "linear",
			loop: true,
		});

		pulseGroups.forEach((group) => {
			group.dataset.pulseAnimated = "true";
		});
	};

	const dotWrappers = Array.from(aboutSection.querySelectorAll(".dot"));
	if (!dotWrappers.length) return;

	const initPulseOnDot = (dotWrapper) => {
		const existingSvg = dotWrapper.querySelector("svg");
		if (existingSvg) {
			runPulse(existingSvg);
			return;
		}

		const observer = new MutationObserver(() => {
			const svgElement = dotWrapper.querySelector("svg");
			if (!svgElement) return;
			runPulse(svgElement);
			observer.disconnect();
		});

		observer.observe(dotWrapper, { childList: true, subtree: true });
	};

	dotWrappers.forEach((dotWrapper) => {
		initPulseOnDot(dotWrapper);
	});
}

function homeOverview() {
	const $items = $(".home-overview-item");
	const $cover = $(".overview-cover-img");

	if (!$items.length) return;

	const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
	const isSmallScreen = window.matchMedia("(max-width: 1023.98px)").matches; // dưới xl

	// Mobile / touch: bỏ background, thêm div img riêng bên trong từng item
	if (isTouchDevice || isSmallScreen) {
		$items.each(function () {
			const $item = $(this);
			const imgSrc = $item.data("background-image") || $item.attr("setBackground");
			if (!imgSrc) return;

			// Xóa background inline nếu có
			$item.css({
				"background-image": "none",
				"background-size": "",
				"background-position": "",
			});

			// Không append trùng nếu đã có
			if ($item.find(".home-overview-item-img").length) return;

			const $imgWrap = $('<div class="home-overview-item-img"></div>');
			const $img = $("<img>", {
				src: imgSrc,
				alt: "",
			});
			$imgWrap.append($img);

			// Cho ảnh lên trên nội dung
			$item.prepend($imgWrap);
		});

		return;
	}

	// Desktop: giữ behavior cũ, dùng overlay chung
	if (!$cover.length) return;

	$items
		.on("mouseenter", function () {
			const imgSrc = $(this).data("background-image") || $(this).attr("setBackground");
			if (!imgSrc) return;

			$cover
				.addClass("active")
				.find("img")
				.attr("src", imgSrc);
		})
		.on("mouseleave", function () {
			$cover.removeClass("active");
		});
}
// function initFooterColorMotion() {
// 	const footer = document.querySelector(".footer");
// 	const colorEl = footer?.querySelector(".color");
// 	if (!footer || !colorEl) return;

// 	let moveAnimation = null;
// 	let resizeTimer = null;

// 	const animateFooterColor = () => {
// 		const footerWidth = footer.clientWidth;
// 		const colorWidth = colorEl.clientWidth;
// 		const maxTranslate = Math.max(0, footerWidth - colorWidth);

// 		if (moveAnimation) moveAnimation.pause();

// 		moveAnimation = animate(colorEl, {
// 			translateX: [12000, maxTranslate],
// 			duration: 12000,
// 			ease: "linear",
// 			direction: "alternate",
// 			loop: true,
// 		});
// 	};

// 	animateFooterColor();
// 	window.addEventListener("resize", () => {
// 		clearTimeout(resizeTimer);
// 		resizeTimer = setTimeout(animateFooterColor, 180);
// 	});
// }
function watchObserveInputFile() {
	// Click vào nút để trigger input file (trừ khi click vào icon xóa)
	$(".btn-file-upload").on("click", function (e) {
		// Nếu click vào icon xóa thì không trigger input file
		if ($(e.target).hasClass("btn-remove-file") || $(e.target).closest(".btn-remove-file").length) {
			return;
		}
		e.preventDefault();
		const inputFile = $(this).closest(".form-input-file").find('input[type="file"]');
		inputFile.trigger("click");
	});

	// Xử lý khi chọn file
	$('.form-input-file input[type="file"]').on("change", function () {
		const file = this.files[0];
		const $formGroup = $(this).closest(".form-input-file");
		const $fileNameDisplay = $formGroup.find(".file-name-display");
		const $btnRemove = $formGroup.find(".btn-remove-file");

		if (file) {
			const fileName = file.name;
			const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
			$fileNameDisplay.text(`${fileName} (${fileSize} MB)`);
			$fileNameDisplay.addClass("has-file");
			$btnRemove.removeClass("hidden").addClass("show");
		} else {
			$fileNameDisplay.text("Tải file CV");
			$fileNameDisplay.removeClass("has-file");
			$btnRemove.addClass("hidden").removeClass("show");
		}
	});

	// Xử lý khi click vào icon xóa
	$(document).on("click", ".btn-remove-file", function (e) {
		e.preventDefault();
		e.stopPropagation();
		const $formGroup = $(this).closest(".form-input-file");
		const $inputFile = $formGroup.find('input[type="file"]');
		const $fileNameDisplay = $formGroup.find(".file-name-display");
		const $btnRemove = $formGroup.find(".btn-remove-file");

		// Reset input file
		$inputFile.val("");

		// Reset UI
		$fileNameDisplay.text("Tải file CV");
		$fileNameDisplay.removeClass("has-file");
		$btnRemove.addClass("hidden").removeClass("show");
	});
}

/*==================== Aos Init ====================*/
AOS.init({
	offset: 100,
});
/*==================== Lazyload JS ====================*/
const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();
window.lozad = observer;
