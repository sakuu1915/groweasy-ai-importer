import { z } from "zod";

export const CRMRecordSchema = z.object({
  created_at: z.string().default(""),
  name: z.string().default(""),
  email: z.string().default(""),
  country_code: z.string().default(""),
  mobile_without_country_code: z.string().default(""),
  company: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  country: z.string().default(""),
  lead_owner: z.string().default(""),

  crm_status: z
    .enum([
      "GOOD_LEAD_FOLLOW_UP",
      "DID_NOT_CONNECT",
      "BAD_LEAD",
      "SALE_DONE",
    ])
    .catch("GOOD_LEAD_FOLLOW_UP"),

  crm_note: z.string().default(""),
  data_source: z.string().default(""),
  possession_time: z.string().default(""),
  description: z.string().default(""),
});

export const CRMResponseSchema = z.object({
  records: z.array(CRMRecordSchema),
});