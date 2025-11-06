import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendInvite: RequestHandler = async (req, res, next) => {
  try {
    const anyReq: any = req;
    const userId = anyReq.userId;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const { email, boardId } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const inviteLink = `${process.env.APP_URL || 'http://localhost:8080'}/invite?token=${boardId || 'demo'}`;

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'You have been invited to FlowSpace',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6366f1;">You've been invited to FlowSpace!</h1>
          <p>You've been invited to collaborate on a board in FlowSpace.</p>
          <a href="${inviteLink}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #6366f1, #a855f7); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Accept Invitation</a>
          <p>Or copy this link: <a href="${inviteLink}">${inviteLink}</a></p>
          <p style="color: #888; font-size: 12px; margin-top: 40px;">FlowSpace - Collaborate visually, write freely.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Invite sent successfully' });
  } catch (err) {
    console.error('Email error:', err);
    next(err);
  }
};
