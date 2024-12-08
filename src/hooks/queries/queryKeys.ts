/**
 * Common factory for invalidating queries
 */

import { sopsQueryKeys } from "./sops/sopsQueryKeys";
import { userQueryKeys } from "./user/userQueryKeys";

export const queryKeys = {
  user: userQueryKeys,
  sops: sopsQueryKeys,
};
