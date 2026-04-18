import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Modal Logic
  const modalOverlay = document.getElementById('logicModal');
  const closeBtn = document.getElementById('closeModal');
  const viewLogicLinks = document.querySelectorAll('.view-logic-link');

  viewLogicLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Action Approval Simulation
  const approveBtns = document.querySelectorAll('.btn-primary');
  approveBtns.forEach(btn => {
    if (btn.textContent === 'Approve') {
      btn.addEventListener('click', (e) => {
        const feedItem = e.target.closest('.feed-item');
        feedItem.style.opacity = '0.5';
        e.target.textContent = 'Approved';
        e.target.disabled = true;
        setTimeout(() => {
          feedItem.innerHTML = `
            <div class="feed-icon info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div class="feed-content">
              <p class="feed-text">Wire transfer of $1,200 to AWS Inc. was approved and executed.</p>
              <a href="#" class="view-logic-link" onclick="document.getElementById('logicModal').classList.add('active')">View Logic</a>
            </div>
          `;
          feedItem.style.opacity = '1';
        }, 600);
      });
    }
  });

  // Kill Switch Interaction
  const killSwitch = document.getElementById('killSwitch');
  killSwitch.addEventListener('click', () => {
    const isConfirmed = confirm("Are you sure you want to revoke all access for Accounts Payable Copilot? This will immediately terminate all active sessions.");
    if (isConfirmed) {
      killSwitch.textContent = "Access Revoked";
      killSwitch.classList.remove('btn-danger');
      killSwitch.style.backgroundColor = "var(--border-color)";
      killSwitch.style.color = "var(--text-primary)";
      killSwitch.disabled = true;
      
      const badge = document.querySelector('.badge');
      badge.textContent = "Revoked";
      badge.className = "badge";
      badge.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
      badge.style.color = "var(--accent-danger)";
    }
  });
});
