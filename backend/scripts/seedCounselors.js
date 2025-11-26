const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../src/models/User');
const connectDB = require('../src/config/db');

const counselors = [
    {
        username: 'Dr. Sarah Smith',
        email: 'sarah@mindease.com',
        password: 'password123',
        isCounselor: true,
    },
    {
        username: 'Dr. John Doe',
        email: 'john@mindease.com',
        password: 'password123',
        isCounselor: true,
    },
    {
        username: 'Dr. Emily Chen',
        email: 'emily@mindease.com',
        password: 'password123',
        isCounselor: true,
    },
];

const seedCounselors = async () => {
    try {
        await connectDB();

        for (const counselor of counselors) {
            const exists = await User.findOne({ email: counselor.email });
            if (exists) {
                console.log(`Counselor ${counselor.username} already exists`);
                continue;
            }
            await User.create(counselor);
            console.log(`Created counselor: ${counselor.username}`);
        }

        console.log('Counselor seeding completed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding counselors:', error);
        process.exit(1);
    }
};

seedCounselors();
