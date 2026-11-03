// Marta Lopez Portfolio Script

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tools").forEach((tools) => {
    const text = tools.textContent.trim();
    const track = document.createElement("span");

    track.className = "tools-track";
    track.innerHTML = Array.from(
      { length: 8 },
      (_, index) => `<span${index > 0 ? ' aria-hidden="true"' : ""}>${text}</span>`,
    ).join("");
    tools.replaceChildren(track);
  });

  const projectInfo = {
    films: [
      ["2026", "A Vanishing Craft", "Camera operator & Main Editor", ""],
      ["2026", "Call Me By Your Name", "Director", "Watch on Vimeo"],
      ["2025", "We Fell in Love in October", "Camera operator & Editor", "Watch on Vimeo"],
      ["2026", "The Last Macaroon", "Camera operator", "Watch on Vimeo"],
    ],
    reels: [
      ["2026", "Football Championships UdG", "See on Instagram →"],
      ["2026", "Health Week UdG", "See on Instagram →"],
      ["2025", "Sealife - Port Lligat", "See on Instagram →"],
      ["2025", "Cuttlefish - Port Lligat", "See on Instagram →"],
      ["2026", "Padel Championships UdG", "See on Instagram →"],
      ["2025", "BTS Maresme Film Festival", "See on Instagram →"],
    ],
  };
  const filmLinks = [
    "https://vimeo.com/1164836630?fl=ip&fe=ec&share=copy",
    "https://vimeo.com/1195743752?fl=ip&fe=ec&share=copy",
    "https://vimeo.com/1187490051?fl=ip&fe=ec&share=copy",
    "https://www.youtube.com/watch?is=c_bOsejI01q2EMjt&v=3yeA7-9AhCI&feature=youtu.be",
  ];
  const reelLinks = [
    "https://www.instagram.com/reel/DXyakknsw2C/",
    "https://www.instagram.com/reel/DWR1w5sDBea/",
    "https://www.instagram.com/p/DADhX6VN2fT/",
    "https://www.instagram.com/reel/DWBacfXjPm8/",
    "https://www.instagram.com/p/DGylWqzs_MydYQ9G8bWGDJtfIwn6zgTj7Ctha80/",
    "https://www.instagram.com/reel/DP05wSEjDNK/",
  ];
  const videoModal = document.createElement("div");
  videoModal.className = "video-modal";
  videoModal.innerHTML = `
    <div class="video-modal-backdrop" data-close-video></div>
    <div class="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Media player">
      <button class="video-modal-close" type="button" aria-label="Close video" data-close-video>&times;</button>
      <iframe title="Film player" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
  `;
  document.body.append(videoModal);
  const videoFrame = videoModal.querySelector("iframe");
  const closeVideo = () => {
    videoModal.classList.remove("is-open");
    videoFrame.src = "";
    document.body.classList.remove("modal-open");
  };
  videoModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-video]")) {
      closeVideo();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal.classList.contains("is-open")) {
      closeVideo();
    }
  });

  const projectImages = document.querySelectorAll(".film-grid img, .reel-grid img");
  const projectIndexes = { films: 0, reels: 0 };

  projectImages.forEach((image) => {
    const type = image.closest(".film-grid") ? "films" : "reels";
    const info = projectInfo[type][projectIndexes[type]];
    projectIndexes[type] += 1;
    const frame = document.createElement("a");
    frame.className = "project-frame";
    if (type === "films") {
      frame.href = filmLinks[projectIndexes[type] - 1];
      frame.setAttribute("aria-label", `Open ${info[1]}`);
      frame.addEventListener("click", (event) => {
        event.preventDefault();
        const url = new URL(frame.href);
        const embedUrl = url.hostname.includes("youtube.com")
          ? `https://www.youtube.com/embed/${url.searchParams.get("v")}?autoplay=1`
          : `https://player.vimeo.com/video/${url.pathname.split("/").pop()}?autoplay=1`;
        videoFrame.src = embedUrl;
        videoModal.classList.add("is-open");
        document.body.classList.add("modal-open");
      });
    } else {
      frame.href = reelLinks[projectIndexes[type] - 1];
      frame.target = "_blank";
      frame.rel = "noopener noreferrer";
      frame.setAttribute("aria-label", `Open ${info[1]}`);
      frame.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(frame.href, "_blank", "noopener,noreferrer");
      });
    }
    const caption = document.createElement("figcaption");
    caption.innerHTML =
      type === "films"
        ? `<span class="project-year">${info[0]}</span><strong>${info[1]}</strong><span>${info[2]}</span>${info[3] ? `<span class="project-link">${info[3]}</span>` : ""}`
        : `<span class="project-year">${info[0]}</span><strong>${info[1]}</strong><span class="project-link">${info[2]}</span>`;
    image.parentNode.insertBefore(frame, image);
    frame.append(image, caption);
  });

  // 1. Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll("header nav a, .brand");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // 2. Active Header Link Highlight on Scroll
  const sections = document.querySelectorAll("section, footer");
  const navItems = document.querySelectorAll(".site-header nav a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });
  });
});
