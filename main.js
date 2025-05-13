document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Thanks    // Footer
    footer {
        background-color: var(--dark);
        color: white;
        padding: 4rem 5% 2rem;
    }
    
    .footer-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .footer-logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .footer-logo .logo-icon {
        font-size: 1.5rem;
    }
    
    .footer-logo .logo-text {
        font-size: 1.2rem;
    }
    
    .footer-about p {
        opacity: 0.8;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
    }
    
    .social-links {
        display: flex;
        gap: 1rem;
    }
    
    .social-links a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: rgba(255,255,255,0.1);
        border-radius: 50%;
        color: white;
        transition: all 0.3s ease;
    }
    
    .social-links a:hover {
        background-color: var(--primary);
        transform: translateY(-3px);
    }
    
    .footer-links h3 {
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
        color: var(--white);
    }
    
    .footer-links ul {
        list-style: none;
    }
    
    .footer-links li {
        margin-bottom: 0.8rem;
    }
    
    .footer-links a {
        color: rgba(255,255,255,0.7);
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: 0.9rem;
    }
    
    .footer-links a:hover {
        color: var(--primary-light);
    }
    
    .footer-bottom {
        text-align: center;
        padding-top: 3rem;
        margin-top: 2rem;
        border-top: 1px solid rgba(255,255,255,0.1);
        font-size: 0.8rem;
        opacity: 0.7;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .navbar {
            flex-direction: column;
            gap: 1.5rem;
            padding: 1rem 5%;
        }
        
        .nav-links {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 2.2rem;
        }
        
        .search-bar, .newsletter-form {
            flex-direction: column;
        }
        
        .search-bar input, .newsletter-form input {
            border-radius: 50px;
            margin-bottom: 0.5rem;
        }
        
        .search-bar button, .newsletter-form button {
            border-radius: 50px;
            padding: 0.8rem;
        }
    }
</style>
</head>
<body>
    <!-- Header -->
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">
                <i class="fas fa-heartbeat logo-icon"></i>
                <span class="logo-text">MyFit<span>Bud</span></span>
            </a>
            
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="nutrition.html">Nutrition</a>
                <a href="fitness.html">Fitness</a>
                <a href="mental-health.html">Mental Health</a>
                <a href="conditions.html">Conditions</a>
                <a href="about.html">About</a>
                <a href="blog.html">Blog</a>
                <a href="tracker.html">Tracker</a>
                <a href="chatbot.html">AI Coach</a>
            </div>
            
            <div class="cta-buttons">
                <button class="btn btn-outline">Log In</button>
                <button class="btn btn-primary">Sign Up Free</button>
            </div>
        </nav>
    </header>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Your Personal Health Companion</h1>
            <p>Free, evidence-based health and wellness information to help you live your best life.</p>
            
            <div class="search-bar">
                <input type="text" placeholder="Search for articles, conditions, or tips...">
                <button type="submit"><i class="fas fa-search"></i></button>
            </div>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="features">
        <div class="section-header">
            <h2>Why Choose MyFitBud?</h2>
            <p>We provide free, accessible health information you can trust</p>
        </div>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Medically Reviewed</h3>
                <p>All our content is reviewed by healthcare professionals to ensure accuracy.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <h3>100% Free</h3>
                <p>No subscriptions, no paywalls. Quality health information for everyone.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-user-friends"></i>
                </div>
                <h3>Community Support</h3>
                <p>Connect with others on similar health journeys in our supportive community.</p>
            </div>
        </div>
    </section>
    
    <!-- Articles Section -->
    <section class="articles">
        <div class="section-header">
            <h2>Popular Health Articles</h2>
            <p>Evidence-based information to help you make informed health decisions</p>
        </div>
        
        <div class="articles-grid">
            <div class="article-card">
                <div class="article-image">
                    <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Healthy eating">
                </div>
                <div class="article-content">
                    <span class="article-category">Nutrition</span>
                    <h3>10 Simple Swaps for a Healthier Diet</h3>
                    <p>Small changes can lead to big results. Learn easy substitutions to improve your nutrition without feeling deprived.</p>
                    <div class="article-meta">
                        <span><i class="far fa-clock"></i> 8 min read</span>
                        <span><i class="far fa-calendar-alt"></i> May 15, 2025</span>
                    </div>
                </div>
            </div>
            
            <div class="article-card">
                <div class="article-image">
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Woman exercising">
                </div>
                <div class="article-content">
                    <span class="article-category">Fitness</span>
                    <h3>Beginner's Guide to Home Workouts</h3>
                    <p>No gym membership? No problem. Build an effective exercise routine with minimal equipment.</p>
                    <div class="article-meta">
                        <span><i class="far fa-clock"></i> 10 min read</span>
                        <span><i class="far fa-calendar-alt"></i> May 10, 2025</span>
                    </div>
                </div>
            </div>
            
            <div class="article-card">
                <div class="article-image">
                    <img src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Meditation">
                </div>
                <div class="article-content">
                    <span class="article-category">Mental Health</span>
                    <h3>5-Minute Mindfulness Techniques for Stress</h3>
                    <p>Quick and effective mindfulness exercises you can do anywhere to reduce anxiety and improve focus.</p>
                    <div class="article-meta">
                        <span><i class="far fa-clock"></i> 6 min read</span>
                        <span><i class="far fa-calendar-alt"></i> May 5, 2025</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Newsletter Section -->
    <section class="newsletter">
        <div class="newsletter-content">
            <h2>Get Health Tips Straight to Your Inbox</h2>
            <p>Subscribe to our weekly newsletter for the latest evidence-based health information and wellness tips.</p>
            
            <form class="newsletter-form">
                <input type="email" placeholder="Enter your email address">
                <button type="submit">Subscribe</button>
            </form>
        </div>
    </section>
    
    <!-- Footer -->
    <footer>
        <div class="footer-container">
            <div class="footer-about">
                <div class="footer-logo">
                    <i class="fas fa-heartbeat logo-icon"></i>
                    <span class="logo-text">MyFit<span>Bud</span></span>
                </div>
                <p>Your free, trusted source for health and wellness information. Empowering you to make informed decisions about your health.</p>
                
                <div class="social-links">
                    <a href="https://facebook.com"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://x.com"><i class="fab fa-twitter"></i></a>
                    <a href="https://instagram.com"><i class="fab fa-instagram"></i></a>
                    <a href="https://youtube.com"><i class="fab fa-youtube"></i></a>
                    <a href="https://pinterest.com"><i class="fab fa-pinterest"></i></a>
                </div>
            </div>
            
            <div class="footer-links">
                <h3>Health Topics</h3>
                <ul>
                    <li><a href="nutrition.html">Nutrition</a></li>
                    <li><a href="fitness.html">Fitness</a></li>
                    <li><a href="mental-health.html">Mental Health</a></li>
                    <li><a href="conditions.html">Chronic Conditions</a></li>
                    <li><a href="#">Preventive Care</a></li>
                    <li><a href="#">Healthy Living</a></li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h3>Resources</h3>
                <ul>
                    <li><a href="blog.html">Articles</a></li>
                    <li><a href="tracker.html">Tools</a></li>
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Glossary</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Newsletter</a></li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h3>Company</h3>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="#">Our Mission</a></li>
                    <li><a href="#">Medical Review Board</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>© 2025 MyFitBud. All rights reserved. The content on this website is for informational purposes only and is not intended as medical advice.</p>
        </div>
    </footer>
    
    <script src="main.js"></script>
</body>
</html>
