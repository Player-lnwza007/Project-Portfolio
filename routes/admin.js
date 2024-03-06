const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
  res.render("admin/admin_index");
});

router.get('/login', function (req, res, next) {
  res.render("admin/admin_login");
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex('admin').where({ email }).first();
    if (user && password === user.password) {
      // รหัสผ่านตรงกัน, สร้างโทเค็นโดยใช้อีเมล
      const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, 'secret_key', { expiresIn: '50m' });
      res.json({ success: true, token });
      console.log(user)
      console.log(token)
    } else {
      // รหัสผ่านไม่ตรง
      res.status(401).json({ success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});

router.get('/ranks', function (req, res, next) {
  res.render("admin/admin_ranks");
});
// สำหรับเพิ่มข้อมูล
router.post('/addRank', (req, res) => {
  const { rankname, select_page1, select_page2, select_page3 } = req.body;

  knex('ranks').insert({
    rankname: rankname,
    page1: select_page1 === 'Y',
    page2: select_page2 === 'Y',
    page3: select_page3 === 'Y'
  })
    .then(() => {
      res.json({ message: 'Record added successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error adding record' }); // ส่งคำตอบกลับเป็น JSON
  });
  console.log(select_page1, select_page2, select_page3)
});
//สำหรับดึงข้อมูล
router.get('/getRanks', (req, res) => {
  knex('ranks').select('*')
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving data');
    });
});
// สำหรับดึงข้อมูลมาแก้ไข
router.get('/getRankById/:id', (req, res) => {
  const { id } = req.params;

  knex('ranks').where({ id }).first()
  .then(rank => {
      if (rank) {
          res.json(rank);
      } else {
          res.status(404).send('Rank not found');
      }
  })
  .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving rank');
  });
});
// สำหรับแก้ไขข้อมูล
router.post('/updateRank/:id', (req, res) => {
  const { id } = req.params;
  const { rankname, page1, page2, page3 } = req.body;

  knex('ranks').where({ id }).update({
      rankname: rankname,
      page1: page1 === 'Y',
      page2: page2 === 'Y',
      page3: page3 === 'Y'
  })
  .then(() => {
      res.send('Rank updated successfully');
  })
  .catch(err => {
      console.error(err);
      res.status(500).send('Error updating rank');
  });
});

// สำหรับลบข้อมูล
router.delete('/deleteRank/:id', (req, res) => {
  const { id } = req.params;

  knex('ranks').where({ id }).del()
  .then(() => {
      res.send('Rank deleted successfully');
  })
  .catch(err => {
      console.error(err);
      res.status(500).send('Error deleting rank');
  });
});

router.get('/subjects', function (req, res, next) {
  res.render("admin/admin_subjects");
});

module.exports = router;
