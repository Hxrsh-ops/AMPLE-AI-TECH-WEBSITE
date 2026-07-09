// FRONTEND FORMS AND BOOKING INTEGRATION

document.addEventListener('DOMContentLoaded', () => {
  // 1. Update all Cal.com links dynamically to use the correct booking link
  updateBookingLinks();
  
  // 2. Setup form submission listeners
  setupFormListeners();
});

// Helper to replace all cal.com links with the owner's link
function updateBookingLinks() {
  const targetUrl = 'https://cal.com/ampletech';
  document.querySelectorAll('a[href*="cal.com"]').forEach(link => {
    link.setAttribute('href', targetUrl);
  });
}

function setupFormListeners() {
  document.addEventListener('submit', async (e) => {
    const form = e.target;
    
    // Check if it's a contact or newsletter form
    const isContactForm = form.classList.contains('framer-1n9v1w8') || form.classList.contains('framer-jyaash');
    const isNewsletterForm = form.classList.contains('framer-9on65k');
    
    if (!isContactForm && !isNewsletterForm) return;
    
    // Prevent page reload
    e.preventDefault();
    
    // Check submit state to prevent double submissions
    if (form.dataset.submitting === 'true') return;
    form.dataset.submitting = 'true';
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
    
    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = `
        <span class="btn-spinner" style="display:inline-block; width:12px; height:12px; border:2px solid rgba(255,255,255,0.3); border-radius:50%; border-top-color:#fff; animation:spin 0.8s linear infinite; margin-right:5px; vertical-align:middle;"></span>
        Processing...
      `;
      // Ensure the spinner animation CSS is defined in styles
      if (!document.getElementById('spinner-style-injector')) {
        const style = document.createElement('style');
        style.id = 'spinner-style-injector';
        style.innerHTML = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }
    }
    
    // Clear any previous feedback banners
    const existingFeedback = form.querySelector('.form-feedback-banner');
    if (existingFeedback) existingFeedback.remove();

    try {
      const formData = new FormData(form);
      const payload = {};
      
      // Get all standard form parameters and honeypots
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      let endpoint = '';
      let formattedPayload = {};

      if (isContactForm) {
        endpoint = '/api/submit-contact';
        
        // Match specific form variants
        if (form.classList.contains('framer-1n9v1w8')) {
          // Homepage form double-Name input mapping
          // The HTML contains two inputs named "Name": one text (input #0) and one email (input #1)
          const textInputs = form.querySelectorAll('input[type="text"][name="Name"]');
          const emailInputs = form.querySelectorAll('input[type="email"][name="Name"]');
          
          formattedPayload.name = textInputs.length ? textInputs[0].value : '';
          formattedPayload.email = emailInputs.length ? emailInputs[0].value : '';
          formattedPayload.message = form.querySelector('textarea[name="Message"]')?.value || '';
        } else {
          // Contact page form mapping
          formattedPayload.name = payload['Name'] || '';
          formattedPayload.email = payload['Email'] || '';
          formattedPayload.message = payload['Message'] || '';
          formattedPayload.location = payload['Location'] || '';
          formattedPayload.subject = payload['Subject'] || '';
          
          // Get selected radio value (Interest)
          const selectedRadio = form.querySelector('input[type="radio"][name="Radio"]:checked');
          formattedPayload.serviceType = selectedRadio ? selectedRadio.value : '';
        }

        // Auto-tag lead with URL plan parameters if available (e.g. ?plan=starter)
        const urlParams = new URLSearchParams(window.location.search);
        formattedPayload.plan = urlParams.get('plan') || '';

      } else {
        endpoint = '/api/subscribe-newsletter';
        formattedPayload.email = payload['Email Address'] || '';
      }

      // Map any honeypot anti-spam fields
      const honeypotKeys = [
        'website', 'company', 'message', 'subject', 'title', 
        'description', 'feedback', 'notes', 'details', 'remarks', 'comments'
      ];
      honeypotKeys.forEach(key => {
        // If isContactForm, don't override the primary message/subject if they map to honeypot keys
        if (isContactForm && (key === 'message' || key === 'subject')) {
          formattedPayload[`${key}_honeypot`] = payload[key] || '';
        } else {
          formattedPayload[key] = payload[key] || '';
        }
      });

      // Submit data asynchronously
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedPayload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      // Success feedback state
      showFeedback(form, result.message || 'Submitted successfully!', 'success');
      form.reset();

    } catch (error) {
      console.error('[Form Submit Error]', error);
      showFeedback(form, error.message || 'Connection failed. Please check your internet.', 'error');
    } finally {
      // Reset loading states
      form.dataset.submitting = 'false';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  });
}

function showFeedback(form, message, type) {
  const banner = document.createElement('div');
  banner.className = 'form-feedback-banner';
  banner.style.padding = '12px 16px';
  banner.style.borderRadius = '8px';
  banner.style.marginBottom = '16px';
  banner.style.fontFamily = "'Geist', sans-serif";
  banner.style.fontSize = '14px';
  banner.style.lineHeight = '1.4';
  banner.style.transition = 'all 0.3s ease';

  if (type === 'success') {
    banner.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
    banner.style.border = '1px solid rgba(34, 197, 94, 0.3)';
    banner.style.color = '#4ade80';
  } else {
    banner.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    banner.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    banner.style.color = '#f87171';
  }

  banner.textContent = message;
  
  // Insert at the top of the form
  form.insertBefore(banner, form.firstChild);
  
  // Auto-scroll to view the banner on mobile
  banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
