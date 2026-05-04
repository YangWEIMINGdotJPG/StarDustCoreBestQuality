window.onload = () => {
    const splash = document.getElementById('splash-screen');
    const container = document.querySelector('.container');
    
    // จำลองการโหลดระบบ 2 วินาที
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            container.style.display = 'block';
            container.style.opacity = '1';
        }, 1000);
    }, 2000);
};

const form = document.getElementById('assessmentForm');
form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = "TRANSMITTING DATA...";
    btn.disabled = true;

    // จำลองการส่งข้อมูล (ในโปรเจกต์จริงให้ใช้ fetch เหมือนใน[cite: 3])
    setTimeout(() => {
        Swal.fire({
            title: 'MISSION SUCCESS!',
            text: 'ข้อมูลของคุณถูกส่งไปยังสถานีอวกาศแล้ว',
            icon: 'success',
            background: '#020617',
            color: '#00d4ff',
            confirmButtonColor: '#6a0dad'
        });
        btn.innerText = "DATA SENT";
    }, 1500);
});