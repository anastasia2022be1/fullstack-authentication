import express from "express";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { Resend } from "resend";
import User from '../models/User.js'

const router = express.Router();

// Получаем API-ключ и email из переменных окружения
const resend = new Resend(process.env.RESEND_API_KEY);
const emailAddress = process.env.EMAIL_ADDRESS;

router.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid registration' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const tokenExpiresAt = Date.now() + 1000 * 60 * 60 * 24;

        const user = await User.create({
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken,
            tokenExpiresAt: tokenExpiresAt
        });

        // Отправка подтверждающего письма на вашу почту
        try {
            const emailResponse = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: emailAddress,
                subject: 'Willkommen! Bitte E-Mail bestätigen',
                html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4CAF50;">Welcome to d01b!</h1>
        <p>Wir freuen uns, dich in unserem Team zu haben.</p>
        <p>Bitte bestätige deine Email!</p>
        <a href="http://localhost:3000/verify/${verificationToken}">E-Mail bestätigen<a/>
        <p>Nächste Schritte:</p>
        <ol>
          <li>Explore our features</li>
          <li>Set up your profile</li>
          <li>Start using our platform to maximize productivity</li>
        </ol>
        <p>Bis bald!</p>
        <p>Das d01b Team</p>
      </div>
    `
            });

            if (!emailResponse || emailResponse.status !== 'success') {
                return res.status(500).json({ error: 'Failed to send verification email' });
            }
        } catch (emailError) {
            return res.status(500).json({ error: 'Failed to send verification email', details: emailError.message });
        }

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid login' });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid login' });
        }

        if (!user.verified) {
            return res.status(403).json({ error: "Account not verified" });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return res.status(401).json({ error: 'Invalid login' });
        }

        res.json({
            status: "success",
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

export default router;