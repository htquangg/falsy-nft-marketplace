import {
  MeshContext,
  MutationverifyAccountArgs,
  Resolvers,
  ResponseString,
} from "../../.mesh";

const resolvers: Resolvers = {
  Mutation: {
    async login(
      root,
      args: MutationverifyAccountArgs,
      context: MeshContext,
      info
    ): Promise<string> {
      const response = await context.AuthService.Mutation.verifyAccount({
        root,
        args,
        context,
        info,
        selectionSet: `
            {
              data
              status
            }
        `,
      });

      return response.data;
    },

    async logout(root, args, context: MeshContext, info): Promise<boolean> {
      return true;
    },
  },
};

export { resolvers };
