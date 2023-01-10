## Login and Register simple with MERN (MySQL, Express, React, Node) and JWT (JSON Web Token)

Ini adalah Project sederhana untuk membuat login dan register dengan menggunakan teknologi MERN

### Jalankan Project

Sebelum menjalankan project, pastikan dulu beberapa hal ini :

- Jalankan module Apache dan MySQL di xampp control panel
- Buat database bernama `tokoonline`, atau terserah kamu mau buat nama seperti apa
- Buat table bernama `user`. Berikut nama field/column nya

| Column/Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int(11)` | Primary Key - Auto Increment |
| `username` | `varchar(50)` | - |
| `password` | `varchar(255)` | - |
| `role` | `varchar(20)` | - |


Untuk menjalankan project caranya adalah :

Jalankan Sisi Client
```bash
  cd client
  npm start
```

Jalankan Sisi Server
```bash
  cd server
  npm run start
```