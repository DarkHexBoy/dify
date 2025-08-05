import { get, post } from './base'
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { useInvalid } from './use-base'
import type { EducationAddParams } from '@/app/education-apply/types'
import { sleep } from '@/utils'

const NAME_SPACE = 'education'

export const useEducationVerify = () => {
  return useMutation({
    mutationKey: [NAME_SPACE, 'education-verify'],
    mutationFn: () => {
      return get<{ token: string }>('/account/education/verify', {}, { silent: true })
    },
  })
}

export const useEducationAdd = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  return useMutation({
    mutationKey: [NAME_SPACE, 'education-add'],
    mutationFn: (params: EducationAddParams) => {
      return post<{ message: string }>('/account/education', {
        body: params,
      })
    },
    onSuccess,
  })
}

type SearchParams = {
  keywords?: string
  page?: number
  limit?: number
}
export const useEducationAutocomplete = () => {
  return useMutation({
    mutationFn: (searchParams: SearchParams) => {
      const {
        keywords = '',
        page = 0,
        limit = 40,
      } = searchParams
      return get<{ data: string[]; has_next: boolean; curr_page: number }>(`/account/education/autocomplete?keywords=${keywords}&page=${page}&limit=${limit}`)
    },
  })
}

export const useEducationStatus = (disable?: boolean) => {
  return useQuery({
    enabled: !disable,
    queryKey: [NAME_SPACE, 'education-status'],
    queryFn: () => {
      return get<{ result: boolean, allow_refresh: boolean, expireAt: number | null }>('/account/education')
    },
    retry: false,
  })
}

export const useInvalidateEducationStatus = () => {
  return useInvalid([NAME_SPACE, 'education-status'])
}

export const useEducationExpireAt = () => {
  return useQuery({
    queryKey: [NAME_SPACE, 'education-expire-at'],
    queryFn: async () => {
      await sleep(1000) // Simulate network delay
      return Promise.resolve({
        expireAt: 1785390027,
        shouldNotice: true,
      })
    },
    retry: false,
  })
}
