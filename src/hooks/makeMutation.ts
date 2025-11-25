import {
  MutationFunction, QueryKey, useMutation, useQueryClient,
} from 'react-query';

function makeMutation<T, R = unknown>(key: QueryKey, mutation: MutationFunction<R, T>, queryDependencies?: string[]) {
  return () => {
    const queryClient = useQueryClient();

    return useMutation<R, unknown, T>(mutation, {
      onSuccess() {
        queryClient.invalidateQueries(key);
        if (queryDependencies) {
          queryDependencies.forEach((k) => queryClient.invalidateQueries(k));
        }
      },
    });
  };
}

export default makeMutation;
