const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const multer = require('multer');
const path = require('path');

// กำหนด path
router.get('/login', function (req, res, next) {
    res.render("login");
});

router.get('/', function (req, res, next) {
    res.render("index");
});

// เข้าสู่ระบบ
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await knex('users').where({ email }).first();
        if (user && await bcrypt.compare(password, user.password)) {
            // รหัสผ่านตรงกัน, สร้างโทเค็นโดยใช้อีเมล
            const token = jwt.sign({ userId: user.id, email: user.email, username: user.username}, 'secret_key', { expiresIn: '50m' });
            res.json({ success: true, token });
            console.log(token)
        } else {
            // รหัสผ่านไม่ตรง
            res.status(401).json({ success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในระบบ' });
    }
});

module.exports = router;