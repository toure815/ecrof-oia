# n8n Workflow: OIA Audit → PDF Report → Email

## Full Flow

```
Webhook (receive form)
  → Code: Score Audit (your existing scoring logic)
  → Code: Build Report HTML (build-report-html.js)
  → HTML to PDF (convert)
  → SendGrid: Send Email (deliver PDF)
  → Respond to Webhook (return success to frontend)
```

---

## Step-by-Step Setup

### 1. Webhook Node (already exists)

- **Method:** POST
- **Path:** `audit-results`
- **Response Mode:** "Respond to Webhook" node (at the end)

### 2. Code Node: "Score Audit" (already exists)

Your existing scoring logic that produces the report object.

### 3. Code Node: "Build Report HTML"

- **Mode:** Run Once for All Items
- Paste the contents of `build-report-html.js` into this Code node
- **Input:** Expects the scored report object from the previous node
- **Output:** `{ html, email, name, company }`

> **Important:** Update the logo URL on line with `src="https://ecrofmedia.com/ecrof_logo_white.png"` to your actual hosted logo URL. Also update the "Book Your Strategy Call" link.

### 4. HTML to PDF Conversion

**Option A: Execute Command node (recommended if wkhtmltopdf is installed)**

```
Node type: Execute Command
Command: echo '{{ $json.html }}' | wkhtmltopdf --quiet - -
```

This won't work well with shell escaping. Better approach:

**Option B: Execute Command node with temp file**

Use a Code node to write HTML to a temp file, then convert:

```javascript
// Code node: "Prepare PDF Command"
const fs = require('fs');
const path = require('path');
const tmpFile = `/tmp/oia-report-${Date.now()}.html`;
const pdfFile = `/tmp/oia-report-${Date.now()}.pdf`;

fs.writeFileSync(tmpFile, $input.first().json.html);

return [{
  json: {
    ...$input.first().json,
    tmpHtmlFile: tmpFile,
    pdfFile: pdfFile,
  }
}];
```

Then an **Execute Command** node:
```
wkhtmltopdf --enable-local-file-access --page-size Letter --margin-top 0 --margin-bottom 0 --margin-left 0 --margin-right 0 {{ $json.tmpHtmlFile }} {{ $json.pdfFile }}
```

Then a **Read Binary File** node:
- **File Path:** `{{ $json.pdfFile }}`
- **Property Name:** `attachment`

**Option C: Use the n8n community node `n8n-nodes-html-to-pdf`**

Install via: Settings → Community Nodes → Install → `n8n-nodes-html-to-pdf`

- **HTML:** `{{ $json.html }}`
- **Property Name:** `attachment`

### 5. SendGrid Node: "Send Email"

**Prerequisites:**
1. Create a SendGrid account at https://sendgrid.com
2. Go to Settings → API Keys → Create API Key (Full Access)
3. In n8n: Settings → Credentials → Add Credential → SendGrid API
4. Paste your API key

**SendGrid node configuration:**

| Field | Value |
|-------|-------|
| **Resource** | Email |
| **Operation** | Send |
| **From Email** | `team@ecrofmedia.com` (must be verified sender in SendGrid) |
| **From Name** | `Ecrof Media` |
| **To Email** | `{{ $('Build Report HTML').item.json.email }}` |
| **Subject** | `Your Operational Intelligence Report is ready, {{ $('Build Report HTML').item.json.name }}` |
| **Email Format** | HTML |
| **HTML** | *(see email template below)* |
| **Attachments** | Binary Property: `attachment` |

**Email HTML body (paste into the HTML field):**

```html
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',Helvetica,Arial,sans-serif;background:#f9fafb;padding:40px 0;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

    <!-- Header -->
    <div style="background:#030712;padding:32px 32px 28px;">
      <img src="https://ecrofmedia.com/ecrof_logo_white.png" alt="Ecrof Media" width="100" style="display:block;margin-bottom:20px;" />
      <h1 style="font-size:22px;font-weight:700;color:#fff;margin:0;">Your report is ready.</h1>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 20px;">
        Hi {{ $('Build Report HTML').item.json.name }},
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 20px;">
        Your Operational Intelligence Audit is complete. We've attached your full report as a PDF — it includes your OI score, pillar breakdown, ROI projection, and the sprint we'd recommend starting with.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.65;margin:0 0 28px;">
        Take a few minutes to review it. When you're ready to talk through next steps, book a free strategy call below.
      </p>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:28px;">
        <a href="https://ecrofmedia.com/book" style="display:inline-block;padding:14px 32px;background:#0A7AFF;color:#fff;font-size:15px;font-weight:600;border-radius:40px;text-decoration:none;">
          Book Your Strategy Call
        </a>
      </div>

      <hr style="border:none;height:1px;background:#E5E7EB;margin:0 0 20px;" />

      <p style="font-size:13px;color:#9CA3AF;line-height:1.6;margin:0;">
        This report was generated based on the responses you submitted through our Operational Intelligence Audit. If you didn't request this, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#F9FAFB;border-top:1px solid #E5E7EB;text-align:center;">
      <p style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.08em;color:#D1D5DB;margin:0;">
        ECROF MEDIA CO.
      </p>
    </div>
  </div>
</div>
```

### 6. Respond to Webhook Node

This returns the response to your Next.js frontend.

| Field | Value |
|-------|-------|
| **Respond With** | JSON |
| **Response Body** | `{ "success": true }` |

> **Note:** Since the frontend just shows a "check your email" confirmation page, you don't need to return the full scored report anymore. Just return `{ "success": true }`.

---

## SendGrid Setup Checklist

1. [ ] Create SendGrid account → https://sendgrid.com
2. [ ] Verify your sender email (`team@ecrofmedia.com` or similar)
   - Settings → Sender Authentication → Single Sender Verification
3. [ ] Create API Key
   - Settings → API Keys → Create API Key → Full Access
4. [ ] Add SendGrid credential in n8n
   - Settings → Credentials → New → SendGrid API → paste key
5. [ ] Test with a real email address

---

## Testing

1. Go to `/startaudit` and complete the audit
2. Check n8n execution log to see the HTML output
3. Verify PDF is generated (check /tmp/ on your n8n server)
4. Check your inbox for the email with PDF attachment

## Troubleshooting

- **wkhtmltopdf not installed:** `apt-get install wkhtmltopdf` on your n8n server, or use the community HTML-to-PDF node instead
- **PDF looks wrong:** Open the HTML file in a browser first to debug styling
- **SendGrid 403:** Your sender email isn't verified — complete sender verification in SendGrid
- **No attachment:** Make sure the Read Binary File node outputs to a property called `attachment` and the SendGrid node references that same property name
