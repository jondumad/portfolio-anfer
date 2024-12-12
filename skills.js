const skills = [
	{
		name: "JavaScript",
		logo: "assets/js.png",
		link: "https://www.javascript.com",
		delay: 1,
	},
	{
		name: "React",
		logo: "assets/react.png",
		link: "https://react.dev",
		delay: 2,
	},
	{
		name: "Node.js",
		logo: "assets/nodejs.png",
		link: "https://nodejs.org",
		delay: 3,
	},
	{
		name: "Python",
		logo: "assets/python.png",
		link: "https://www.python.org",
		delay: 4,
	},
	{
		name: "Docker",
		logo: "assets/docker.png",
		link: "https://www.docker.com",
		delay: 5,
	},
];

function createSkillsGrid() {
	const skillsContainer = document.querySelector(".skills-grid");

	// Clear any existing content
	skillsContainer.innerHTML = "";

	skills.forEach((skill) => {
		// Create skill link
		const skillLink = document.createElement("a");
		skillLink.href = skill.link;
		skillLink.className = "skill";
		skillLink.target = "_blank";
		skillLink.style.setProperty("--delay", skill.delay);

		// Create skill image
		const skillImage = document.createElement("img");
		skillImage.src = skill.logo;
		skillImage.alt = `${skill.name} logo`;

		// Create skill name span
		const skillName = document.createElement("span");
		skillName.textContent = skill.name;

		// Assemble the skill card
		skillLink.appendChild(skillImage);
		skillLink.appendChild(skillName);

		// Add to container
		skillsContainer.appendChild(skillLink);
	});
}

// Run on page load
document.addEventListener("DOMContentLoaded", createSkillsGrid);

// Optional: Expose for manual refresh or dynamic updates
window.refreshSkillsGrid = createSkillsGrid;
