function swiperProductDetail() {
	const swiperThumb = new Swiper(".product-detail-1 .thumb .swiper", {
		modules: [Mousewheel, Navigation],
		speed: 700,
		observer: true,
		observeParents: true,
		slideToClickedSlide: true,
		rewind: true,
		allowTouchMove: false,

		slidesPerView: 4,
		spaceBetween: 4,
		breakpoints: {
			576: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 12,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 8,
			},

			1920: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
		},
	});

	const swiperDetail = new Swiper(".product-detail-1 .main .swiper", {
		modules: [Thumbs, Autoplay, Navigation],
		spaceBetween: 12,
		slidesPerView: "auto",
		rewind: true,
		thumbs: {
			swiper: swiperThumb,
		},
		navigation: {
			prevEl: ".product-detail-1 .btn-prev",
			nextEl: ".product-detail-1 .btn-next",
		},
		// autoplay: {
		// 	delay: 4500,
		// 	disableOnInteraction: false,
		// },
		speed: 700,
		observer: true,
		observeParents: true,

	});

	// Gán ra window để sử dụng bên ngoài
	window.productDetailSwiper = {
		swiperThumb,
		swiperDetail,
	};
}