import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import Membre from "../models/Membre.js";
import { sendEmail } from "../utils/mail.js";

const router = express.Router();

const formLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: parseInt(process.env.FORM_RATE_MAX || "3", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: "Trop de tentatives, veuillez réessayer plus tard.",
});

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nom invalide")
    .max(80, "Nom trop long")
    .regex(/^[a-zA-ZÀ-ÿ\s''-]{2,80}$/, "Caractères invalides dans le nom"),
  email: z.string().email("Email invalide").trim(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{6,20}$/, "Numéro de téléphone invalide"),
  filiere: z.enum([
    "Civil",
    "Electrique",
    "Industriel",
    "Informatique",
    "Mecanique",
    "Mineral",
    "MIS",
    "Procédé Industriel",
    "Réseaux & Télécoms",
  ]),
  cellule: z.enum([
    "Conception",
    "Événement",
    "IT",
    "Logistique",
    "Média",
    "Network Training",
    "Projet",
    "Revue",
    "Sponsoring",
    "Telecommunication training",
  ]),
});

const sendWelcomeEmail = async ({ name, email, cellule }) => {
  if (!email) {
    console.error("Missing email in sendWelcomeEmail payload:", { name, email, cellule });
    throw new Error("Email field missing when sending welcome email");
  }

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <div style="text-align: center; padding: 20px;">
        <img src="https://raw.githubusercontent.com/WassimMkh/emitel-assets/refs/heads/main/emails/images/logo.png" alt="EmiTel Club" style="width: 120px; margin-bottom: 10px;">
      </div>
      <h2 style="color: #004aad;">Bonjour ${name},</h2>
      <p>Merci d'avoir postulé pour rejoindre le club <b>EMI Tel</b> !</p>
      <p>Votre cellule choisie : <b>${cellule}</b></p>
      <p>Nous étudierons votre candidature et vous contacterons bientôt avec la suite du processus.</p>

     

      <p style="font-size: 14px; color: #666;">Cordialement,<br><b>L'équipe Emi Tel</b></p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <div style="text-align: center;">
        <a href="https://www.instagram.com/emi_tel_/" style="margin: 0 8px;">
          <img src="https://raw.githubusercontent.com/WassimMkh/emitel-assets/refs/heads/main/emails/images/instagram.png" alt="Instagram" width="24">
        </a>
        <a href="https://www.linkedin.com/company/emitelclub/" style="margin: 0 8px;">
          <img src="https://raw.githubusercontent.com/WassimMkh/emitel-assets/refs/heads/main/emails/images/linkedin.png" alt="LinkedIn" width="24">
        </a>
      </div>

      <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
        © ${new Date().getFullYear()} EMI Tel Club. Tous droits réservés.
      </p>
    </div>
  `;

  await sendEmail(
    email,
    "Confirmation de réception de votre candidature Emi Tel",
    html
  );
};


router.post("/", formLimiter, async (req, res) => {
  try {
    const payload = formSchema.parse(req.body);
    const { email, phone } = payload;

  
    const minutesWindow = parseInt(process.env.RECENT_WINDOW_MINUTES || "2", 10);
    const recentCutoff = new Date(Date.now() - minutesWindow * 60 * 1000);

    const recent = await Membre.findOne({
      $or: [{ email }, { phone }],
      createdAt: { $gte: recentCutoff },
    });

    if (recent) {
      return res.status(429).json({
        success: false,
        message: "Vous avez déjà soumis récemment — réessayez plus tard.",
      });
    }


    const existing = await Membre.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Ce membre existe déjà.",
      });
    }

    const membre = new Membre(payload);
    await membre.save();

    sendWelcomeEmail(payload).catch((err) =>
      console.error("Erreur envoi email:", err)
    );

    return res.status(201).json({
      success: true,
      message:
        "Données enregistrées avec succès. Un email de confirmation a été envoyé.",
    });
  } catch (err) {
    console.error("Form submission error:", err);


    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Un membre avec cet email ou téléphone existe déjà.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erreur serveur — veuillez réessayer plus tard.",
      details: err.message,
    });
  }
});

export default router;
