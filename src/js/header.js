import { headerSearch } from "../../plugins/ComponentsUi/HeaderSearch/HeaderSearch";
import { detectCloseElement } from "./helper";
/*==================== Header ====================*/
/**
 * @param header
 */
const vw = $(window).width();
export const header = {
	scrollActive: function () {
		if ($(window).width() <= 1024) {
			$("header").addClass("active");
			return;
		}
		let height = $("header").height();
		if ($(window).scrollTop() > height) {
			$("header").addClass("active");
		} else {
			$("header").removeClass("active");
		}
	},
	mobile: function () {
		$(".header-bar").on("click", function () {
			const isOpen = $(this).hasClass("active");
			$(this).toggleClass("active");
			$("body").toggleClass("isOpenMenu");

		});

		$(".close-nav, .header-overlay").on("click", function () {
			$(".header-bar").removeClass("active");
			$("body").removeClass("isOpenMenu");

		});

		if (window.matchMedia("(max-width: 1199.98px)").matches) {

			// tránh bị append nhiều lần khi resize / gọi lại
			$(".header-menu .header-nav li[class*='has-children']").each(function () {
				if (!$(this).children(".menu-item").length) {
					const $link = $(this).children("a");

					$link.wrap('<div class="menu-item"></div>');
					$(this).children(".menu-item").append('<div class="icon-arrow"></div>');
				}
			});

			// remove event cũ tránh bị bind nhiều lần
			$(".header-menu .header-nav").off("click", ".icon-arrow");

			// dùng delegation cho chuẩn
			$(".header-menu .header-nav").on("click", ".icon-arrow", function (e) {
				e.preventDefault();

				const $li = $(this).closest("li");
				const $submenu = $li.children("ul");

				// 👉 accordion: đóng các menu cùng cấp
				$li.siblings(".active")
					.removeClass("active")
					.children("ul")
					.stop(true, true)
					.slideUp();

				// 👉 toggle menu hiện tại
				$li.toggleClass("active");
				$submenu.stop(true, true).slideToggle();
			});
		}
	},
	/**
	 * Desktop (≥1200px): hover li có ul.sub-menu → slideDown / slideUp khi rời.
	 * Mobile (<1200px): bấm vào link cha → slideToggle (accordion cùng cấp).
	 * Root: #menu-main-menu (WP) hoặc .header-menu .header-nav > ul.
	 */
	desktopSubmenu: function () {
		const mqDesktop = window.matchMedia("(min-width: 1200px)");
		const MOBILE_CLICK_SEL =
			"li[class*='has-children'] > a, li[class*='has-children'] > .menu-item > a";

		function getBindRoot() {
			const $wp = $("#menu-main-menu");
			if ($wp.length) return $wp;
			const $navUl = $(".header-menu .header-nav > ul").first();
			if ($navUl.length) return $navUl;
			return $(".header-menu > ul").first();
		}

		function attachDesktopHover($root) {
			$root.on("mouseenter.desktopSubmenu", "li", function () {
				const $li = $(this);
				const $sub = $li.children("ul.sub-menu");
				if (!$sub.length) return;

				$li
					.siblings("li")
					.removeClass("is-submenu-open")
					.children("ul.sub-menu")
					.stop(true, true)
					.slideUp(250);

				$li.addClass("is-submenu-open");
				$sub.stop(true, true).slideDown(250);
			});

			$root.on("mouseleave.desktopSubmenu", "li", function () {
				const $li = $(this);
				const $sub = $li.children("ul.sub-menu");
				if (!$sub.length) return;

				$li.removeClass("is-submenu-open");
				$sub.stop(true, true).slideUp(250);
			});
		}

		function attachMobileClick($root) {
			$root.on("click.mobileSubmenu", MOBILE_CLICK_SEL, function (e) {
				const $li = $(this).closest("li[class*='has-children']").first();
				const $sub = $li.children("ul.sub-menu");
				if (!$sub.length) return;

				e.preventDefault();

				$li
					.siblings(".active")
					.removeClass("active")
					.children("ul.sub-menu")
					.stop(true, true)
					.slideUp(250);

				$li.toggleClass("active");
				$sub.stop(true, true).slideToggle(250);
			});
		}

		function syncSubmenuMode() {
			const $root = getBindRoot();
			$root.off(".desktopSubmenu");
			$root.off(".mobileSubmenu");

			if (!$root.length) return;

			$root.find("ul.sub-menu").stop(true, true).removeAttr("style");
			$root.find("li").removeClass("active is-submenu-open");

			if (mqDesktop.matches) {
				attachDesktopHover($root);
			} else {
				attachMobileClick($root);
			}
		}

		syncSubmenuMode();

		if (typeof mqDesktop.addEventListener === "function") {
			mqDesktop.addEventListener("change", syncSubmenuMode);
		} else {
			mqDesktop.addListener(syncSubmenuMode);
		}
	},
	initVariable: function () {
		const $header = document.querySelector("header");
		if (!$header) return;

		// Hàm cập nhật chiều cao header
		function updateHeaderHeight() {
			const height = $header.offsetHeight;
			document.documentElement.style.setProperty("--header-height", `${height}px`);
		}

		// Cập nhật ban đầu
		updateHeaderHeight();

		// Theo dõi mọi thay đổi chiều cao của header
		const ro = new ResizeObserver(updateHeaderHeight);
		ro.observe($header);

		// Phòng trường hợp ảnh hoặc font chưa load xong
		window.addEventListener("load", () => {
			setTimeout(updateHeaderHeight, 100);
		});
	},
	init: function () {
		headerSearch();
		header.scrollActive();
		header.mobile();
		header.desktopSubmenu();
		header.initVariable();
	},
};
document.addEventListener(
	"scroll",
	function (e) {
		header.scrollActive();
	},
	true
);
