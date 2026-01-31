import { PublicClientApplication, InteractionType } from "@azure/msal-browser";

// npm install @azure/msal-browser

html = `<td className="p-4">
  {contact.interactions?.map((interaction) => (
    <div key={interaction.id} className="border p-2 rounded mb-2">
      <p><strong>Subject:</strong> {interaction.subject}</p>
      <p><strong>From:</strong> {interaction.sender.emailAddress.name}</p>
      <p><strong>Date:</strong> {new Date(interaction.receivedDateTime).toLocaleString()}</p>
    </div>
  )) || <p>No interactions yet.</p>}
</td>`;

const msalConfig = {
  auth: {
    clientId: "<YOUR_CLIENT_ID>",
    authority: "https://login.microsoftonline.com/<YOUR_TENANT_ID>",
    redirectUri: "http://localhost:3000", // Your redirect URI
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export { msalInstance, InteractionType };
