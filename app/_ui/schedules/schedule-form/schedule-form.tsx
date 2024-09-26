'use client'

import { ScheduleSchema } from '@app/lib/schema'
import { DatePicker, Input } from '@app/ui/components'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { NumericFormat } from 'react-number-format'

export const ScheduleForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<z.output<typeof ScheduleSchema>>()

  return (
    <div className="flex h-fit flex-col gap-y-6 p-4">
      <div>
        <Input
          label="Train"
          id="train"
          placeholder="Enter train ID"
          aria-describedby="train-error"
          required
          {...register('train')}
        />

        <div id="train-error" aria-live="polite" aria-atomic="true">
          {errors?.train && (
            <p className="mt-1 text-sm text-red-7">{errors.train?.message}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          label="Arrival Place"
          id="arrival"
          placeholder="Enter arrival place"
          aria-describedby="arrival-error"
          required
          {...register('arrival')}
        />

        <div id="arrival-error" aria-live="polite" aria-atomic="true">
          {errors?.arrival && (
            <p className="mt-1 text-sm text-red-7">{errors.arrival?.message}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          label="Departure Place"
          id="departure"
          placeholder="Enter departure place"
          aria-describedby="departure-error"
          required
          {...register('departure')}
        />

        <div id="departure-error" aria-live="polite" aria-atomic="true">
          {errors?.departure && (
            <p className="mt-1 text-sm text-red-7">
              {errors.departure?.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Controller
          name={'arrivalAt'}
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Arrival Date"
              id="arrivalAt"
              placeholder="Enter arrival date"
              aria-describedby="arrivalAt-error"
              {...field}
            />
          )}
        />
        <div id="arrivalAt-error" aria-live="polite" aria-atomic="true">
          {errors?.arrivalAt && (
            <p className="mt-1 text-sm text-red-7">
              {errors.arrivalAt?.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Controller
          name={'departureAt'}
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Departure Date"
              id="departureAt"
              placeholder="Enter departure date"
              aria-describedby="departureAt-error"
              {...field}
            />
          )}
        />
        <div id="departureAt-error" aria-live="polite" aria-atomic="true">
          {errors?.departureAt && (
            <p className="mt-1 text-sm text-red-7">
              {errors.departureAt?.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Controller
          name={'price'}
          control={control}
          render={({ field }) => (
            <NumericFormat
              value={field.value}
              onValueChange={(e) => field.onChange(e.floatValue)}
              label="Price"
              allowLeadingZeros={false}
              allowNegative={false}
              prefix="₴"
              customInput={Input}
              thousandSeparator
            />
          )}
        />
        <div id="price-error" aria-live="polite" aria-atomic="true">
          {errors?.price && (
            <p className="mt-1 text-sm text-red-7">{errors.price?.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
