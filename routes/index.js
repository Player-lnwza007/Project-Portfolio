const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// กำหนด path
router.get('/login', function (req, res, next) {
    res.render("User/login");
});
router.get('/', function (req, res, next) {
    res.render("User/index");
});

// บันทึกข้อมูลลงฐานข้อมูล
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // ตรวจสอบว่ามีอีเมลนี้ในฐานข้อมูลหรือไม่
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'อีเมลนี้ถูกใช้งานแล้ว' });
        }
        // ดำเนินการเข้ารหัสรหัสผ่านและบันทึกข้อมูลผู้ใช้ใหม่
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await knex('users').insert({
            username: username,
            email: email,
            password: hashedPassword
        });
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' });
    }
    console.log(req.body);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await knex('users').where({ email }).first();
        if (user && await bcrypt.compare(password, user.password)) {
            // รหัสผ่านตรงกัน, สร้างโทเค็นโดยใช้อีเมล
            const token = jwt.sign({ userId: user.id, email: user.email, username: user.username}, 'secret_key', { expiresIn: '1h' });
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