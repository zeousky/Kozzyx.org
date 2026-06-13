
function selectType(selectedCard) {
    document.querySelectorAll('.type-card').forEach(card => {
        card.classList.remove('selected');
        const input = card.querySelector('input');
        if (input) input.checked = false;
    });
    selectedCard.classList.add('selected');
    const input = selectedCard.querySelector('input');
    if (input) input.checked = true;
}

function sanitizeEvidenceUrl(value) {
    if (!value || typeof value !== 'string') return '';
    try {
        const url = new URL(value.trim(), location.href);
        if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
        return url.href;
    } catch {
        return '';
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    if (!btn) return;
    const originalText = btn.innerHTML;
    
    // Loading state
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending to Staff...';
    btn.style.opacity = '0.8';
    btn.style.pointerEvents = 'none';

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const evidenceUrl = sanitizeEvidenceUrl(data.evidence);
    
    try {
        const response = await fetch('https://kozzyx-report-proxy.bazsi9849.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reportType: data.reportType,
                discordId: data.discordId,
                serverId: data.serverId,
                description: data.description,
                evidence: evidenceUrl
            })
        });

        if (response.ok) {
            showSuccess();
        } else {
            throw new Error('Failed to send');
        }
    } catch (err) {
        console.warn('Report submission failed', err);
        alert('Error sending report. Please contact support through official channels.');
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'all';
    }
}

function showSuccess() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('success-state').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reportForm');
    if (form) form.addEventListener('submit', handleFormSubmit);

    document.querySelectorAll('.type-card').forEach(card => {
        card.addEventListener('click', () => selectType(card));
    });

    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn) retryBtn.addEventListener('click', () => window.location.reload());
});
    