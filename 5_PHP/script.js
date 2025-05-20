
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        const navList = document.querySelector('nav ul');
        
        const loginLink = document.querySelector('nav ul li a[href="login.html"]');
        const registerLink = document.querySelector('nav ul li a[href="register.html"]');
        
        if (loginLink && registerLink) {
            loginLink.parentElement.remove();
            registerLink.parentElement.remove();
            
            const accountLi = document.createElement('li');
            const accountLink = document.createElement('a');
            accountLink.href = '#';
            accountLink.textContent = 'My Account';
            accountLi.appendChild(accountLink);
            
            const logoutLi = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.textContent = 'Logout';
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
            logoutLi.appendChild(logoutLink);
            
            navList.appendChild(accountLi);
            navList.appendChild(logoutLi);
        }
    }
}

// Logout function
function logout() {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Format currency
function formatCurrency(price) {
    return '$' + parseFloat(price).toFixed(2);
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});