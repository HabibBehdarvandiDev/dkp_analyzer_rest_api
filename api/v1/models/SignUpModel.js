const z = require("zod");
const UserRoles = require("@prisma/client");

const UserModel = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z
    .string()
    .min(3, "نام کاربری باید حداقل 3 حرف باشد.")
    .max(25, "نام کاربری باید حداکثر 25 حرف باشد."),
  password: z.string(),
  phone_number: z
    .string()
    .min(
      12,
      "لطفا از فرمت مناسب برای وارد کردن شماره استفاده کنید. مثال : 98 912 000 0000"
    )
    .max(
      12,
      "لطفا از فرمت مناسب برای وارد کردن شماره استفاده کنید. مثال : 98 912 000 0000"
    )
    .optional(),
  role: z.enum(["EMPLOYEE", "DEVELOPER", "CEO", "MANAGER"]).optional(),
  actions: z.record(z.any()).optional(),
  nickname: z.string().optional(),
});

module.exports = UserModel;
