require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const employees = [
 {name:'Aarav Mehta',email:'aarav.mehta@example.com',department:'Engineering',designation:'Senior Software Engineer'},
 {name:'Diya Nair',email:'diya.nair@example.com',department:'Design',designation:'Product Designer'},
 {name:'Rohan Shah',email:'rohan.shah@example.com',department:'Product',designation:'Product Manager'},
 {name:'Ishita Rao',email:'ishita.rao@example.com',department:'Marketing',designation:'Growth Specialist'},
 {name:'Kabir Joshi',email:'kabir.joshi@example.com',department:'Engineering',designation:'Backend Engineer'},
 {name:'Ananya Iyer',email:'ananya.iyer@example.com',department:'HR',designation:'People Partner'},
 {name:'Vihaan Patel',email:'vihaan.patel@example.com',department:'Sales',designation:'Business Development Executive'},
 {name:'Meera Menon',email:'meera.menon@example.com',department:'Finance',designation:'Financial Analyst'},
 {name:'Arjun Rao',email:'arjun.rao@example.com',department:'Engineering',designation:'Frontend Engineer'},
 {name:'Sara Khan',email:'sara.khan@example.com',department:'Product',designation:'Product Analyst'}
];
(async()=>{try{await mongoose.connect(process.env.MONGODB_URI);await Employee.deleteMany({});await Employee.insertMany(employees);console.log(`Seeded ${employees.length} employees.`);process.exit(0)}catch(e){console.error(e.message);process.exit(1)}})();