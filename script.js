// URL ของ Google Apps Script (ถ้ามี) ให้นำมาใส่ตรงนี้
// const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

const form = document.getElementById('assessmentForm');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerText;
        
        // เปลียนข้อความปุ่มขณะกำลังส่งข้อมูล
        submitBtn.disabled = true;
        submitBtn.innerText = 'TRANSMITTING...';
        submitBtn.style.opacity = '0.7';

        // -----------------------------------------------------
        // หากต้องการส่งข้อมูลเข้า Google Sheets ให้เปิดคอมเมนต์ชุดด้านล่างนี้
        // และเอา setTimeout ชุดล่างสุดออก
        // -----------------------------------------------------
        /*
        const formData = new FormData(form);
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(res => {
                showSuccessAlert();
                form.reset();
                resetButton(submitBtn, originalText);
            })
            .catch(err => {
                showErrorAlert();
                resetButton(submitBtn, originalText);
            });
        */

        // -----------------------------------------------------
        // การจำลองการส่งข้อมูล (Simulation) สำหรับทดสอบ UI
        // -----------------------------------------------------
        setTimeout(() => {
            showSuccessAlert();
            form.reset();
            resetButton(submitBtn, originalText);
        }, 1500);
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
// 🎬 ควบคุม Splash Screen เปิดตัว
// =========================================
window.addEventListener('load', () => {
    // ล็อกหน้าจอไม่ให้เลื่อนระหว่างโหลด
    document.body.classList.add('loading'); 
    
    // ตั้งเวลา 2.5 วินาที (2500 มิลลิวินาที) ให้โลโก้หายไป
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
        }
        
        // ปลดล็อกหน้าจอและโชว์คอนเทนต์หลัก
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 2500); 
});
