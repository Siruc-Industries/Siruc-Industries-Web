import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    return { error: 'Method not allowed' };
  }

  try {
    const body = await readBody(event);
    const { name, company, email, project, services } = body;

    // Validate required fields
    if (!name || !email) {
      return { error: 'Name and email are required', status: 400 };
    }

    // Format the email message
    const servicesText = services && services.length > 0 
      ? services.join(', ') 
      : 'None selected';
    
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailBody = `
New Contact Form Submission

Name: ${name}
Company: ${company || 'Not provided'}
Email: ${email}
Services: ${servicesText}

Project Details:
${project || 'Not provided'}
    `.trim();

    // Send email using a service
    // Option 1: Using Resend (recommended - free tier available)
    // Install: npm install resend
    // Get API key from: https://resend.com
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'onboarding@resend.dev', // or your verified domain
      to: 'hello@sirucindustries.pl',
      subject: emailSubject,
      text: emailBody,
    });
    */

    // Option 2: Using SendGrid
    // Install: npm install @sendgrid/mail
    /*
    import sgMail from '@sendgrid/mail';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: 'hello@sirucindustries.pl',
      from: process.env.SENDGRID_FROM_EMAIL || email,
      subject: emailSubject,
      text: emailBody,
    });
    */

    // Option 3: Using Nodemailer with SMTP
    // Install: npm install nodemailer
    /*
    import nodemailer from 'nodemailer';
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || email,
      to: 'hello@sirucindustries.pl',
      subject: emailSubject,
      text: emailBody,
    });
    */

    // For development/testing: Log the email content
    console.log('📧 Email to send:', {
      to: 'hello@sirucindustries.pl',
      subject: emailSubject,
      body: emailBody,
    });

    // In production, uncomment and configure one of the email services above
    // For now, we'll simulate success for development

    return { 
      success: true, 
      message: 'Email sent successfully',
      // In development, return the email content for testing
      ...(process.env.NODE_ENV === 'development' && { emailContent: emailBody })
    };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { 
      error: 'Failed to send email', 
      details: error.message,
      status: 500 
    };
  }
});

