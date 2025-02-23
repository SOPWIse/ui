// export const BASE_URL = "http://localhost:3000";

import { BASE_PROD_URL, isDev } from "@/utils";

export const BASE_URL = isDev ? "http://localhost" : BASE_PROD_URL;
