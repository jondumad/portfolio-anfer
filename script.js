document.addEventListener("DOMContentLoaded", () => {
	const body = document.body;
	const themeToggle =
		document.getElementById("theme-toggle") ||
		document.querySelector(".theme-icon");
	const themeIcon = document.querySelector(".theme-icon");
	const sections = document.querySelectorAll(".section");
	const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
	const homeSection = document.getElementById("home");
	const contactForm = document.getElementById("contact-form");
	const scrollToTopButton = document.getElementById("scrollToTop");
	const menuToggle = document.getElementById("menu-toggle");
	const navLinksContainer = document.getElementById("navLinks");

	// Theme Management
	const savedTheme = localStorage.getItem("theme") || "dark-mode";
	body.classList.toggle("light-mode", savedTheme === "light-mode");
	body.classList.toggle("dark-mode", savedTheme === "dark-mode");
	updateThemeIcon();

	themeToggle?.addEventListener("click", () => {
		const isLightMode = body.classList.contains("light-mode");
		body.classList.toggle("light-mode", !isLightMode);
		body.classList.toggle("dark-mode", isLightMode);

		const newTheme = isLightMode ? "dark-mode" : "light-mode";
		localStorage.setItem("theme", newTheme);
		updateThemeIcon();

		if ("vibrate" in navigator) {
			navigator.vibrate(50);
		}
	});

	function updateThemeIcon() {
		if (themeIcon) {
			themeIcon.textContent = body.classList.contains("light-mode")
				? "☀️"
				: "🌙";
			themeIcon.style.transform = "rotate(360deg)";
			setTimeout(() => {
				themeIcon.style.transform = "rotate(0deg)";
			}, 300);
		}
	}

	// Scroll-Triggered Section Animations
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("active", entry.isIntersecting);
		});
	}, observerOptions);

	sections.forEach((section) => {
		sectionObserver.observe(section);
	});

	// Smooth Navigation
	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const targetId = link.getAttribute("href").substring(1);
			const targetSection = document.getElementById(targetId);

			targetSection?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	});

	// Parallax Effect for Home Section
	homeSection?.addEventListener("mousemove", (e) => {
		const moveX = (e.clientX * -1) / 50;
		const moveY = (e.clientY * -1) / 50;
		homeSection.style.backgroundPosition = `${moveX}px ${moveY}px`;
	});

	// Contact Form Interactions
	contactForm?.addEventListener("submit", (e) => {
		e.preventDefault();

		contactForm.style.transform = "scale(0.95)";
		setTimeout(() => {
			contactForm.style.transform = "scale(1)";
			alert(
				"Thank you for your message! (Note: This is a demo - no actual submission)"
			);
		}, 200);

		contactForm.reset();
	});

	// Scroll to Top Button
	window.addEventListener("scroll", () => {
		const isVisible =
			document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
		scrollToTopButton.style.display = isVisible ? "block" : "none";
	});

	scrollToTopButton?.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	// Mobile Menu Toggle
	menuToggle?.addEventListener("change", () => {
		navLinksContainer.classList.toggle("mobile-active", menuToggle.checked);
	});

	navLinksContainer?.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			menuToggle.checked = false;
			navLinksContainer.classList.remove("mobile-active");
		});
	});

	document.addEventListener("DOMContentLoaded", () => {
		const links = document.querySelectorAll(".toc-link");
		const sections = Array.from(links).map((link) =>
			document.querySelector(link.getAttribute("href"))
		);

		const handleScroll = () => {
			let current = sections[0];

			sections.forEach((section) => {
				const rect = section.getBoundingClientRect();
				if (
					rect.top <= window.innerHeight / 2 &&
					rect.bottom >= window.innerHeight / 2
				) {
					current = section;
				}
			});

			links.forEach((link) => {
				link.classList.toggle(
					"active",
					`#${current.id}` === link.getAttribute("href")
				);
			});
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Run once to set the initial state
	});
	// Create scroll progress element
	const progressBar = document.createElement("div");
	progressBar.id = "scroll-progress";
	document.body.appendChild(progressBar);

	// Update progress bar width based on scroll
	window.addEventListener("scroll", () => {
		const winScroll =
			document.body.scrollTop || document.documentElement.scrollTop;
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		const scrolled = (winScroll / height) * 100;
		progressBar.style.width = scrolled + "%";
	});
});
