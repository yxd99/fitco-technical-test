import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createCommentAction } from '@app/actions/comments.action';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCommentAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success('Comment created successfully');
    },
    onError: () => {
      toast.error('Error creating comment');
    },
  });
};
