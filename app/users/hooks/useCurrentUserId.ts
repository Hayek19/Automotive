import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUserId = () => {
  const [user] = useQuery(getCurrentUser, null)
  return user?.id
}
