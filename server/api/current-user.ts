import { getCurrentUser } from "aws-amplify/auth/server";
import { runAmplifyApi } from "~/server/utils/amplifyUtils";
export default defineEventHandler(async (event) => {
  try {
    const user = await runAmplifyApi(event, (contextSpec) =>
      getCurrentUser(contextSpec)
    );
    return user;
  } catch (error) {
    return null;
  }
});
