'use client'

import React, { useCallback } from 'react'
import { ScheduleForm } from '../schedule-form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@app/ui/components'
import { ScheduleSchema } from '@app/lib/schema'
import {
  useDeleteSchedule,
  useSchedule,
  useUpdateSchedule,
} from '@app/lib/queries/schedules'

export const EditScheduleForm = () => {
  const { data } = useSchedule()

  const methods = useForm<z.output<typeof ScheduleSchema>>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      train: '',
      arrival: '',
      departure: '',
      departureAt: new Date(),
      arrivalAt: new Date(),
      price: 0,
    },
    values: data,
  })

  const { mutateAsync: update } = useUpdateSchedule()
  const { mutateAsync: remove, isPending: isPendingRemove } =
    useDeleteSchedule()

  const onSubmit: SubmitHandler<z.output<typeof ScheduleSchema>> = useCallback(
    async (data) => {
      try {
        await update(data)
      } catch (err) {
        console.log(err)
      }
    },
    [update]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex h-fit flex-col gap-y-4 rounded-xl border border-stroke-1 bg-white">
          <div className="flex items-center justify-between border-b border-b-stroke-1 p-4">
            <p className="text-xl font-medium text-gray-8">Edit schedule</p>

            <div className="flex flex-row items-center gap-x-2">
              <Button
                variant="primary"
                type="submit"
                isLoading={methods.formState.isSubmitting}
              >
                Submit
              </Button>

              <Button
                variant="secondary"
                type="button"
                key={'remove'}
                className="text-red-8 ring-red-8 hover:text-red-7 hover:ring-red-7 active:text-red-8 active:ring-red-8"
                loaderClass="border-red-5 !border-b-transparent"
                isLoading={isPendingRemove}
                onClick={() => remove()}
              >
                Delete
              </Button>
            </div>
          </div>

          <ScheduleForm />
        </div>
      </form>
    </FormProvider>
  )
}
