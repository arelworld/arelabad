document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('project-grid');
    const skillsContainer = document.getElementById('skills-container');
    const tourContainer = document.getElementById('tour-dates');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');

    // 1. Render Releases (Projects)
    PROJECTS_DATA.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${project.img}">
            <h3>${project.title}</h3>
            <p style="color:#b3b3b3; font-size:13px">${project.tech} • ${project.year}</p>
        `;
        card.onclick = () => openModal(project);
        grid.appendChild(card);
    });

    // 2. Render Technical Skills
    SKILLS_DATA.forEach(skill => {
        const row = document.createElement('div');
        row.className = 'skill-row';
        row.innerHTML = `
            <div style="color:var(--text-gray)">TRACK</div>
            <div><b class="skill-name">${skill.name}</b><br><small>${skill.category}</small></div>
            <div class="proficiency-bar"><div class="proficiency-fill" style="width:${skill.level}"></div></div>
        `;
        skillsContainer.appendChild(row);
    });

    // 3. Render World Tour (Experience)
    TOUR_DATA.forEach(tour => {
        const item = document.createElement('div');
        item.className = 'tour-item';
        item.innerHTML = `
            <div class="tour-date">${tour.date}</div>
            <div><b>${tour.role}</b><br><small>${tour.location}</small></div>
            <div style="text-align:right"><span style="background:#333; padding:4px 8px; border-radius:4px; font-size:10px">${tour.status}</span></div>
        `;
        tourContainer.appendChild(item);
    });

    // 4. Interaction Functions
    function openModal(project) {
        document.getElementById("modal-title").innerText = project.title;
        document.getElementById("modal-desc").innerText = project.desc;
        document.getElementById("modal-tech").innerText = project.tech;
        document.getElementById("modal-img").src = project.img;
        document.getElementById("modal-link").onclick = () => window.open(project.link, '_blank');
        
        document.getElementById("current-track-name").innerText = project.title;
        document.getElementById("current-track-status").innerText = "Reviewing Discography...";
        document.getElementById("mini-art").style.background = `url(${project.img}) center/cover`;
        
        modal.style.display = "block";
    }

    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };

    // 5. Search & Filters
    document.getElementById('main-search').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.card').forEach(card => {
            card.classList.toggle('hidden', !card.innerText.toLowerCase().includes(term));
        });
    });

    document.getElementById('year-filter').addEventListener('change', (e) => {
        const yr = e.target.value;
        const allCards = document.querySelectorAll('.card');
        PROJECTS_DATA.forEach((p, i) => {
            allCards[i].classList.toggle('hidden', yr !== 'all' && p.year !== yr);
        });
    });

    document.getElementById('btn-shuffle').onclick = () => {
        const cards = document.querySelectorAll('.card:not(.hidden)');
        const rand = Math.floor(Math.random() * cards.length);
        cards[rand].scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => cards[rand].click(), 500);
    };
});
