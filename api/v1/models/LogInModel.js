const z = require("zod");

const LogInModel = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = LogInModel;
