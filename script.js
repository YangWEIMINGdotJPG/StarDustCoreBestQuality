// =========================================
// 🚀 URL ของ Google Apps Script
// =========================================
const scriptURL = 'https://script.google.com/macros/s/AKfycbzGRhWOYDfiTaYiDh2_hyEpliNE0oJ73MwzlmIy3SFomFA1uHqu0E5mnSvaCau-nG5o/exec'; 

const form = document.getElementById('assessmentForm');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerText;
        
        // เปลี่ยนข้อความปุ่มขณะกำลังส่งข้อมูล
        submitBtn.disabled = true;
        submitBtn.innerText = 'TRANSMITTING...';
        submitBtn.style.opacity = '0.7';

        // -----------------------------------------------------
        // ส่งข้อมูลเข้า Google Sheets แบบของจริง!
        // -----------------------------------------------------
        const formData = new FormData(form);

        // 🟢 โค้ดที่เพิ่มเข้ามา: มัดรวมตัวละครที่ถูกเลือกให้เป็นข้อความเดียว (เช่น "Character 1, Character 3")
        const selectedCharacters = [];
        document.querySelectorAll('input[name="fav_character"]:checked').forEach(cb => {
            selectedCharacters.push(cb.value);
        });
        formData.set('fav_character', selectedCharacters.join(', ')); // เอาไปทับค่าเดิมใน FormData

        // ส่งข้อมูลไปยัง Google Apps Script
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(res => {
                showSuccessAlert(); // โชว์โฮโลแกรมว่าสำเร็จ
                form.reset();       // ล้างแบบฟอร์ม
                resetButton(submitBtn, originalText); // คืนค่าปุ่ม
            })
            .catch(err => {
                showErrorAlert();   // โชว์แจ้งเตือนว่าพัง
                resetButton(submitBtn, originalText);
            });
    });
}

// ฟังก์ชันแสดง Alert สำเร็จสไตล์อวกาศ
function showSuccessAlert() {
    Swal.fire({ 
        title: 'TRANSMISSION COMPLETE', 
        text: 'ข้อมูลพิกัดถูกบันทึกเข้าสู่ฐานข้อมูลหลักแล้ว', 
        icon: 'success', 
        background: 'rgba(15, 23, 42, 0.95)', 
        color: '#f5f5f7', 
        confirmButtonColor: '#00d4ff',
        backdrop: `rgba(0,0,0,0.8)`
    });
}

// ฟังก์ชันแสดง Alert ล้มเหลว
function showErrorAlert() {
    Swal.fire({ 
        title: 'CONNECTION LOST', 
        text: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง', 
        icon: 'error', 
        background: 'rgba(15, 23, 42, 0.95)', 
        color: '#f5f5f7', 
        confirmButtonColor: '#ff3b30',
        backdrop: `rgba(0,0,0,0.8)`
    });
}

// ฟังก์ชันรีเซ็ตปุ่ม
function resetButton(btn, text) {
    btn.disabled = false;
    btn.innerText = text;
    btn.style.opacity = '1';
}

// =========================================
// 🎬 ควบคุม Sequence การเปิดตัว (Logo -> IG -> Form)
// =========================================
window.addEventListener('load', () => {
    document.body.classList.add('loading');
    
    const logoSplash = document.getElementById('splash-screen');
    const igSplash = document.getElementById('ig-screen');
    const mainContent = document.getElementById('main-content');
    
    // โชว์โลโก้ 2 วินาที
    setTimeout(() => {
        if (logoSplash) logoSplash.style.opacity = '0';
        
        setTimeout(() => {
            if (logoSplash) logoSplash.style.display = 'none';
            if (igSplash) {
                igSplash.style.display = 'flex';
                setTimeout(() => { igSplash.style.opacity = '1'; }, 50);
            }
            
            setTimeout(() => {
                if (igSplash) igSplash.style.opacity = '0';
                setTimeout(() => {
                    if (igSplash) igSplash.style.display = 'none';
                    document.body.classList.remove('loading');
                    if (mainContent) {
                        mainContent.style.display = 'block'; 
                        setTimeout(() => {
                            mainContent.style.opacity = '1'; 
                            mainContent.style.transform = 'translateY(0)'; 
                        }, 50);
                    }
                }, 800);
            }, 2500); 
        }, 800); 
    }, 2000); 
});
