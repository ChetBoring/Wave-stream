document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.play-btn');
    const playIcon = playBtn.querySelector('i');
    const progress = document.querySelector('.progress');
    
    let isPlaying = false;
    
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });
    
    let progressWidth = 30;
    const progressInterval = setInterval(() => {
        if (isPlaying && progressWidth < 100) {
            progressWidth += 0.1;
            progress.style.width = progressWidth + '%';
        }
    }, 1000);
    
    const radioPlayButtons = document.querySelectorAll('.play-btn-overlay');
    radioPlayButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });
    
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    const openLoginBtn = document.getElementById('openLogin');
    const closeLoginBtn = document.getElementById('closeLogin');
    const loginOverlay = document.getElementById('loginOverlay');
    
    openLoginBtn.addEventListener('click', function() {
        loginOverlay.style.display = 'flex';
    });
    
    closeLoginBtn.addEventListener('click', function() {
        loginOverlay.style.display = 'none';
    });
    
    loginOverlay.addEventListener('click', function(e) {
        if (e.target === loginOverlay) {
            loginOverlay.style.display = 'none';
        }
    });
});