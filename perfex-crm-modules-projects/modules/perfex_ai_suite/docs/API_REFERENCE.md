## API Reference

Base: `/perfex_ai_api`

### GET `/features`
Returns the list of features and their status.

### GET `/settings`
Returns settings for staff users.

### POST `/execute/{feature}`
Executes a feature with JSON payload. Returns a JSON object describing the result.

Authorization depends on staff session or a custom token integration.
