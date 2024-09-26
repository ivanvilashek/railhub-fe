'use client'

import React, { useCallback } from 'react'
import { ScheduleForm } from '../schedule-form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@app/ui/components'
import { ScheduleSchema } from '@app/lib/schema'
import { useCreateSchedule } from '@app/lib/queries/schedules'

export const CreateScheduleForm = () => {
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
  })

  const { mutateAsync: create } = useCreateSchedule()

  const onSubmit: SubmitHandler<z.output<typeof ScheduleSchema>> = useCallback(
    async (data) => {
      try {
        await create(data)
      } catch (err) {
        console.log(err)
      }
    },
    [create]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex h-fit flex-col gap-y-4 rounded-xl border border-stroke-1 bg-white">
          <div className="flex items-center justify-between border-b border-b-stroke-1 p-4">
            <p className="text-xl font-medium text-gray-8">
              Create new schedule
            </p>

            <Button
              variant="primary"
              type="submit"
              isLoading={methods.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>

          <ScheduleForm />
        </div>
      </form>
    </FormProvider>
  )
}
