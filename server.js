const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(fileUpload());

// Şəkillər üçün qovluq yarat
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Şəkil yükləmə endpointi
app.post('/upload', (req, res) => {
    if (!req.files?.photo) return res.status(400).send('No photo');
    
    const file = req.files.photo;
    const filename = `tiktok-${Date.now()}.png`;
    file.mv(path.join(uploadsDir, filename));
    res.send('Photo saved!');
});

// Static fayllar
app.use(express.static('public'));

// Serveri başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
