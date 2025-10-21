import { Resend } from 'resend';
const resend = new Resend(' re_VxTGEST4_ESyjK54YEZPpMhYeXvXhKcQk');

export const sendemailServices = async (TicketId, newTicket, email) => {
    try {
        console.log("Agent EMAIL", email)
        const id = newTicket.assignerId;
        const emailBody = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; border-bottom: 3px solid #007BFF; padding-bottom: 10px;">
            <img src="https://ticketing-systems-five.vercel.app/logo.webp" alt="Techno-Communications Logo" style="width: 120px; margin-bottom: 10px;">
            <h2 style="color: #007BFF; margin: 0;">TECHNO-COMMUNICATIONS LLC</h2>
            <p style="color: #555; font-size: 14px; margin: 5px 0;">Reliable IT & Customer Support Solutions</p>
        </div>
        <div style="padding: 20px 0;">
            <p style="font-size: 16px; color: #333;"><strong>Dear ${newTicket.assignerName},</strong></p>
            <p style="font-size: 16px; color: #333;">You have been assigned a new support ticket by <strong>${newTicket.managerName}</strong>. Please review the details below:</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <p style="margin: 5px 0;"><strong>Ticket ID:</strong> ${TicketId}</p>
                <p style="margin: 5px 0;"><strong>Assigned By:</strong> ${newTicket.managerName}</p>
                <p style="margin: 5px 0;"><strong>Created By:</strong> ${newTicket.name}</p>
                <p style="margin: 5px 0;"><strong>Department:</strong> ${newTicket.department || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${newTicket.category || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${newTicket.ticketDescription || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Priority Level:</strong> <span style="color: #FF0000; font-weight: bold;">${newTicket.priority || "Medium"}</span></p>
            </div>

            <p style="font-size: 14px; color: #666; margin-top: 15px;">Kindly take action on this ticket at your earliest convenience.</p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #777;">This is an automated notification. Please do not reply directly.</p>
            <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Techno-Communications LLC. All Rights Reserved.</p>
        </div>

    </div>
</div>
`;
        {/* 
            // <div style="text-align: center; margin-top: 20px;">
        //     <a href="https://ticketing-systems-five.vercel.app/ticket/${id}/${newTicket.id}" style="background-color: #007BFF; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold;">
        //         View & Respond to Ticket
        //     </a>
        // </div>
            <div style="text-align: center; margin-top: 20px;">
            <a href="https://ticketing-systems-five.vercel.app/" style="background-color: #007BFF; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold;">
                View & Respond to Ticket
            </a>
        </div> */}
        // http://localhost:3200/manager
        const sendEmail = await resend.emails.send({
            from: 'ticketing@techno-communications.com',
            to: email,
            subject: `New Ticket Created: ${TicketId}`,
            html: emailBody
        });
        return sendEmail;
    } catch (error) {
        console.error("Error sending email: ", error.message);
        throw error;
    }
};

export const sendemailtomanagerServices = async (newTicket, email) => {
    try {
        const id = newTicket.managerID;
        const emailBody = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #007BFF; padding-bottom: 10px;">
            <img src="https://ticketing.techno-communications.com/logoT.webp" alt="Techno-Communications Logo" style="width: 120px; margin-bottom: 10px;">
            <h2 style="color: #007BFF; margin: 0;">TECHNO-COMMUNICATIONS LLC</h2>
            <p style="color: #555; font-size: 14px; margin: 5px 0;">Reliable IT & Customer Support Solutions</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 20px 0;">
            <p style="font-size: 16px; color: #333;"><strong>Dear ${newTicket.managerName},</strong></p>
            <p style="font-size: 16px; color: #333;">A new ticket has been created by <strong>${newTicket.name}</strong>. Please review the details below:</p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <p style="margin: 5px 0;"><strong>Ticket ID:</strong> ${newTicket.ticketId}</p>
                <p style="margin: 5px 0;"><strong>Created By:</strong> ${newTicket.name}</p>
                <p style="margin: 5px 0;"><strong>Department:</strong> ${newTicket.department || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${newTicket.category || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${newTicket.ticketDescription || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Priority Level:</strong> <span style="color: #FF0000; font-weight: bold;">${newTicket.priority || "Medium"}</span></p>
            </div>

            <p style="font-size: 14px; color: #666; margin-top: 15px;">Please assign this ticket to the appropriate agent.</p>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin-top: 20px;">
            <a href="https://ticketing-systems-five.vercel.app/ticket/${id}/${newTicket._id}" style="background-color: #007BFF; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold;">
                View & Assign Ticket
            </a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #777;">This is an automated notification. Please do not reply directly.</p>
            <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Techno-Communications LLC. All Rights Reserved.</p>
        </div>

    </div>
</div>
`;
        {/* <div style="text-align: center; margin-top: 20px;">
            <a href="https://ticketing-systems-five.vercel.app/" style="background-color: #007BFF; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold;">
                View & Respond to Ticket
            </a>
        </div> */}
        // http://localhost:3200/manager
        const sendEmail = await resend.emails.send({
            from: 'ticketing@techno-communications.com',
            to: email,
            subject: `New Ticket Created: ${newTicket.ticketId}`,
            html: emailBody
        });
        return sendEmail;
    } catch (error) {
        console.error("Error sending email: ", error.message);
        throw error;
    }
};




export const sendEmailToManagers = async (TicketId, newTicket) => {
    try {
        const id = newTicket.managerID;
        // console.log(newTicket.email)
        const marketManagerEmail = newTicket.market_manager_email;
        const districtManagerEmail = newTicket.dm_email;
        console.log("📩 Sending Emails To:", marketManagerEmail, districtManagerEmail);
        const emailBody = `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #007BFF; padding-bottom: 10px;">
            <img src="https://res.cloudinary.com/dynibfqrm/image/upload/v1761081529/jt91yuk0vepgzpmlvbto.webp" alt="Techno-Communications Logo" style="width: 120px; margin-bottom: 10px;">
            <h2 style="color: #007BFF; margin: 0;">TECHNO-COMMUNICATIONS LLC</h2>
            <p style="color: #555; font-size: 14px; margin: 5px 0;">Reliable IT & Customer Support Solutions</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 20px 0;">
            <p style="font-size: 16px; color: #333;"><strong>Dear Manager,</strong></p>
            <p style="font-size: 16px; color: #333;">A new ticket requires. Please review the details below:</p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <p style="margin: 5px 0;"><strong>Ticket ID:</strong> ${TicketId}</p>
                <p style="margin: 5px 0;"><strong>Created By:</strong> ${newTicket.name}</p>
                <p style="margin: 5px 0;"><strong>Department:</strong> ${newTicket.department || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Category:</strong> ${newTicket.category || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${newTicket.ticketDescription || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Priority:</strong> <span style="color: #FF0000; font-weight: bold;">${newTicket.priority || "Medium"}</span></p>
            </div>

           
        </div>     

        <!-- Footer -->
        <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #777;">This is an automated notification. Please do not reply directly.</p>
            <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Techno-Communications LLC. All Rights Reserved.</p>
        </div>

    </div>
</div>
`;
        //  <!-- Call to Action -->
        //         <div style="text-align: center; margin-top: 20px;">
        //             <a href="https://ticketing-systems-five.vercel.app/approve-ticket/${id}/${newTicket._id}" 
        //                style="background-color: #28A745; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-size: 16px; font-weight: bold;">
        //                 ✅ Approve Ticket
        //             </a>
        //         </div> 
        
        // <p style="font-size: 14px; color: #666; margin-top: 15px;">Click below to approve or decline this ticket.</p>
        // Send emails to both Market Manager & District Manager
        // console.log(marketManagerEmail)
        const sendEmails = await Promise.all([
            resend.emails.send({
                from: 'ticketing@techno-communications.com',
                to: newTicket?.managerName_email,
                // to: 'suffiyanahmed804092@gmail.com',
                subject: `🚀 Approval Needed: Ticket #${TicketId}`,
                html: emailBody
            }),
            // resend.emails.send({
            //     from: 'ticketing@techno-communications.com',
            //     to: districtManagerEmail,
            //     subject: `🚀 Approval Needed: Ticket #${TicketId}`,
            //     html: emailBody
            // })
        ]);

        console.log("✅ Emails Sent Successfully!");
        return sendEmails;
    } catch (error) {
        console.error("❌ Error sending email: ", error.message);
        throw error;
    }
};
