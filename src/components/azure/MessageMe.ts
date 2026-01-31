import axios from "axios";

const fetchEmails = async (accessToken: string) => {
  try {
    const response = await axios.get(
      "https://graph.microsoft.com/v1.0/me/messages",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.value; // Array of email messages
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};

const sendEmail = async (accessToken: string, emailData: any) => {
  try {
    await axios.post(
      "https://graph.microsoft.com/v1.0/me/sendMail",
      { message: emailData },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
