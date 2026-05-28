import { CountUp } from "countup.js";

function isTouchDevice() {
	return (
		"ontouchstart" in window ||
		(navigator && navigator.maxTouchPoints > 0) ||
		(navigator && navigator.msMaxTouchPoints > 0)
	);
}

export function setBackgroundElement() {
	$("[setBackground]").each(function () {
		var background = $(this).attr("setBackground");
		$(this).css({
			"background-image": "url(" + background + ")",
			"background-size": "cover",
			"background-position": "center center",
		});
	});
}

export function showContent() {
	$(".wrap-show-content").each(function () {
		const $this = $(this);
		var computedHeight = $this.find(".show-content").css("max-height");
		const button = $this.find(".btn-expand");
		computedHeight = computedHeight.split("px")[0];
		var realHeight = $this.find(".show-content")[0].scrollHeight;
		// console.log("🟩 ~ realHeight:", realHeight);
		if (realHeight >= computedHeight) {
			$this.addClass("expandable");
			$this.removeClass("not-expandable");
			$this.find(".btn-expand").on("click", function () {
				$this.parent().toggleClass("active");
				$this
					.closest(".wrap-show-content")
					.toggleClass("toggle-content");
				button.toggleClass("active");
			});
		} else {
			button.hide();
			$this.addClass("not-expandable");
			$this.removeClass("expandable");
		}
	});
}

/**
 * Chỉ hiện nút xem thêm khi .desc thực sự bị line-clamp (nội dung > số dòng hiển thị).
 * Dùng cho khối benefit trong recruit-2 (swiper).
 */
export function initRecruitClampReadMore() {
	const rootSel = ".recruit-2 .item .content";

	function isDescClamped(descEl) {
		if (!descEl) return false;
		return descEl.scrollHeight > descEl.clientHeight + 2;
	}

	function syncOverflowClass($content) {
		const $desc = $content.find(".desc").first();
		const $wrapBtn = $content.find(".wrap-btn").first();
		const $link = $wrapBtn.find("a").first();
		const $span = $link.find("span").first();
		if (!$desc.length || !$wrapBtn.length || !$link.length || !$span.length) return;

		const labelMore =
			$content.data("labelMoreClamp") != null
				? $content.data("labelMoreClamp")
				: ($span.text() || "").trim();

		if ($desc.hasClass("is-expanded")) {
			$content.addClass("has-overflow-desc");
			return;
		}
		if (isDescClamped($desc[0])) {
			$content.addClass("has-overflow-desc");
		} else {
			$content.removeClass("has-overflow-desc");
			$desc.removeClass("is-expanded");
			$span.text(labelMore);
			$link.attr("aria-expanded", "false");
		}
	}

	function bindOne($content) {
		const $desc = $content.find(".desc").first();
		const $wrapBtn = $content.find(".wrap-btn").first();
		const $link = $wrapBtn.find("a").first();
		const $span = $link.find("span").first();
		if (!$desc.length || !$wrapBtn.length || !$link.length || !$span.length) return;

		if ($content.data("clampReadMoreBound")) {
			syncOverflowClass($content);
			return;
		}
		$content.data("clampReadMoreBound", true);

		const labelMore = ($span.text() || "").trim();
		const labelLess =
			($link.attr("data-read-less") || "").trim() ||
			(/\bRead\s+More\b/i.test(labelMore) ? "Read less" : "Thu gọn");

		$content.data("labelMoreClamp", labelMore);
		$content.data("labelLessClamp", labelLess);

		syncOverflowClass($content);

		$link.on("click", function (e) {
			e.preventDefault();
			if (!$content.hasClass("has-overflow-desc")) return;
			const expanded = !$desc.hasClass("is-expanded");
			$desc.toggleClass("is-expanded", expanded);
			$span.text(expanded ? labelLess : labelMore);
			$link.attr("aria-expanded", expanded ? "true" : "false");
			syncOverflowClass($content);
		});
	}

	function scanAll() {
		$(rootSel).each(function () {
			bindOne($(this));
		});
	}

	scanAll();

	let resizeT;
	$(window).on("resize.initRecruitClampReadMore", function () {
		clearTimeout(resizeT);
		resizeT = setTimeout(scanAll, 150);
	});
}

export function pickerDate() {
	$(".input-date").daterangepicker({
		singleDatePicker: true, // Chỉ chọn 1 ngày
		showDropdowns: true, // Dropdown chọn năm/tháng
		autoUpdateInput: false, // Không tự ghi input, xử lý manual
		locale: {
			format: "DD/MM/YYYY",
			cancelLabel: "Xóa",
			applyLabel: "Chọn",
		},
	});

	// Khi chọn ngày, update value input
	$(".input-date").on("apply.daterangepicker", function (ev, picker) {
		$(this).val(picker.startDate.format("DD/MM/YYYY"));
	});

	// Khi cancel, xóa value
	$(".input-date").on("cancel.daterangepicker", function (ev, picker) {
		$(this).val("");
	});

	$(function () {
		$("#daterange").daterangepicker({
			locale: {
				format: "DD/MM/YYYY",
			},
			startDate: moment().startOf("month"),
			endDate: moment().endOf("month"),
		});
	});
}
export function detectCloseElement(ele, ele2, funcRemove) {
	// close
	$(document).on("click", function (e) {
		console.log();
		if (!$(e.target).closest(ele).length && !$(e.target).hasClass(ele2)) {
			funcRemove();
		}
	});
	// esc
	$(document).keyup(function (e) {
		if (e.key === "Escape") {
			funcRemove();
		}
	});
	// overlay-blur
}
export function buttonToTop() {
	let windowHeight = $(window).height();
	$(document).on("scroll", function () {
		let scrollTop = $(window).scrollTop();
		let documentHeight = $(document).height();
		if (scrollTop + windowHeight > documentHeight - windowHeight) {
			$(".button-to-top").addClass("active");
		} else {
			$(".button-to-top").removeClass("active");
		}
	});
	$(document).on("click", ".button-to-top", function () {
		$("html, body").animate({ scrollTop: 0 });
	});
}

export function ToggleItem() {
	const nodeParent = $(".wrap-item-toggle");
	const nodeItem = nodeParent.find(".item-toggle");
	const nodeTitle = nodeItem.find(".title");

	// Lấy ảnh theo class .toggle-image
	const $images = $(".toggle-image");

	if (!nodeItem.length) return;

	function showImageByIndex(imageIndex) {
		if (!$images.length) return;
		$images.hide();
		$images.filter(`[data-image-index="${imageIndex}"]`).show();
	}

	function setActiveItem($item) {
		const imageIndex = $item.data("image-index");

		// Active item hiện tại, remove active các item khác
		nodeItem.removeClass("active");
		nodeTitle.removeClass("active");
		$item.addClass("active");
		$item.find(".title").addClass("active");

		// Show content hiện tại, ẩn các content khác
		nodeItem.find(".content").stop(true, true).slideUp();
		$item.find(".content").stop(true, true).slideDown();

		// Show ảnh tương ứng ngay lập tức
		showImageByIndex(imageIndex);
	}

	// Mặc định active item đầu tiên
	setActiveItem(nodeItem.first());

	nodeTitle.on("click", function () {
		const $item = $(this).closest(".item-toggle");
		if ($item.hasClass("active")) return;
		setActiveItem($item);
	});
}







/**
 * parent, children, item, button, initItem
 * @param { parent, children, item, button, initItem} listNode
 */
export function funcExpandContent(listNode) {
	const { parent, children, item, button, initItem, gap = 0 } = listNode;
	if (!$(parent).length) return;
	let itemHeight = $(item).outerHeight();
	let gapCalculate = gap
		? Number($(parent).find(children).css("column-gap").slice(0, -2)) * gap
		: 0;
	let initHeight = itemHeight * initItem + gapCalculate;
	let originalHeight = $(parent).find(children).outerHeight();
	if (originalHeight < initHeight) {
		$(button).remove();
	} else {
		$(parent).css("height", initHeight);
	}
	$(button).on("click", function () {
		if ($(this).hasClass("expand")) {
			$(parent).css("height", initHeight);
			$(this).find("span").text("Xem thêm");
		} else {
			$(parent).css("height", originalHeight);
			// setTimeout(() => {
			// 	$(parent).css("height", "auto");
			// }, 1000);
			$(this).find("span").text("Rút gọn");
		}
		$(this).toggleClass("expand");
	});
}

export function clickScrollToDiv(nodeEle, heightSpacing = () => { }) {
	$(nodeEle).on("click", function (event) {
		let height = 0;
		$(this).addClass("active").siblings().removeClass("active");
		if (heightSpacing) {
			height = heightSpacing();
		} else {
			height = 0;
		}
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$("html, body").animate(
				{
					scrollTop: $(hash).offset().top - height,
				},
				800
			);
		}
	});
}

export function appendCaptchaASP() {
	if (!$("#ctl00_mainContent_ctl01_pnlFormWizard").length) return;
	// Select the div element you want to observe
	const myDiv = document.querySelector("#ctl00_mainContent_ctl01_pnlFormWizard");
	// Create a new MutationObserver object
	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			console.log("Run");
			appendCaptcha();
		});
	});
	// Configure the observer to listen for changes to the "class" attribute
	const config = { attributes: true, characterData: true, childList: true };
	// Start observing the target div element
	observer.observe(myDiv, config);
	function appendCaptcha() {
		$(".form-group.frm-captcha").appendTo(".wrap-form-submit");
		$(".form-group.frm-btnwrap").appendTo(".wrap-form-submit");
	}
	appendCaptcha();
}
export function replaceSvgImages() {
	$(".img-svg").each(function () {
		const $img = $(this);
		const imgURL = $img.attr("src");
		const imgClass = $img.attr("class");
		const imgWidth = $img.attr("width");
		const imgHeight = $img.attr("height");

		$.ajax({
			url: imgURL,
			dataType: "text",
			success: function (svgContent) {
				// Create a new div to hold the SVG content
				const $svgDiv = $("<div>").html(svgContent);
				const $svg = $svgDiv.find("svg");

				// Apply original image attributes to SVG
				if (imgClass) {
					$svg.addClass(imgClass);
				}

				// Replace the image with the SVG
				$img.replaceWith($svg);
			},
			error: function (error) {
				console.error("Error fetching SVG:", error);
			},
		});
	});
}
export function indicatorSlide() {
	if ($(".indicator-swipe").length > 0) {
		var callback = function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("active");
					setTimeout(function () {
						entry.target.classList.remove("active");
					}, 3000);
				}
			});
		};

		var observer = new IntersectionObserver(callback);
		var animationItems = document.querySelectorAll(".indicator-swipe");
		animationItems.forEach(function (item) {
			observer.observe(item);
		});
	}
}

export function countUpInit() {
	const countUpElements = document.querySelectorAll(".countup");

	countUpElements.forEach((element) => {
		const targetNumber = element.getAttribute("data-number");
		const suffix = element.getAttribute("data-suffix") || "";
		const countValueEl = element.querySelector(".count-value");

		if (!countValueEl) return;

		const decimalPlaces = targetNumber.includes(".") ? targetNumber.split(".")[1].length : 0;

		const countUp = new CountUp(countValueEl, targetNumber, {
			duration: 4,
			separator: ".",
			decimal: ",",
			decimalPlaces: decimalPlaces,
			suffix: suffix,
			enableScrollSpy: true,
		});

		if (!countUp.error) {
			countUp.start();
		} else {
			console.error(countUp.error);
		}
	});
}
export function customTab() {
	const breakpoint = 1199.98;

	function initTabs() {
		$("[tab-wrapper]").each(function () {
			const $wrapper = $(this);
			const tabValue = $wrapper.attr("tab-wrapper");
			const tabMode = $wrapper.attr("tab-mode") || "click";
			const isMobile = window.innerWidth < breakpoint;
			const isHome6Tab = $wrapper.closest(".home-6").length > 0;

			// ===== MOBILE: chỉ home-6 show hết =====
			if (isMobile && isHome6Tab) {
				$wrapper.find("[tab-item]").removeClass("active");
				$wrapper
					.find("[tab-content]")
					.removeClass("active")
					.show();

				// remove event tránh bị duplicate
				$wrapper.find("[tab-item]").off();

				// reset để lên desktop init lại
				$wrapper.removeData("initialized");
				return;
			}

			// ===== DESKTOP =====
			if ($wrapper.data("initialized")) return;
			$wrapper.data("initialized", true);

			let activeValue =
				$wrapper.find(`[tab-item=${tabValue}].active`).length === 0
					? $wrapper
						.find(`[tab-item=${tabValue}]`)
						.eq(0)
						.attr("tab-item-value")
					: $wrapper
						.find(`[tab-item=${tabValue}].active`)
						.attr("tab-item-value");

			// set active ban đầu
			$wrapper
				.find(
					`[tab-content=${tabValue}][tab-content-value='${activeValue}']`
				)
				.addClass("active")
				.show();

			$wrapper
				.find(`[tab-item=${tabValue}][tab-item-value='${activeValue}']`)
				.addClass("active");

			// xử lý click lần đầu cho mobile device (giữ nguyên logic bạn)
			$wrapper
				.find(`[tab-item=${tabValue}]`)
				.each(function () {
					$(this).attr("clicked", "false");
				})
				.on("click", function (e) {
					const $item = $(this);
					const isFirstClick = $item.attr("clicked") === "false";
					const linkNode = e.target.closest("a");
					const href = linkNode ? linkNode.getAttribute("href") : null;

					if (
						linkNode &&
						isFirstClick &&
						isTouchDevice()
					) {
						// Prevent jumping to top when using placeholder links (href="#")
						if (!href || href === "#") e.preventDefault();
						$item.attr("clicked", "true");
					}

					$item.siblings().attr("clicked", "false");
				});

			// event tab
			$wrapper.find(`[tab-item=${tabValue}]`).on(tabMode, function (e) {
				const linkNode = e && e.target ? e.target.closest("a") : null;
				const href = linkNode ? linkNode.getAttribute("href") : null;
				// Always prevent placeholder anchor navigation inside tab items
				if (linkNode && (!href || href === "#")) e.preventDefault();

				const $item = $(this);
				if ($item.hasClass("active")) return;

				const value = $item.attr("tab-item-value");

				// active item
				$wrapper.find(`[tab-item=${tabValue}]`).removeClass("active");
				$item.addClass("active");

				// hide all content
				$wrapper
					.find(`[tab-content=${tabValue}]`)
					.removeClass("active")
					.hide();

				// show no-animation
				$wrapper
					.find(
						`[tab-content=${tabValue}][tab-content-value='${value}'][no-animation]`
					)
					.addClass("active")
					.show();

				// show có animation
				$wrapper
					.find(
						`[tab-content=${tabValue}][tab-content-value='${value}']:not([no-animation])`
					)
					.addClass("active")
					.fadeIn(300);
			});
		});
	}

	// chạy lần đầu
	initTabs();

	// resize (có debounce nhẹ cho mượt)
	let resizeTimer;
	$(window).on("resize", function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			initTabs();
		}, 150);
	});
}
export function stickElementToEdge() {
	var target = $("[stick-to-edge]");
	target.each(function () {
		const $this = $(this);
		const edgePosition = $this.attr("edge-placement") ? "inner" : "screen";
		const position = $this.attr("stick-to-edge");
		const unstick = $this.attr("unstick-min") || 1200;
		const $defaultContainer = $this.closest(".default-container-js").length
			? $this.closest(".default-container-js")
			: $(".default-container-js").first();
		let offset = ($(window).width() - $defaultContainer.width()) / 2;
		if (edgePosition === "inner") {
			if ($this.closest(".container") && $this.closest(".container").closest(".container-fluid")) {
				const $wideContainer = $this.closest(".wide-container-js").length
					? $this.closest(".wide-container-js")
					: $(".wide-container-js").first();
				const newOffset = Math.abs(
					$wideContainer.offset().left - $defaultContainer.offset().left
				);
				offset = newOffset;
			}
		}
		if (position === "left") {
			$this.css({
				"margin-left": `-${offset}px`,
				"--ml": `${Math.abs(offset)}`,
			});
		}
		if (position === "right") {
			$this.css({
				"margin-right": `-${offset}px`,
				"--mr": `${Math.abs(offset)}`,
			});
		}
		if ($(window).width() < unstick) {
			$this.removeAttr("style");
			$this.css({
				"--ml": "0",
				"--mr": "0",
			});
		}
	});
}
export function menuSpy() {
	var elm = document.querySelector("#menu-spy");
	let debounceTimer;
	let isActive = false;

	if (!elm) return;

	var ms = new MenuSpy(elm, {
		activeClass: "active",
		threshold: 100,
		callback: function (currentItem) {
			const nodeParent = $(".section-scrollTo-active");
			clearTimeout(debounceTimer);
			isActive = true;
			debounceTimer = setTimeout(function () {
				$(nodeParent).scrollTo("li.active", 300);
				isActive = false;
			}, 1000);

			// 👉 Scroll ngang đến li.active trên mobile/iPad
			const activeLi = elm.querySelector("li.active");

			// Phải tìm đúng phần tử scroll ngang (ul hoặc container có overflow-auto)
			const scrollContainer = elm.querySelector("ul") || elm;

			if (activeLi && scrollContainer && window.innerWidth < 1024) {
				scrollContainer.scrollTo({
					left: activeLi.offsetLeft - scrollContainer.offsetWidth / 2 + activeLi.offsetWidth / 2,
					behavior: "smooth",
				});
			}
		},
	});

	// 👉 Fix: đảm bảo active đúng section khi scroll
	window.addEventListener("scroll", function () {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollBottom = scrollTop + window.innerHeight;
		const docHeight = document.documentElement.scrollHeight;
		const threshold = 260;

		// Lấy tất cả các menu items
		const menuItems = elm.querySelectorAll("li");
		let activeItem = null;

		// Kiểm tra từ dưới lên để tìm section nào đang trong viewport
		for (let i = menuItems.length - 1; i >= 0; i--) {
			const menuItem = menuItems[i];
			const link = menuItem.querySelector("a[href^='#']");
			if (!link) continue;

			const targetId = link.getAttribute("href").slice(1);
			const targetSection = document.getElementById(targetId);

			if (targetSection) {
				const sectionTop = targetSection.offsetTop;
				const sectionBottom = sectionTop + targetSection.offsetHeight;

				// Kiểm tra nếu section đang trong viewport (với threshold)
				// Section được coi là active nếu scrollTop + threshold đã vượt qua sectionTop
				if (scrollTop + threshold >= sectionTop && scrollTop < sectionBottom) {
					activeItem = menuItem;
					break;
				}
			}
		}

		// Nếu đang gần đáy trang và không tìm thấy section nào, active section cuối cùng
		if (!activeItem && Math.abs(scrollBottom - docHeight) < 200) {
			activeItem = menuItems[menuItems.length - 1];
		}

		// Active item tìm được
		if (activeItem) {
			$("#menu-spy li").removeClass("active");
			$(activeItem).addClass("active");
		}
	});
}
