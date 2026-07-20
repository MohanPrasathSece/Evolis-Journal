/**
 * crmApi.ts
 * ─────────────────────────────────────────────────────────────────
 * Thin wrapper around the affiliate CRM API for Évolis Journal.
 *
 * Environment variables (set in .env):
 *   VITE_CRM_API_URL    - full endpoint URL
 *   VITE_CRM_API_TOKEN  - affiliate authorization token
 *   VITE_DASHBOARD_URL  - lead dashboard increment URL (optional)
 */

const CRM_URL =
  (import.meta.env.VITE_CRM_API_URL as string) ||
  "https://inwo.crmcore.me/api/lead_management/api/affiliates";
const CRM_TOKEN =
  (import.meta.env.VITE_CRM_API_TOKEN as string) ||
  "AFF_1_92cbc1bc76284e19b711bab22587d75f";
const DASHBOARD_URL =
  (import.meta.env.VITE_DASHBOARD_URL as string) ||
  "https://lead-dashboard-orcin.vercel.app/api/increment";

// ─── Country Patterns ──────────────────────────────────────────────

export const COUNTRY_PHONE_PATTERNS: Record<
  string,
  { dialCode: string; pattern: RegExp; example: string }
> = {
  IE:  { dialCode: "353", pattern: /^8\d{8}$/, example: "87 123 4567" },
  CH:  { dialCode: "41",  pattern: /^(\+41|0041|0)?[1-9]\d{8}$/,      example: "079 123 45 67" },
  FR:  { dialCode: "33",  pattern: /^(\+33|0033|0)?[1-9]\d{8}$/,      example: "06 12 34 56 78" },
  BE:  { dialCode: "32",  pattern: /^(\+32|0032|0)?[1-9]\d{8}$/,      example: "0471 12 34 56" },
  CA:  { dialCode: "1",   pattern: /^(\+1|001)?[2-9]\d{9}$/,          example: "416 555 0123" },
  US:  { dialCode: "1",   pattern: /^(\+1|001)?[2-9]\d{9}$/,          example: "212 555 0123" },
  GB:  { dialCode: "44",  pattern: /^(\+44|0044|0)?[1-9]\d{9,10}$/,  example: "07700 900123" },
  DE:  { dialCode: "49",  pattern: /^(\+49|0049|0)?[1-9]\d{8,11}$/,  example: "0152 12345678" },
  ES:  { dialCode: "34",  pattern: /^(\+34|0034|0)?[6-9]\d{8}$/,      example: "612 345 678" },
  IT:  { dialCode: "39",  pattern: /^(\+39|0039|0)?[3]\d{8,9}$/,      example: "312 3456789" },
  NL:  { dialCode: "31",  pattern: /^(\+31|0031|0)?[6]\d{8}$/,        example: "06 12345678" },
  SE:  { dialCode: "46",  pattern: /^(\+46|0046|0)?[7-9]\d{8}$/,      example: "070 123 45 67" },
  AU:  { dialCode: "61",  pattern: /^(\+61|0061|0)?[4]\d{8}$/,        example: "0412 345 678" },
  IN:  { dialCode: "91",  pattern: /^(\+91|0091|0)?[6-9]\d{9}$/,      example: "98765 43210" },
  AE:  { dialCode: "971", pattern: /^(\+971|00971)?[5]\d{8}$/,        example: "50 123 4567" },
  SG:  { dialCode: "65",  pattern: /^(\+65|0065)?[8-9]\d{7}$/,        example: "8123 4567" },
  ZA:  { dialCode: "27",  pattern: /^(\+27|0027|0)?[6-8]\d{8}$/,      example: "082 123 4567" },
  BR:  { dialCode: "55",  pattern: /^(\+55|0055)?[1-9]\d{10}$/,       example: "11 91234 5678" },
  MX:  { dialCode: "52",  pattern: /^(\+52|0052)?[1-9]\d{10}$/,       example: "55 1234 5678" },
  JP:  { dialCode: "81",  pattern: /^(\+81|0081|0)?[7-9]\d{8,9}$/,    example: "090 1234 5678" },
  CY:  { dialCode: "357", pattern: /^(\+357|00357)?[2-9]\d{7}$/,      example: "99 123456" },
};

// ─── Phone Formatter ──────────────────────────────────────────────

/**
 * Formats a raw phone number into CRM format: 00{dialCode}{localNumber}
 */
export function formatPhoneForCrm(raw: string, countryCode: string): string {
  const dialCode = COUNTRY_PHONE_PATTERNS[countryCode]?.dialCode || "41";
  let phone = raw.replace(/[^0-9+]/g, "");

  if (!phone) return "00" + dialCode + "0000000000";

  // Strip leading + or 00
  if (phone.startsWith("+")) phone = phone.slice(1);
  if (phone.startsWith("00")) phone = phone.slice(2);

  // Strip leading 0 (local trunk prefix)
  if (phone.startsWith("0") && !phone.startsWith(dialCode)) {
    phone = phone.slice(1);
  }

  // Remove the country code if already prepended
  if (phone.startsWith(dialCode)) {
    phone = phone.slice(dialCode.length);
  }

  return "00" + dialCode + phone;
}

// ─── Types ────────────────────────────────────────────────────────

export interface SubmitLeadInput {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message?: string;
  leadType: "signup" | "contact";
}

export type CrmError =
  | "duplicate"   // 409 – lead already exists
  | "invalid"     // 422 / validation error from CRM
  | "server"      // 400 / 500 series
  | "network";    // fetch failed

export interface CrmResult {
  ok: boolean;
  error?: CrmError;
}

// ─── Main function ────────────────────────────────────────────────

/**
 * Submit a lead to the CRM. Returns { ok: true } on success,
 * or { ok: false, error: CrmError } on failure.
 * Never throws — callers should check `result.ok`.
 */
export async function submitLead(input: SubmitLeadInput): Promise<CrmResult> {
  const [first_name, ...lastParts] = (input.name || "Unknown").trim().split(" ");
  const last_name = lastParts.join(" ") || "";

  const phone = formatPhoneForCrm(input.phone, input.countryCode);

  const payload = {
    first_name,
    last_name,
    email: input.email.trim(),
    phone,
    country_name: input.countryCode.toLowerCase(),
    description: input.leadType === "signup" ? "Signup Lead" : "Contact Lead",
    custom_fields: {
      Source_ID: "website",
      How_Much_Invested: "0",
      Outline_Your_Case: (input.message || "").trim(),
    },
  };

  let res: Response;
  try {
    res = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: CRM_TOKEN,
        "x-api-token": CRM_TOKEN,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: "network" };
  }

  // CRM accepted → increment dashboard
  if (res.ok) {
    incrementDashboard(input.leadType, input.name, input.email);
    return { ok: true };
  }

  // Map status codes to typed errors
  if (res.status === 409) return { ok: false, error: "duplicate" };
  if (res.status === 422) return { ok: false, error: "invalid" };
  if (res.status === 400) return { ok: false, error: "server" };
  return { ok: false, error: "server" };
}

// ─── Helpers ──────────────────────────────────────────────────────

function incrementDashboard(
  type: "signup" | "contact",
  name: string,
  email: string
) {
  fetch(DASHBOARD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ website: "Évolis Journal", type, name, email }),
  }).catch(() => {});
}
