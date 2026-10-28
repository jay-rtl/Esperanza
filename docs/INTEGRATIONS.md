# Independent form contract and launch requirements

The static site does not include a secret-bearing email backend. Set `PUBLIC_CONTACT_ENDPOINT` and `PUBLIC_GUIDE_ENDPOINT` to independently deployed HTTPS JSON handlers after approving their data processors and privacy practices. Never configure the original WordPress domain. `PUBLIC_GUIDE_EN_URL` and `PUBLIC_GUIDE_ES_URL` may point to approved files under `/guides/`; files must be supplied separately.

## Request

POST with `Content-Type: application/json`, credentials omitted, 15-second timeout. Browser validation improves usability and does not replace server validation.

```json
{"firstName":"Example","email":"example@example.com","phone":"","message":"","website":"","kind":"contact","consent":"on"}
```

Guide payload uses `kind: "guide"` and `language: "en"` or `"es"`; no phone/message. The `website` field is a honeypot. Do not send submitted content back to the browser or log it unnecessarily.

## Response

Return a JSON body `{"accepted":true}` with HTTP 200 or 202 **only after durable acceptance** by your mail/queue provider. The UI says the request was accepted; it does not claim email delivery. Any non-2xx, invalid JSON, `accepted` value other than true, timeout or connection failure shows failure feedback. Avoid server side effects on GET.

## Required server safeguards

- Validate a bounded object shape, reject unknown or oversized fields, trim name, require valid email, limit firstName to 80, email to 254, phone to 40, message to 180 characters. Validate guide language and explicit consent. Never accept arbitrary recipients or email header values.
- Limit request body size (e.g. 8 KB), rate limit by a privacy-conscious short-lived identifier, check honeypot, and consider an accessible challenge if abuse warrants it. The client-side honeypot alone is not sufficient spam protection.
- Restrict CORS and permitted Origin to your deployment. Reject unsupported content types. No authenticated browser cookies are sent by the frontend; if introducing sessions, reassess CSRF protections.
- Keep provider credentials server-side; use least privilege, encryption in transit, minimal logging and safe error responses.
- Specify processor/storage, access, retention, deletion and user-rights handling in approved privacy text. No newsletter subscription should be inferred from a contact inquiry. Guide fulfillment and marketing enrollment require separately agreed consent behavior; add a separate optional marketing consent before implementing subscriptions.
- Add idempotency/deduplication at the handler if retries could duplicate messages. Use guide-specific delivery, verified files, and signed URLs if appropriate.

## Current data flow

Default preview: inputs exist only in the page DOM → local validation → explicit unconfigured notice → no network transmission or persistent storage. Configured mode: browser → configured independent endpoint → client-selected processor. Downstream storage, authorized people and retention are unknown and must be documented before launch.

The test suite intercepts a synthetic endpoint for accepted/rejected/network-error states. It does not contact a real email provider. Live contact submission, guide delivery and booking completion remain NOT TESTED.
